import { UserControlService } from 'src/app/services/users-control/userControl.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ContaService {
  constructor(
    private router: Router,
    private userService: UserControlService
  ) {
    this.userSubject = new BehaviorSubject(localStorage.getItem('user'));
    this.user = this.userSubject.asObservable();
  }
  private userSubject: BehaviorSubject<string | null>;
  public user: Observable<string | null>;

  public get userValue() {
    return this.userSubject.value;
  }

  login(user: string, senha: string) {
    return this.userService.login(user, senha)
      .pipe(map(response => {

        if (response) {
          localStorage.setItem('user', user);
          this.userSubject.next(user);
          return user;
        }
        throw new Error();
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
