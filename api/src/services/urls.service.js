import { CustomError } from '../utils/CustomError.js';
import { urlCompleto } from '../utils/url.util.js';
import { DbUrlService } from './dbUrl.service.js';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

class UrlService {
    constructor() {
        this._dbService = new DbUrlService();
    }

    async buscarUrls(filtros, baseUrl) {
        const urls = await this._dbService.buscarUrls(filtros);

        return urls.map(function(item) {
            let qr = "";
            QRCode.toString(urlCompleto(baseUrl, item.urlId), {errorCorrectionLevel: 'L', type: 'svg'},
                (err, data) => {
                    if (err) {
                        throw new CustomError(500, 'Erro ao gerar QR code');
                    }
                    qr = btoa(data);
                });
            return {
                urlId: item.urlId,
                urlOriginal: item.urlOriginal,
                descricao: item.descricao,
                acessoMaximo: item.acessoMaximo,
                clicks: item.clicks,
                dataExpiracao: item.dataExpiracao,
                dataCriacao: item.dataCriacao,
                ativo: item.ativo,
                motivoInativo: item.motivoInativo,
                qrcode: qr
            };
        });
    }

    async criarUrl(urlRequest, baseUrl) {
        if (!urlRequest.urlId || urlRequest.urlId === "") {
            const urlsPorOriginal = await this._dbService.buscarUrls({ urlId: urlRequest.url });

            if (urlsPorOriginal?.length === 0 || !urlsPorOriginal[0]?.urlOriginal) {
                await this._gerarId()
                    .then(async (id) => {
                        urlRequest.urlId = id;
                        return await this._criarNovaUrl(urlRequest, baseUrl);
                    });
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

    async _gerarId(tentativas=0) {
        if (tentativas >= 5) {
            throw new CustomError(500, 'Erro ao gerar URL encurtada')
        }
        const id = nanoid(8 + tentativas*2)
        const urlPorId = await this._dbService.buscarRegistroPorUrlId(id);

        if (urlPorId === undefined || urlPorId === null) {
            return id;
        }
        return this._gerarId(tentativas+1);
    }
}

export { UrlService };