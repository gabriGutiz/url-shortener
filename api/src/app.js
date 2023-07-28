import express from 'express';
import { configEnv } from './config/env.config.js';
import { CustomError } from './utils/CustomError.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { urlsRouter } from './routes/urls.route.js';
import { indexRouter } from './routes/index.route.js';

app.use('/urls', urlsRouter);
app.use('', indexRouter);

app.use((error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.body);
    }
    return res.status(500).send({ message: error.message });
});

app.listen(configEnv.PORT, configEnv.HOST, () => {
    console.log(`Server rodando em http://${configEnv.HOST}:${configEnv.PORT}`);
});
