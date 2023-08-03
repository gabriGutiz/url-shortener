import { SnackBarService } from './../../../services/snackBar.service';
import { UrlsControlService } from 'src/app/services/urls-control/urlsControl.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Url } from 'src/app/models/urlsControl/url.model';
import { LoadingService } from 'src/app/services/loading.service';

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
  }

  url: Url = new Url();

  fechar() {
    this.dialogRef.close();
  }

  salvarAlteracao() {
    if (!this.verificarUrl()) {
      return;
    }
    this.urlsService.criarUrl(this.url)
      .subscribe({
        next: () => {
          this.snackBarService.sucesso("Url alterado com sucesso");
          this.dialogRef.close();
        },
        error: err => {
          this.snackBarService.falha(`Erro ao alterar url: ${err.error.message}`);
        }
      });
  }

  verificarUrl() {
    if (this.url.urlOriginal === undefined || this.url.urlOriginal === "") {
      this.snackBarService.informativo("É necessário fornecer url");
      return false;
    } else if (this.url.dataExpiracao !== undefined
      && this.url.dataExpiracao <= new Date()) {
      this.snackBarService.informativo('Data de expiração deve ser posterior a data de hoje');
      return false;
    }
    return true;
  }

  ativarDesativar() {
    console.log(this.url.urlId);
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
