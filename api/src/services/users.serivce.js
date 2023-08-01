import { DbUserService } from '../services/dbUser.service.js';
import { CustomError } from '../utils/CustomError.js';

class UsersService {
    constructor() {
        this._dbService = new DbUserService();
    }

    async buscarUsuarios(filtros) {
        let users = await this._dbService.buscarUsers(filtros);
        return users;
    }

    async criarUsuario(request) {
        await this._dbService.criarUsuario(request);
    }

    async alterarSenha(user, alterarReq) {
        const users = await this._dbService.buscarUsers({ user: user });
        if (users?.length === 0) throw new CustomError(400, "Usuário não encontrado");

        await this._dbService.alterarSenha(user, alterarReq);
    }
    
    async login(user) {
        return await this._dbService.validarLogin(user);
    }
}

export { UsersService };