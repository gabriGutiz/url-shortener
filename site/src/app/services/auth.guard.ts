import { ContaService } from './conta.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard {
  constructor(
    private router: Router,
    private contaService: ContaService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.contaService.userValue;
    if (user) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
