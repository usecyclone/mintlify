import { fetchWithAuth } from './fetch';

export const getHostingLocation = async (subdomain: string) =>
  (await fetchWithAuth(subdomain, '/hosting-location')).text();
