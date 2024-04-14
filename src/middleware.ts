import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { defaultLocale, localePrefix, locales } from './i18n';
import { Cookie } from './interfaces';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get(Cookie.ACCESS_TOKEN)?.value;
    const pathname = request.nextUrl.pathname;

    if (
        !accessToken &&
        (pathname.startsWith('/dashboard') || pathname.startsWith('/user'))
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const handleI18nRouting = createIntlMiddleware({
        locales,
        defaultLocale,
        localePrefix,
    });

    const response = handleI18nRouting(request);
    return response;
}

export const config = {
    matcher: [
        '/((?!api|img|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png$).*)',
    ],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
};
