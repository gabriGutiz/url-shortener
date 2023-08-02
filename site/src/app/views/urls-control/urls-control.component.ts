import { SnackBarService } from './../../services/snackBar.service';
import { Component, OnInit } from '@angular/core';
import { FiltroUrlsRequest } from 'src/app/models/urlsControl/filtroUrlsRequest.model';
import { Url } from 'src/app/models/urlsControl/url.model';
import { UrlsResponse } from 'src/app/models/urlsControl/urlsReponse.model';
import { LoadingService } from 'src/app/services/loading.service';
import { UrlsControlService } from 'src/app/services/urls-control/urlsControl.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-urls-control',
  templateUrl: './urls-control.component.html',
  styleUrls: ['./urls-control.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UrlsControlComponent implements OnInit {

  filtroBuscarUrls: FiltroUrlsRequest = new FiltroUrlsRequest();
  urls: Array<Url> = new Array<Url>;
  colunas = ["urlId", "urlOriginal", "ativo"];
  elementoExpandido: Url = new Url();

  constructor(
    private urlsService: UrlsControlService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.filtroBuscarUrls.ativo = true;
    this.loadingService.iniciar();
    this.buscarUrls();
  }

  buscarUrls() {
    this.urlsService.buscarUrls(this.filtroBuscarUrls)
      .subscribe(
        {
          next: (response: UrlsResponse) => {
            if (response !== null) {
              this.urls = response.urls;
              this.loadingService.finalizar();
            }
          },
          error: (erro) => {
            this._tratarErro(erro, "Erro ao buscar urls");
          }
        }
      );
  }

  _existemUrls() {
    return this.urls.length > 0;
  }

  _tratarErro(erro: any, mensagem: string = "") {
    this.snackBarService.falha(mensagem);
    console.error(erro);
    this.loadingService.finalizar();
  }
}
