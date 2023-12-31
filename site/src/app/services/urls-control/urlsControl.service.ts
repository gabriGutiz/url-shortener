import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlterarUrlRequest } from "src/app/models/urlsControl/alterarUrl.model";
import { CriarUrlRequest } from "src/app/models/urlsControl/criarUrlRequest.model";
import { FiltroUrlsRequest } from "src/app/models/urlsControl/filtroUrlsRequest.model";
import { StatusResponse } from "src/app/models/urlsControl/urlStatusResponse.model";
import { UrlsResponse } from "src/app/models/urlsControl/urlsReponse.model";
import { environment } from "src/environments/environment";

@Injectable()
export class UrlsControlService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.user}:${environment.senha}`)
    })
  };

  urlPath = {
    api: 'api',
    controller: 'urls',
  };

  criarUrl(criarUrlRequest: CriarUrlRequest): Observable<string> {
    return this.http.post<string>(
      `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}`,
      criarUrlRequest,
      this.httpOptions
    );
  }

  buscarUrls(filtros: FiltroUrlsRequest): Observable<UrlsResponse> {
    let query = `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}?`;
    query += filtros.ativo === undefined ? '' : `ativo=${filtros.ativo}&`;
    query += filtros.urlId === undefined || filtros.urlId === "" ? '' : `urlId=${filtros.urlId}&`;
    query += filtros.url === undefined || filtros.url === "" ? '' : `url=${filtros.url}`;

    return this.http.get<UrlsResponse>(query, this.httpOptions);
  }

  buscarStatus(urlId: string): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(
      `${environment.api}/${this.urlPath.api}/${urlId}/status`,
      this.httpOptions
    );
  }

  alterarUrl(urlId: string | undefined, request: AlterarUrlRequest): Observable<null> {
    return this.http.put<null>(
      `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}/${urlId}`,
      request,
      this.httpOptions
    );
  }

  ativarDesativarUrl(urlId: string | undefined): Observable<null> {
    return this.http.put<null>(
      `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}/${urlId}/ativar-desativar`,
      {},
      this.httpOptions
    );
  }
}
