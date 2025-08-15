import dotenv from 'dotenv';
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 5000),
  MONGO_URI: process.env.MONGO_URI ?? '',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
  JWT_COOKIE_SECURE: String(process.env.JWT_COOKIE_SECURE ?? 'false') === 'true',
};

// Validations
if (!env.MONGO_URI) throw new Error('MONGO_URI missing');
if (!env.JWT_SECRET || env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET weak or missing');
if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error('Admin credentials missing');

export default env;
