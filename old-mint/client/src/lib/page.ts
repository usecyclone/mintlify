import axios, { AxiosError } from 'axios';

import { AUTH_HEADER, DEPLOYMENT_ENDPOINT } from '@/constants';
import { BASE_PATH } from '@/env';

export const getPage = async (subdomain: string, path: string) => {
  try {
    const { data, status } = await axios.get(`${DEPLOYMENT_ENDPOINT}/${subdomain}/static-props`, {
      params: {
        path,
        basePath: BASE_PATH,
      },
      headers: AUTH_HEADER,
    });
    return { data, status };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError?.response?.status === 403) {
      console.warn(
        'Attempted to fetch props for subdomain',
        subdomain,
        'but the request was forbidden (403).'
      );
    }

    // Show a 404 page instead of crashing
    if (axiosError?.response?.status === 400 || axiosError?.response?.status === 403) {
      return { data: {}, status: axiosError?.response.status };
    } else {
      throw error;
    }
  }
};
