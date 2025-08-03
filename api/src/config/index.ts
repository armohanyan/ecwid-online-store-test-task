import 'dotenv/config';

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET || 'default_secret',
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG === 'true',
  CORS: process.env.CORS ? process.env.CORS.split(',') : ['*'],
  API_ORIGIN: process.env.API_ORIGIN || 'http://localhost:3000/',
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
};

export default config;
