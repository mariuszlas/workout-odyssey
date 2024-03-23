import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { _t } from '@/constants';
import { Cookie } from '@/interfaces';
import { getSessionUserId } from '@/server/services';

import { LoginForm } from './loginForm';

export const metadata: Metadata = {
    title: _t.loginHeader,
    description: 'Log in to access your data',
};

export default async function Login() {
    const userId = await getSessionUserId();
    const refreshSession = cookies().get(Cookie.REFRESH_SESSION)?.value;

    if (!userId && refreshSession) {
        redirect('/api/refresh-session');
    }

    if (userId) {
        redirect('/dashboard/running');
    }

    return <LoginForm />;
}
