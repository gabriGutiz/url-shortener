import { mongoConnection } from "../config/db.config.js";
import { Url } from "../models/Url.model.js";

class DbService {
    constructor() {
        mongoConnection();
    }

    async buscarTodasUrls() {
        return await Url.find().exec();
    }

    async buscarRegistroPorUrlId(urlId) {
        return await Url.findOne({ urlId: urlId }).exec();
    }

    async buscarRegistrosPorUrl(urlOriginal) {
        return await Url.find({ urlOriginal: urlOriginal }).exec();
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

    async alterarRegistro(urlAlterado) {
        await Url.updateOne({ _id: urlAlterado._id }, urlAlterado).exec();
    }

    async updateClicks(urlId) {
        const url = await Url.findOne({ urlId: urlId }).exec();
        
        await Url.updateOne({ urlId: urlId }, { clicks: url.clicks+1 }).exec();
    }
}

export { DbService };