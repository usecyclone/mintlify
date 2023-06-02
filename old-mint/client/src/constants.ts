import { ADMIN_TOKEN, API_ENDPOINT, NODE_ENV } from './env';

export const INTERNAL_ENDPOINT = `${API_ENDPOINT}/api/v2/internal`;
export const DEPLOYMENT_ENDPOINT = `${INTERNAL_ENDPOINT}/deployment`;

export const AUTH_HEADER = ADMIN_TOKEN ? { Authorization: `Bearer ${ADMIN_TOKEN}` } : undefined;

export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV = NODE_ENV === 'development';
