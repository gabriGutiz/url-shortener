import { config } from 'dotenv';

config({ path: `./env/.${process.env.NODE_ENV || 'dev'}.env` });

const configEnv = {
    env: process.env,
    PORT: process.env.PORT || '3000',
    mongo_db: process.env.MONGO_CONN
};
export { configEnv };