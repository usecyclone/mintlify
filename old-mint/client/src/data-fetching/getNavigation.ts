import { fetchWithAuth } from './fetch';

export const getNavigation = async (subdomain: string) =>
  (await fetchWithAuth(subdomain, '/navigation')).json();
