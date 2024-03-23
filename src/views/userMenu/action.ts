'use server';

import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

import { Cookie } from '@/interfaces';

export const logoutUser = () => {
    cookies().delete(Cookie.SESSION);
    cookies().delete(Cookie.REFRESH_SESSION);
    redirect('/login', RedirectType.replace);
};
