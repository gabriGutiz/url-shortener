import { CustomError } from '../utils/CustomError.js';
import { urlCompleto } from '../utils/url.util.js';
import { DbService } from './db.service.js';

class UrlService {
    constructor() {
        this._dbService = new DbService();
    }

    async criarUrl(urlRequest, baseUrl) {
        console.log(urlRequest); // TODO: remover console.log
        if (!urlRequest.urlId) {
            const urlPorOriginal = await this._dbService.buscarRegistroPorUrl(urlRequest.url);

            if (!urlPorOriginal?.urlOriginal) {
                return await this._criarNovaUrl(urlRequest, baseUrl);
            }
            return urlCompleto(baseUrl, urlPorOriginal.urlId);
        }
        const url = await this._dbService.buscarRegistroPorUrlId(urlRequest.urlId);
        if (!url) {
            return await this._criarNovaUrl(urlRequest, baseUrl);
        }
        throw new CustomError(400, `Já existe uma url registrada para o nome ${urlRequest.urlId}`);
    }

    async _criarNovaUrl(urlReq, baseUrl) {
        const novoUrl = await this._dbService.criarRegistro(urlReq);

        if (novoUrl) {
            return urlCompleto(baseUrl, novoUrl.urlId);
        }
        throw new CustomError(500, "Erro ao criar url");
    }
}

export { UrlService };