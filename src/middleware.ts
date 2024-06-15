import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';

import { defaultLocale, localePrefix, locales } from './i18n';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix,
});

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();

    return intlMiddleware(req);
});

export const config = {
    matcher: [
        '/((?!api|img|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png$).*)',
    ],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
};
