import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackBarService } from 'src/app/services/snackBar.service';
import { UrlsControlService } from 'src/app/services/urls-control/urlsControl.service';
import { EditarUrlDialogComponent } from '../editar-url-dialog/editar-url-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CriarUrlRequest } from 'src/app/models/urlsControl/criarUrlRequest.model';

@Component({
  selector: 'app-criar-url-dialog',
  templateUrl: './criar-url-dialog.component.html',
  styleUrls: ['./criar-url-dialog.component.css']
})
export class CriarUrlDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarUrlDialogComponent>,
    private urlsService: UrlsControlService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
  ) { }

  novoUrl: CriarUrlRequest = new CriarUrlRequest();

  fechar() {
    this.dialogRef.close();
  }

  criarUrl() {
    if (!this.verificarNovaUrl()) {
      return;
    }
    this.urlsService.criarUrl(this.novoUrl)
      .subscribe({
        next: () => {
          this.snackBarService.sucesso("Url criado com sucesso");
          this.dialogRef.close();
        },
        error: err => {
          this.snackBarService.falha(`Erro ao criar url: ${err.error.message}`);
        }
      });
  }

  verificarNovaUrl() {
    if (this.novoUrl.url === undefined || this.novoUrl.url === "") {
      this.snackBarService.informativo("É necessário fornecer url");
      return false;
    } else if (this.novoUrl.dataExpiracao !== undefined
      && this.novoUrl.dataExpiracao <= new Date()) {
      this.snackBarService.informativo('Data de expiração deve ser posterior a data de hoje');
      return false;
    }
    return true;
  }
}
