import { SnackBarService } from './../../../services/snackBar.service';
import { ContaService } from 'src/app/services/conta.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CriarUrlRequest } from 'src/app/models/urlsControl/criarUrlRequest.model';

@Component({
  selector: 'app-alterar-user-dialog',
  templateUrl: './alterar-user-dialog.component.html',
  styleUrls: ['./alterar-user-dialog.component.css']
})
export class AlterarUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AlterarUserDialogComponent>,
    private contaService: ContaService,
    private snackBarService: SnackBarService
  ) {
    if (this.contaService.userValue === null) {
      this.snackBarService.falha("Erro ao buscar informações de usuário");
      this.logout();
    }
    this.user = this.contaService.userValue ?? "";
  }

  user: string;
  novoUrl: CriarUrlRequest = new CriarUrlRequest();

  logout() {
    this.contaService.logout();
  }

  fechar() {
    this.dialogRef.close()
  }

  salvar() {
    console.log("SALVAR");
  }
}
