import express from 'express';
import { configEnv } from './config/env.config.js';
import { CustomError } from './utils/CustomError.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


import { urlsRouter } from './routes/urls.route.js';
import { indexRouter } from './routes/index.route.js';
import { usersRouter } from './routes/users.route.js';

app.use('/api/urls', urlsRouter);
app.use('/api/users', usersRouter);
app.use('/api', indexRouter);

app.use((error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.body);
    }
    return res.status(500).send({ message: error.message });
});

app.listen(configEnv.PORT, () => {
    console.log(`Server rodando na porta ${configEnv.PORT}`);
});
