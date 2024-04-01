'use server';

import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

import { Cookie } from '@/interfaces';
import { CognitoApi } from '@/server/cognitoAuth';
import { getUsernameFromCookie } from '@/server/helpers';

export const logoutUser = async () => {
    try {
        const username = getUsernameFromCookie();
        await new CognitoApi().logout(username);
    } catch (_) {
        console.error('Logout failed');
    }

    cookies().delete(Cookie.ACCESS_TOKEN);
    cookies().delete(Cookie.REFRESH_SESSION);

    redirect('/login', RedirectType.replace);
};
