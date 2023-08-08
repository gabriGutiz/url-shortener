import { LoadingService } from 'src/app/services/loading.service';
import { SnackBarService } from '../../services/snackBar.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/services/conta.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private contaService: ContaService,
    private router: Router,
    private snackBarService: SnackBarService,
    public loadingService: LoadingService
  ) { }

  form = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required)
  });
  mostrar: boolean = false;

  submitLogin() {
    if (this.form.invalid) {
      this.snackBarService.falha('Inputs inválidos');
      return;
    }
    
    const user = this.form.get('user')?.value ?? "";
    const senha = this.form.get('senha')?.value ?? "";

    this.loadingService.iniciar();
    this.contaService.login(user, senha)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.loadingService.finalizar();
        },
        error: (err: any) => {
          if (err.status == 500) {
            this.snackBarService.falha("Erro interno, tente novamente mais tarde");
          } else {
            this.snackBarService.falha("Usuário ou senha inválidos");
          }
          this.loadingService.finalizar();
        }
      });
  }
}
