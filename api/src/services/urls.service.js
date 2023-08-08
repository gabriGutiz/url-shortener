import { CustomError } from '../utils/CustomError.js';
import { urlCompleto } from '../utils/url.util.js';
import { DbUrlService } from './dbUrl.service.js';

class UrlService {
    constructor() {
        this._dbService = new DbUrlService();
    }

    async buscarUrls(filtros) {
        const urls = await this._dbService.buscarUrls(filtros);
        return urls;
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

    async ativarDesativarUrl(idUrl) {
        const url = await this._buscarUrl(idUrl);
        url.ativo = !url.ativo;
        await this._dbService.alterarRegistro(url);
    }

    async alterarUrl(urlId, alterarUrlReq) {
        const url = await this._buscarUrl(urlId);
        alterarUrlReq.urlId = url.urlId;
        const alterar = {
            urlOriginal: alterarUrlReq.url,
            urlId: url.urlId,
            descricao: alterarUrlReq.descricao || '',
            dataExpiracao: alterarUrlReq.dataExpiracao,
            acessoMaximo: alterarUrlReq.acessoMaximo
        };
        await this._dbService.alterarRegistro(alterar);
    }

    async _buscarUrl(idUrl) {
        if (!idUrl) throw new CustomError(400, 'É necessário passar o id da url');

        const url = await this._dbService.buscarRegistroPorUrlId(idUrl);
        if (!url) throw new CustomError(404, `Não foi encontrado nenhum registro para o id ${idUrl}`);
        return url;
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