import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlterarSenhaRequest } from "src/app/models/userControl/alterarSenha.model";
import { CriarUserRequest } from "src/app/models/userControl/criarUserRequest.model";
import { FiltroUsersRequest } from "src/app/models/userControl/filtroUsersRequest.model";
import { User } from "src/app/models/userControl/user.model";
import { environment } from "src/environments/environment";

@Injectable()
export class UserControlService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.user}:${environment.senha}`)
    })
  };

  urlPath = {
    api: 'api',
    controller: 'users',
      actions: {
      login: 'login',
      senha: 'senha'
    }
  };

  buscarUsers(filtro: FiltroUsersRequest): Observable<User[]> {
    let query = `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}?`;
    query += filtro.ativo === undefined ? '' : `ativo=${filtro.ativo}`;
    query += filtro.dataInicioCriacao === undefined ? '' : `dataInicioCriacao=${filtro.dataInicioCriacao}`;
    query += filtro.dataFimCriacao === undefined ? '' : `dataFimCriacao=${filtro.dataFimCriacao}`;

    return this.http.get<User[]>(query, this.httpOptions);
  }

  criarUser(criarUserRequest: CriarUserRequest): Observable<null> {
    return this.http.post<null>(
      `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}`,
      criarUserRequest,
      this.httpOptions
    );
  }

  alterarSenha(user: string, alterarUserRequest: AlterarSenhaRequest): Observable<null> {
    return this.http.put<null>(
      `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}/${user}/${this.urlPath.actions.senha}`,
      alterarUserRequest,
      this.httpOptions
    );
  }

  login(user: string, senha:string): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}/${this.urlPath.actions.login}`,
      {
        user: user,
        senha: senha
      },
      this.httpOptions
    );
  }
}
