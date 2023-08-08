import mongoose from 'mongoose';
import { configEnv } from './env.config.js';
import { CustomError } from '../utils/CustomError.js';

const mongoConnection = async () => {
    await mongoose.connect(configEnv.mongo_db, {useNewUrlParser: true})
        .then(() => {
            console.log("Conexão com DB estabelecida");
        })
        .catch((err) => {
            console.error(`ERRO AO CONECTAR COM DB: ${err.message}`);
            throw new CustomError();
        });
}

export { mongoConnection };