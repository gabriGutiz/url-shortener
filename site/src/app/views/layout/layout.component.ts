import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private contaService: ContaService
  ) {
    if (this.contaService.userValue) {
      this.router.navigate(['/']);
    }
    this.router.navigate(['/conta/login']);
  }
}
