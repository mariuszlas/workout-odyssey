import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
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
