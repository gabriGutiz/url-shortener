import express from 'express';
import { validateCriarUrlReq } from '../models/schemas/urls/criarUrl.schema.js';
import { validateBuscarUrlsReq } from '../models/schemas/urls/buscarUrls.schema.js';
import { validateAlterarUrlReq } from '../models/schemas/urls/alterarUrl.schema.js';
import { UrlService } from '../services/urls.service.js';
import { auth } from './authorization.js';
import { CustomError } from '../utils/CustomError.js';

const router = express.Router();
router.use(auth);
router.post('', async (req, res, next) => {
    const { error, value } = validateCriarUrlReq(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    await new UrlService().criarUrl(value, `${req.protocol}://${req.get('host')}`)
        .then((url) => {
            return res.status(201).send(url);
        })
        .catch((err) => next(err));
});

router.get('/', async (req, res, next) => {
    const { error, value } = validateBuscarUrlsReq(req.query);
    if (error) {
        return res.status(400).send(error.details);
    }

    await new UrlService().buscarUrls(value, `${req.protocol}://${req.get('host')}`)
        .then((urls) => {
            if (!urls || urls?.length === 0) {
                return res.status(204).send();
            }
            return res.status(200).send({
                quantidade: urls.length,
                urls: urls
            });
        })
        .catch((err) => next(err));
});

router.put('/:id/ativar-desativar', async (req, res, next) => {
    await new UrlService().ativarDesativarUrl(req.params.id)
        .then(() => {
            return res.status(200).send();
        })
        .catch((err) => next(err));
});

router.put('/:id', async (req, res, next) => {
    if (!req.params.id) {
        throw new CustomError(400, 'O id da url é obrigatório');
    }
    const { error, value } = validateAlterarUrlReq(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }
    await new UrlService().alterarUrl(req.params.id, value)
        .then(() => {
            return res.status(200).send();
        })
        .catch((err) => next(err));
});

export { router as urlsRouter };