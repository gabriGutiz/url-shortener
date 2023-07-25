import { mongoConnection } from "../config/db.config";
import { Url } from "../models/Url.model";

class DbService {
    constructor() {
        mongoConnection();
    }

    async verificarRegistroPorNome(nomeUrl) {
        return true;
    }

    async criarRegistro(registroUrl) {
        
        Url.create({

        })
    }
}

export { DbService };