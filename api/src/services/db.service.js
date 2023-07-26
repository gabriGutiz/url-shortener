import { mongoConnection } from "../config/db.config.js";
import { Url } from "../models/Url.model.js";

class DbService {
    constructor() {
        mongoConnection();
    }

    async buscarRegistroPorUrlId(urlId) {
        let urlEncontrado = await Url.findOne({ urlId: urlId }).exec();
        console.log(urlEncontrado); // TODO: remover console.log
        return urlEncontrado;
    }

    async buscarRegistroPorUrl(urlOriginal) {
        let urlEncontrado = await Url.findOne({ urlOriginal: urlOriginal }).exec();
        console.log(urlEncontrado); // TODO: remover console.log
        return urlEncontrado;
    }

    async criarRegistro(registroUrl) {
        const novoUrl = new Url({
            urlId: registroUrl.urlId,
            urlOriginal: registroUrl.url,
            descricao: registroUrl.descricao,
            acessoMaximo: registroUrl.acessoMaximo,
            dataExpiracao: registroUrl.dataExpiracao,
            dataCriacao: new Date()
        });
        novoUrl.save();

        return novoUrl;
    }

    async updateClicks(urlId) {
        const url = await Url.findOne({ urlId: urlId }).exec();
        
        await Url.updateOne({ urlId: urlId }, { clicks: url.clicks+1 }).exec();
    }
}

export { DbService };