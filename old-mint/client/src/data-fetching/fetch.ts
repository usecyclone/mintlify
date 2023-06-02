import { AUTH_HEADER, DEPLOYMENT_ENDPOINT } from '@/constants';

export const fetchWithAuth = async (subdomain: string, path: string) => {
  return await fetch(`${DEPLOYMENT_ENDPOINT}/${subdomain}${path}`, { headers: AUTH_HEADER });
};
