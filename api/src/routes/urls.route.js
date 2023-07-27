import express from 'express';
import { validateCriarUrlReq } from '../models/schemas/criarUrl.schema.js';
import { validateBuscarUrlsReq } from '../models/schemas/buscarUrls.schema.js';
import { UrlService } from '../services/urls.service.js';

const router = express.Router();

router.post('', async (req, res, next) => {
    const { error, value } = validateCriarUrlReq(req.body);
    if (error) {
        return res.statusCode(400).send(error.details);
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
        return res.statusCode(400).send(error.details);
    }

    await new UrlService().buscarUrls(value)
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

export { router as urlsRouter };