import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { _t } from '@/constants';
import {
    getAccessTokenFromCookie,
    getRefreshTokenFromCookie,
    getUsernameFromCookie,
} from '@/server/helpers';
import { getUserId } from '@/server/services';

import { LoginForm } from './loginForm';

export const metadata: Metadata = {
    title: _t.loginHeader,
    description: 'Log in to access your data',
};

export default async function Login() {
    const username = getUsernameFromCookie();
    const refreshSession = getRefreshTokenFromCookie();
    const accessToken = getAccessTokenFromCookie();

    const userId = username ? await getUserId(username) : null;

    if ((!userId || !accessToken) && refreshSession) {
        redirect('/api/refresh-session');
    }

    if (userId) {
        redirect('/dashboard/running');
    }

    return <LoginForm />;
}
