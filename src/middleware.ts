import type { NextRequest } from 'next/server';

import { Cookie } from './interfaces';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get(Cookie.SESSION)?.value;

    if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
};
