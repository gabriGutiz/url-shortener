import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  public duracao = 3000;
  private texto = "Fechar";

  constructor(private snackBar: MatSnackBar) { }

  sucesso(mensagem: string, duracao: number = this.duracao) {
      this.snackBar.open(mensagem, this.texto, {
          duration: duracao,
          panelClass: ['mat-toolbar', 'mat-primary']
      });
  }

  falha(mensagem: string, duracao: number = this.duracao) {
      this.snackBar.open(mensagem, this.texto, {
          duration: duracao,
          panelClass: ['mat-toolbar', 'mat-warn', 'break-line']
      });
  }

  informativo(mensagem: string, duracao: number = this.duracao) {
      this.snackBar.open(mensagem, this.texto, {
          duration: duracao
      });
  }
}
