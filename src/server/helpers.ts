import {
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    NotAuthorizedException,
} from '@aws-sdk/client-cognito-identity-provider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { ZodError } from 'zod';

import { Cookie, ToggleState } from '@/interfaces';
import { getMsgFromError } from '@/utils/helpers';

import { formatOtherError, formatZodError } from './validation';

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

export const getRefreshTokenFromCookie = () =>
    cookies().get(Cookie.REFRESH_SESSION)?.value;

export const getAccessTokenFromCookie = () =>
    cookies().get(Cookie.ACCESS_TOKEN)?.value;

export const getUsernameFromCookie = () => {
    const accessToken = getAccessTokenFromCookie();
    if (!accessToken) return null;

    const payload = JSON.parse(
        Buffer.from(accessToken?.split('.')[1], 'base64').toString()
    );

    return payload?.username;
};

export const validateSession = (accessTokenOnly = false) => {
    const username = getUsernameFromCookie();

    if (!username) redirect('/login');

    return accessTokenOnly ? getAccessTokenFromCookie() : username;
};

export const handleError = async (e: unknown) => {
    const t = await getTranslations('AccountSettings.errors');

    if (e instanceof ZodError) {
        return formatZodError(e);
    }

    if (e instanceof NotAuthorizedException) {
        return formatOtherError(t('notAuthorised'));
    }

    if (e instanceof AliasExistsException) {
        return formatOtherError(t('emailAlreadyExists'));
    }

    if (e instanceof CodeMismatchException) {
        return formatOtherError(t('invalidCode'));
    }

    if (e instanceof ExpiredCodeException) {
        return formatOtherError(t('expiredCode'));
    }

    console.error(getMsgFromError(e));
    return formatOtherError(t('unexpected'));
};

export const handleApiError = (
    error = 'Internal server error',
    status = 500
) => {
    return NextResponse.json({ error }, { status });
};
