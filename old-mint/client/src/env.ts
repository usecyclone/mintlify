export const { ADMIN_TOKEN, INTERNAL_ANALYTICS_WRITE_KEY, SUBDOMAIN } = process.env;

// Fallback values
export const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:5000';
export const BASE_PATH = process.env.BASE_PATH || '';
export const HOST_NAME = process.env.HOST_NAME || '';
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Boolean flags
export const IS_MULTI_TENANT = process.env.IS_MULTI_TENANT === 'true';
export const VERCEL = process.env.VERCEL === '1';
export const IS_PASSWORD_PROTECTED = process.env.IS_PASSWORD_PROTECTED === 'true';
