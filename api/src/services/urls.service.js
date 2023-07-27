import { CustomError } from '../utils/CustomError.js';
import { urlCompleto, urlEstaAtivo } from '../utils/url.util.js';
import { DbService } from './db.service.js';

class UrlService {
    constructor() {
        this._dbService = new DbService();
    }

    async buscarUrls(filtros) {
        if (filtros?.url) {
            const urls = await this._dbService.buscarRegistrosPorUrl(filtros.url);
            if (urls?.length !== 0) {
                return this._filtrarAtivos(filtros, urls);
            }
            return null;
        }
        const todasUrls = await this._dbService.buscarTodasUrls();
        return this._filtrarAtivos(filtros, todasUrls);
    }

    async criarUrl(urlRequest, baseUrl) {
        if (!urlRequest.urlId) {
            const urlsPorOriginal = await this._dbService.buscarRegistroPorUrl(urlRequest.url);

            if (urlsPorOriginal?.length === 0 || !urlsPorOriginal[0]?.urlOriginal) {
                // TODO: implementar lógica para criar url encurtada
                return await this._criarNovaUrl(urlRequest, baseUrl);
            }
            return urlCompleto(baseUrl, urlsPorOriginal[0]?.urlId);
        }
        const url = await this._dbService.buscarRegistroPorUrlId(urlRequest.urlId);
        if (!url) {
            return await this._criarNovaUrl(urlRequest, baseUrl);
        }
        throw new CustomError(400, `Já existe uma url registrada para o nome ${urlRequest.urlId}`);
    }

    _filtrarAtivos(filtros, arrayUrls) {
        if (filtros.hasOwnProperty('ativo')) {
            arrayUrls = arrayUrls.filter(url => filtros.ativo ? urlEstaAtivo(url) : !urlEstaAtivo(url));
        }
        return arrayUrls;
    }

    async _criarNovaUrl(urlReq, baseUrl) {
        const novoUrl = await this._dbService.criarRegistro(urlReq);

        if (novoUrl?.urlId) {
            return urlCompleto(baseUrl, novoUrl.urlId);
        }
        throw new CustomError(500, "Erro ao criar url");
    }
}

export { UrlService };