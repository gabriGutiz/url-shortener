import { ContaService } from 'src/app/services/conta.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private contaService: ContaService
  ) {}

  logout() {
    this.contaService.logout();
  }
}
