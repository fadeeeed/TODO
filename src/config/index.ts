import { config } from 'dotenv';

config({ path: '.env' });

export const { MONGODB_PASSWORD, MONGODB_USER } = process.env;

export const { PORT, NODE_ENV } = process.env;
