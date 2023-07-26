import express from 'express';
import { validateCreateUrlReq } from '../models/schemas/createUrl.schema.js';
import { UrlService } from '../services/urls.service.js';

const router = express.Router();

router.post('', async (req, res, next) => {
    const { error, value } = validateCreateUrlReq(req.body);
    if (error) {
        return res.statusCode(400).send(error.details);
    }

    await new UrlService().criarUrl(value, req.get('host'))
        .then((url) => {
            return res.status(201).send(url);
        })
        .catch((err) => next(err));
});

export { router as urlsRouter };