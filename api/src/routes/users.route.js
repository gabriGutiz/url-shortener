import express from "express";
import { UsersService } from '../services/users.serivce.js';
import { validateBuscarUsersReq } from '../models/schemas/users/buscarUsers.schema.js';
import { validateCriarUserReq } from '../models/schemas/users/criarUser.schema.js';
import { validateAlterarUserReq } from '../models/schemas/users/alterarUser.schema.js';
import { validateLoginReq } from '../models/schemas/users/login.schema.js';
import { auth } from "./authorization.js";

const router = express.Router();
router.use(auth);
router.get('/', async (req, res, next) => {
    const { error, value } = validateBuscarUsersReq(req.query);
    if (error) {
        return res.status(400).send(error.details);
    }

    await new UsersService().buscarUsuarios(value)
        .then((usuarios) => {
            if (!usuarios || usuarios?.length === 0) {
                return res.status(204).send();
            }
            return res.status(200).send(usuarios);
        })
        .catch((err) => next(err));
});

router.post('', async (req, res, next) => {
    const { error, value } = validateCriarUserReq(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    await new UsersService().criarUsuario(value)
        .then(() => {
            return res.status(201).send();
        })
        .catch((err) => next(err));
});

router.put('/:user', async (req, res, next) => {
    const { error, value } = validateAlterarUserReq(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }
    if (!req.params?.user) {
        return res.status(400).send("Deve ser fornecido um usuário");
    }

    await new UsersService().alterarSenha(req.params.user, value)
        .then(() => {
            return res.status(200).send();
        })
        .catch((err) => next(err));
});

router.post('/login', async (req, res, next) => {
    const { error, value } = validateLoginReq(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    await new UsersService().login(value)
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((err) => next(err));
});

export { router as usersRouter };