import 'dotenv/config';
import * as process from "node:process";

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG === 'true',
  CORS: '*',
  API_ORIGIN: process.env.API_ORIGIN || 'http://localhost:3000/',
  API_TOKEN: process.env.API_TOKEN,
  STORE_ID: process.env.STORE_ID
};

export default config;
