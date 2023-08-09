import { animate, state, style, transition, trigger } from '@angular/animations';
import { SnackBarService } from './../../services/snackBar.service';
import { Component, OnInit } from '@angular/core';
import { FiltroUrlsRequest } from 'src/app/models/urlsControl/filtroUrlsRequest.model';
import { Url } from 'src/app/models/urlsControl/url.model';
import { UrlsResponse } from 'src/app/models/urlsControl/urlsReponse.model';
import { LoadingService } from 'src/app/services/loading.service';
import { UrlsControlService } from 'src/app/services/urls-control/urlsControl.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUrlDialogComponent } from './editar-url-dialog/editar-url-dialog.component';
import { CriarUrlDialogComponent } from './criar-url-dialog/criar-url-dialog.component';

@Component({
  selector: 'app-urls-control',
  templateUrl: './urls-control.component.html',
  styleUrls: ['./urls-control.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UrlsControlComponent implements OnInit {

  filtroBuscarUrls: FiltroUrlsRequest = new FiltroUrlsRequest();
  buscarFiltro: string = "ativos";
  urls: Array<Url> = new Array<Url>;
  colunas = ["urlId", "urlOriginal", "clicks", "ativo"];
  elementoExpandido: Url = new Url();
  aberto: boolean = false;

  constructor(
    private urlsService: UrlsControlService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.filtroBuscarUrls.ativo = true;
    this.loadingService.iniciar();
    this.buscarUrls();
  }

  abrirModalEditar(url: Url) {
    this.dialog.open(EditarUrlDialogComponent, {
      data: url,
      width: 'max(300px, min(50%, 500px))'
    }).afterClosed().subscribe(() => {
        this.buscarUrls();
        this.loadingService.finalizar();
      }
    );
  }

  abrirModalCriar() {
    this.dialog.open(CriarUrlDialogComponent, {
      width: 'max(300px, min(50%, 500px))'
    }).afterClosed().subscribe(() => {
      this.buscarUrls();
      this.loadingService.finalizar();
    });
  }

  buscarUrls() {
    this.loadingService.iniciar();
    if (this.buscarFiltro === "todos") {
      this.filtroBuscarUrls.ativo = undefined;
    } else {
      this.filtroBuscarUrls.ativo = this.buscarFiltro === "ativos";
    }
    this.urlsService.buscarUrls(this.filtroBuscarUrls)
      .subscribe(
        {
          next: (response: UrlsResponse) => {
            if (response !== null) {
              this.urls = response.urls;
            } else {
              this.urls = new Array<Url>;
            }
            this.loadingService.finalizar();
          },
          error: (erro) => {
            this._tratarErro(erro, "Erro ao buscar urls");
            this.loadingService.finalizar();
          }
        }
      );
  }

  _existemUrls() {
    return this.urls?.length > 0;
  }

  _tratarErro(erro: any, mensagem: string = "") {
    this.snackBarService.falha(mensagem);
    console.error(erro);
    this.loadingService.finalizar();
  }
}
