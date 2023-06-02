import { NextRequest, NextResponse } from 'next/server';

import { IS_PROD } from './constants';
import { HOST_NAME, IS_MULTI_TENANT, VERCEL } from './env';

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  // Skip folders built into NextJS
  const shouldNotApplyMiddleware = pathname.startsWith('/api/') || pathname.startsWith('/_next/');
  if (shouldNotApplyMiddleware) {
    return;
  }

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  // process.env.HOST_NAME must be set when deploying a multi-tenant setup
  const hostname = req.headers.get('host') || HOST_NAME;

  const currentHost =
    IS_PROD && VERCEL
      ? // Replace both mintlify.app and mintlify.dev because both domains are used for hosting by Mintlify
        hostname.replace('.' + HOST_NAME, '')
      : hostname.replace(/\.localhost:\d{4}/, '');

  // rewrite root application to main folder
  if (hostname.match(/^localhost:\d{4}$/) || !IS_MULTI_TENANT) {
    return NextResponse.rewrite(url);
  }

  // rewrite everything else to `/_sites/[site] dynamic route
  url.pathname = `/_sites/${currentHost}${url.pathname}`;

  return NextResponse.rewrite(url);
}
