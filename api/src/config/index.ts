import 'dotenv/config';

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG === 'true',
  CORS: process.env.CORS ? process.env.CORS.split(',') : ['*'],
  API_ORIGIN: process.env.API_ORIGIN || 'http://localhost:3000/',
};

export default config;
