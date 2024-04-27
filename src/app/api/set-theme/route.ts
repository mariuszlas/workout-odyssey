import { NextRequest, NextResponse } from 'next/server';

import { Cookie, Theme } from '@/interfaces';
import { setCookie } from '@/server/helpers';
import { isValidTheme } from '@/utils/helpers';

export async function GET(request: NextRequest) {
    const requestedTheme = request.nextUrl.searchParams.get('theme');
    const theme = isValidTheme(requestedTheme) ? requestedTheme : Theme.LIGHT;

    await setCookie(Cookie.THEME, theme, 60 * 60 * 24 * 365, false);

    return NextResponse.json(null, { status: 200 });
}
