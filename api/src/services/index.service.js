import { DbService } from "./db.service.js";
import { verificaUrlAtivo } from "../utils/url.util.js";
import { CustomError } from "../utils/CustomError.js";

class IndexService {
    constructor() {
        this._dbService = new DbService();
    }

    async buscarUrlPorId(id) {
        const url = await this._dbService.buscarRegistroPorUrlId(id);
        if (!verificaUrlAtivo(url)) {
            throw new CustomError(404, "Url não encontrada");
        }
        await this._dbService.updateClicks(id);

        return url.urlOriginal;
    }
}

export { IndexService };