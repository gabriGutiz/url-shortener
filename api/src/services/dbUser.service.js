import { mongoConnection } from '../config/db.config.js';
import { User } from '../models/User.model.js';
import { CustomError } from '../utils/CustomError.js';

class DbUserService {
    constructor() {
        mongoConnection();
    }

    async buscarUsers(filtro) {
        const userFiltro = {};
        if (filtro?.user) userFiltro.user = filtro.user;
        if (filtro?.ativo) userFiltro.ativo = filtro.ativo;

        const users = await User.find(userFiltro).exec();
        if (filtro?.dataInicioCriacao) users = users.filter(user => user.dataCriacao >= filtro.dataInicioCriacao);
        if (filtro?.dataFimCriacao) users = users.filter(user => user.dataCriacao <= filtro.dataFimCriacao);

        return users;
    }

    async criarUsuario(request) {
        const users = await this.buscarUsers({ user: request.user });
        if (users?.length === 0) {
            const novoUser = new User({
                user: request.user,
                senha: request.senha
            });
            await novoUser.save();
            return novoUser;
        }
        throw new CustomError(400, `Usuário ${request.user} já existente`);
    }

    async alterarSenha(user, alterarReq) {
        const alterar = {};
        if (alterarReq?.user) alterar.user = alterarReq.user;
        if (alterarReq?.senha) alterar.senha = alterarReq.senha;
        if (alterarReq?.ativo != null) alterar.ativo = alterarReq.ativo;

        await User.updateOne({ user: user }, alterar).exec();
    }

    async validarLogin(request) {
        const user = await User.findOne({ user: request.user }).exec();
        return (user.ativo && user.senha === request.senha);
    }
}

export { DbUserService };