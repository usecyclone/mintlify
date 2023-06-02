import { getHostingLocation } from '@/data-fetching/getHostingLocation';
import { getNavigation } from '@/data-fetching/getNavigation';
import { IS_MULTI_TENANT } from '@/env';

import findAllPageHrefs from './findAllPageHrefs';

const successHeaders = {
  'Cache-control': 'public, s-maxage=31536000, stale-while-revalidate',
};

async function generateSitemap(subdomain: string) {
  if (!IS_MULTI_TENANT) {
    return new Response('', {
      status: 404,
      headers: successHeaders,
    });
  }

  const navigation = await getNavigation(subdomain);
  const publicPages = findAllPageHrefs(navigation);

  const hostingLocation = await getHostingLocation(subdomain);

  const body = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${publicPages
      .map((publicPagePath) => {
        return `
  <url>
    <loc>${hostingLocation}${publicPagePath}</loc>
  </url>`;
      })
      .join('\n')}
</urlset>`;
  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=31536000, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}

export async function GET(request: Request, context: { params: { subdomain: string } }) {
  return await generateSitemap(context.params.subdomain);
}

export function HEAD() {
  // Based off of https://google.com/robots.txt which returns 200, no body, and headers when you make a HEAD request
  return new Response('', {
    status: 200,
    headers: successHeaders,
  });
}
