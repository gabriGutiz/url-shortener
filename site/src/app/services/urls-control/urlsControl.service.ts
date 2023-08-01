import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CriarUrlRequest } from "src/app/models/urlsControl/criarUrlRequest.model";
import { FiltroUrlsRequest } from "src/app/models/urlsControl/filtroUrlsRequest.model";
import { StatusResponse } from "src/app/models/urlsControl/urlStatusResponse.model";
import { UrlsResponse } from "src/app/models/urlsControl/urlsReponse.model";
import { environment } from "src/enviroments/environment";

@Injectable()
export class UrlsControlService {
  constructor(private http: HttpClient) {}

  urlPath = {
    api: 'api',
    controller: 'urls',
  };

  criarUrl(criarUrlRequest: CriarUrlRequest): Observable<string> {
    return this.http.post<string>(
      `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}`,
      criarUrlRequest
    );
  }

  buscarUrls(filtros: FiltroUrlsRequest): Observable<UrlsResponse> {
    let query = `${environment.api}/${this.urlPath.api}/${this.urlPath.controller}?`;
    query += filtros.ativo === undefined ? '' : `ativo=${filtros.ativo}`;
    query += filtros.url === undefined ? '' : `url=${filtros.url}`;

    return this.http.get<UrlsResponse>(query);
  }

  buscarStatus(urlId: string): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(
      `${environment.api}/${this.urlPath.api}/${urlId}/status`
    );
  }

  ativarDesativarUrl(urlId: string): Observable<null> {
    return this.http.put<null>(
      `${environment.api}/${this.urlPath.api}/${urlId}/ativar-desativar`,
      {}
    );
  }
}
