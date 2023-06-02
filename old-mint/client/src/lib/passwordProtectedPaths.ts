import axios from 'axios';

import { AUTH_HEADER, DEPLOYMENT_ENDPOINT } from '@/constants';
import { SUBDOMAIN } from '@/env';
import { formatStaticPaths } from '@/lib/local/paths';

export const getPasswordProtectedPaths = async () => {
  if (!SUBDOMAIN) {
    throw new Error('No SUBDOMAIN env var is set.');
  }

  const { data: paths } = await axios.get(`${DEPLOYMENT_ENDPOINT}/${SUBDOMAIN}/paths`, {
    headers: AUTH_HEADER,
  });
  return formatStaticPaths(paths);
};
