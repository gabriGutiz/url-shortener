import { LoadingService } from 'src/app/services/loading.service';
import { SnackBarService } from '../../services/snackBar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private contaService: ContaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    public loadingService: LoadingService
  ) { }

  form!: FormGroup;
  submitted: boolean = false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  submitLogin() {
    if (this.form.invalid) {
      this.snackBarService.falha('Inputs inválidos');
      return;
    }
    this.loadingService.iniciar();
    this.contaService.login(this.f['user'].value, this.f['senha'].value);
    this.router.navigate(['/']);
  }
}
