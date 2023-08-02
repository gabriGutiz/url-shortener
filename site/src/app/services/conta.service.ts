import { UserControlService } from 'src/app/services/users-control/userControl.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { LocalUser } from '../models/localUser.model';

@Injectable()
export class ContaService {
  constructor(
    private router: Router,
    private userService: UserControlService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  private userSubject: BehaviorSubject<LocalUser | null>;
  public user: Observable<LocalUser | null>;

  public get userValue() {
    return this.userSubject.value;
  }

  login(user: string, senha: string) {
    this.userService.login(user, senha)
      .subscribe({
        next: response => {
          if (response) {
            const varUser = {
              user: user,
              senha: senha
            } as LocalUser;

            localStorage.setItem('user', JSON.stringify(varUser));
            this.userSubject.next(varUser);
            return varUser;
          }
          return null;
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
