import { config } from 'dotenv';

config({ path: `./enviroments/.${(process.env.NODE_ENV || 'dev').toLocaleLowerCase()}.env` });

const configEnv = {
    env: process.env,
    PORT: process.env.PORT || '3003',
    mongo_db: process.env.MONGO_CONN
};
export { configEnv };