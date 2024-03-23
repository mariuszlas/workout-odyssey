import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Cookie, ToggleState } from '@/interfaces';

export const getAppConfig = async () => {
    const s3Url = process.env.S3_URL;

    if (!s3Url) return {};

    try {
        const respose = await fetch(`${s3Url}toggles.json`);
        return (await respose.json()) as ToggleState;
    } catch (_) {
        console.error(`Failed to fetch feature toggles from '${s3Url}'`);
        return {};
    }
};

export const getEmailFromSession = () => {
    const cookieStore = cookies();
    const email = cookieStore.get(Cookie.SESSION)?.value;

    if (!email) {
        redirect('/login');
    }

    return email;
};

export const decodeJwt = (jwt: string | undefined) =>
    jwt ? JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString()) : {};

export const setCookie = async (
    name: Cookie,
    value: string,
    exp: number,
    httpOnly = true
) => {
    cookies().set({
        name,
        value,
        httpOnly,
        secure: process.env.NODE_ENV === 'production',
        maxAge: exp,
        sameSite: 'strict',
    });
};
