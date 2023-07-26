import express from 'express';
import { configEnv } from './config/enviroment.config.js';
import { CustomError } from './utils/CustomError.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { urlsRouter } from './routes/urls.route.js';
import { indexRouter } from './routes/index.route.js';

app.use('', indexRouter);
app.use('/urls', urlsRouter);

app.use((error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.body);
    }
    return res.status(500).send({ message: error.message });
});

const PORT = configEnv.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});
