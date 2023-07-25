import { config } from 'dotenv';

config({ path: './.env' });

const configEnv = {
    env: process.env,
    PORT: process.env.PORT,
    mongo_db: process.env.MONGO_CONN
};
export { configEnv };