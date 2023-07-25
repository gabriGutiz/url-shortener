import { Url } from '../models/Url.model.js';
import { CustomError } from '../utils/CustomError.js';
import { DbService } from './db.service.js';

class UrlService {
    constructor() {
        this._dbService = new DbService();
    }

    async criarUrl(urlRequest, baseUrl) {
        console.log(urlRequest);
        if (urlRequest.nome) {
            if (!this._dbService.verificarRegistroPorNome(urlRequest.nome)) {
                this._dbService.
            }
            throw new CustomError(400, `Já existe uma url registrada para o nome ${urlRequest.nome}`);
        }
        let urlPorOriginal = await Url.findOne({ urlOriginal: urlRequest.url }).exec();

        if (urlPorOriginal) {
            return this._appendUrl(baseUrl, urlPorOriginal);
        }

        if (urlRequest.nome) {
            let urlPorNome = await Url.findOne({ urlId: urlRequest.nome }).exec();

            if (urlPorNome) {
                throw new CustomError(400, `Url já existente para nome ${urlRequest.nome}`);
            } else {
                await Url.create({
                    urlId: urlRequest.nome,
                    urlOriginal: urlRequest.url,
                    descricao: urlRequest.descricao,
                    acessoMaximo: urlRequest.acessoMaximo,
                    dataExpiracao: urlRequest.dataExpiracao
                }).exec();
                return _appendUrl(baseUrl, urlRequest.nome);
            }
        } else {
            return `Criar chave para url ${urlRequest.url}`;
        }
    }

    _appendUrl(baseUrl, key) {
        return `${baseUrl}/${key}`;
    }
}

export { UrlService };