import { fetchWithAuth } from './fetch';

export const getHiddenPages = async (subdomain: string): Promise<string[]> =>
  (await fetchWithAuth(subdomain, '/hidden-pages')).json();
