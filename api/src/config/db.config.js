import mongoose from 'mongoose';
import { configEnv } from './env.config.js';

const mongoConnection = async () => {
    try {
        await mongoose.connect(configEnv.mongo_db, {useNewUrlParser: true});
        console.log('Conexão estabelecida com DB');
    } catch (err) {
        console.error(`ERRO AO CONECTAR COM DB: ${err.message}`);
    }
}

export { mongoConnection };