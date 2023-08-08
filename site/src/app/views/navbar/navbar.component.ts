import { ContaService } from 'src/app/services/conta.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlterarUserDialogComponent } from './alterar-user-dialog/alterar-user-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private contaService: ContaService,
    public dialog: MatDialog
  ) {}

  logout() {
    this.contaService.logout();
  }

  alterarUser() {
    this.dialog.open(AlterarUserDialogComponent, {
      width: 'max(300px, min(50%, 500px))'
    }).afterClosed().subscribe(() => {
      }
    );
  }
}
