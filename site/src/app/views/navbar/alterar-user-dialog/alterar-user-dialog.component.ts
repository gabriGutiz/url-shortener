import { SnackBarService } from './../../../services/snackBar.service';
import { ContaService } from 'src/app/services/conta.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlterarSenhaRequest } from 'src/app/models/userControl/alterarSenha.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserControlService } from 'src/app/services/users-control/userControl.service';

@Component({
  selector: 'app-alterar-user-dialog',
  templateUrl: './alterar-user-dialog.component.html',
  styleUrls: ['./alterar-user-dialog.component.css']
})
export class AlterarUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AlterarUserDialogComponent>,
    private contaService: ContaService,
    private userService: UserControlService,
    private snackBarService: SnackBarService
  ) {
    if (this.contaService.userValue === null) {
      this.snackBarService.falha("Erro ao buscar informações de usuário");
      this.logout();
    }
    this.user = this.contaService.userValue ?? "";
  }

  controleForm = new FormGroup({
    senhaAtual: new FormControl<string>(''),
    novaSenha: new FormControl<string>('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/)]),
    confirmaSenha: new FormControl<string>('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/)]),
  });
  mostrarSenha = [false, false, false];
  user: string;

  logout() {
    this.contaService.logout();
  }

  fechar() {
    this.dialogRef.close()
  }

  salvar() {
    if (this.controleForm.get('confirmaSenha')?.value !== this.controleForm.get('novaSenha')?.value) {
      this.snackBarService.informativo("As senhas devem ser iguais");
      return;
    }
    this.userService.alterarSenha(this.user, {
      senhaAtual: this.controleForm.get('senhaAtual')?.value,
      senhaNova: this.controleForm.get('novaSenha')?.value
    } as AlterarSenhaRequest)
      .subscribe({
        next: () =>  {
          this.snackBarService.sucesso("Senha atualizada com sucesso");
          this.dialogRef.close();
        },
        error: (err) => {
          if (err.status === 500) {
            this.snackBarService.falha("Erro ao alterar senha, tente novamente mais tarde");
            this.dialogRef.close();
          }
          this.snackBarService.falha(`Erro ao alterar senha: ${err.error.message}`);
        }
      })
  }

  alterarMostrarSenha(index: number) {
    this.mostrarSenha[index] = !this.mostrarSenha[index];
  }
}
