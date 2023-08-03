import { SnackBarService } from './../../../services/snackBar.service';
import { UrlsControlService } from 'src/app/services/urls-control/urlsControl.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Url } from 'src/app/models/urlsControl/url.model';
import { LoadingService } from 'src/app/services/loading.service';
import { AlterarUrlRequest } from 'src/app/models/urlsControl/alterarUrl.model';

@Component({
  selector: 'app-editar-url-dialog',
  templateUrl: './editar-url-dialog.component.html',
  styleUrls: ['./editar-url-dialog.component.css']
})
export class EditarUrlDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarUrlDialogComponent>,
    private urlsService: UrlsControlService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: Url
  ) {
    this.url = data;
    this.urlAlterado = {
      url: this.url.urlOriginal,
      descricao: this.url.descricao,
      dataExpiracao: this.url.dataExpiracao,
      acessoMaximo: this.url.acessoMaximo
    } as AlterarUrlRequest;
  }

  url: Url = new Url();
  urlAlterado: AlterarUrlRequest = new AlterarUrlRequest();

  fechar() {
    this.dialogRef.close();
  }

  salvarAlteracao() {
    if (!this.verificarUrl()) {
      return;
    }
    this.urlsService.alterarUrl(this.url.urlId, this.urlAlterado)
      .subscribe({
        next: () => {
          this.snackBarService.sucesso("Url alterado com sucesso");
          this.dialogRef.close();
        },
        error: (err) => {
          this.snackBarService.falha(`Erro ao alterar url: ${err.error.message}`);
        }
      });
  }

  verificarUrl() {
    if (this.urlAlterado.url === undefined || this.urlAlterado.url === "") {
      this.snackBarService.informativo("É necessário fornecer url");
      return false;
    } else if (this.urlAlterado.dataExpiracao !== undefined && this.urlAlterado.dataExpiracao <= new Date()) {
      this.snackBarService.informativo('Data de expiração deve ser posterior a data de hoje');
      return false;
    } else if (this.urlAlterado.descricao !== undefined && this.urlAlterado.descricao?.length > 255) {
      this.snackBarService.informativo('Descrição pode ter no máximo 255 caracteres');
      return false;
    }
    return true;
  }

  ativarDesativar() {
    this.urlsService.ativarDesativarUrl(this.url.urlId)
      .subscribe({
        next: () => {
          this.snackBarService.sucesso(`Url ${this.url.ativo ? "inativado" : "ativado"} com sucesso`);
          this.url.ativo = !this.url.ativo;
        },
        error: (err) => {
          this.snackBarService.falha(`Erro ao ${this.url.ativo ? "inativar" : "ativar"}`);
        }
      });
  }
}
