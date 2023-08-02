import { mongoConnection } from "../config/db.config.js";
import { Url } from "../models/Url.model.js";
import { urlEstaAtivo } from "../utils/url.util.js";
import mongoose from "mongoose";

class DbUrlService {
    constructor() {
        mongoConnection();
    }

    async buscarTodasUrls() {
        return await this.buscarUrls(null);
    }
    
    async buscarRegistroPorUrlId(urlId) {
        return await Url.findOne({ urlId: urlId }).exec();
    }

    async buscarUrls(filtro) {
        const userFiltro = {};
        if (filtro?.urlId) userFiltro.urlId = filtro.urlId;
        if (filtro?.url) userFiltro.urlOriginal = filtro.url;
        if (filtro?.urlOriginal) userFiltro.urlOriginal = filtro.urlOriginal;

        let urls = await Url.find(userFiltro).exec();
        if (urls?.length !== 0) {
            return this._filtrarAtivos(filtro, urls);
        }
        return urls;
    }

    async criarRegistro(registroUrl) {
        const novoUrl = new Url({
            _id: new mongoose.Types.ObjectId(),
            urlId: registroUrl.urlId,
            urlOriginal: registroUrl.url,
            descricao: registroUrl.descricao,
            acessoMaximo: registroUrl.acessoMaximo,
            dataExpiracao: registroUrl.dataExpiracao,
            dataCriacao: new Date()
        });
        await novoUrl.save();

        return novoUrl;
    }

    async alterarRegistro(urlAlterado) {
        await Url.updateOne({ urlId: urlAlterado.urlId }, urlAlterado).exec();
    }

    async updateClicks(urlId) {
        const url = await Url.findOne({ urlId: urlId }).exec();
        
        await Url.updateOne({ urlId: urlId }, { clicks: url.clicks+1 }).exec();
    }
    
    _filtrarAtivos(filtros, arrayUrls) {
        arrayUrls.forEach(function(_, index) {
            this[index].ativo = urlEstaAtivo(this[index]);
        }, arrayUrls);
        if (filtros.hasOwnProperty('ativo')) {
            arrayUrls = arrayUrls.filter(url => url.ativo === filtros.ativo);
        }
        return arrayUrls;
    }
}

export { DbUrlService };