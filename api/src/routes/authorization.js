import { DbUserService } from "../services/dbUser.service.js";

async function auth(req, res, next) {
    if (!req.headers?.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).send('Faltando header de autorização (authorization)');
    }

    const credenciaisBase64 = req.headers.authorization.split(' ')[1];
    const [user, senha] = Buffer.from(credenciaisBase64, 'base64').toString('ascii').split(':');
    
    const dbService = new DbUserService();
    const loginValido = await dbService.validarLogin({ user: user, senha: senha });
    if (!loginValido) {
        return res.status(401).send('Credenciais de autorização inválidas');
    }
    next();
}

export { auth };