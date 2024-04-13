import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { LocaleParam } from '@/interfaces';
import {
    getAccessTokenFromCookie,
    getRefreshTokenFromCookie,
    getUsernameFromCookie,
} from '@/server/helpers';
import { getUserId } from '@/server/services';

import { LoginForm } from './loginForm';

export async function generateMetadata({ params: { locale } }: LocaleParam) {
    const t = await getTranslations({ locale, namespace: 'Metadata.Login' });

    return { title: t('title'), description: t('description') };
}

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
