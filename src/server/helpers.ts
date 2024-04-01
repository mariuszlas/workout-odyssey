import {
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    NotAuthorizedException,
} from '@aws-sdk/client-cognito-identity-provider';
import { cookies } from 'next/headers';
import { ZodError } from 'zod';

import { Cookie, ToggleState } from '@/interfaces';
import { getGenericErrorMessage } from '@/utils/helpers';

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
    const jwt = getAccessTokenFromCookie();
    if (!jwt) return null;

    const payload = JSON.parse(
        Buffer.from(jwt?.split('.')[1], 'base64').toString()
    );

    return payload?.username;
};

export const handleError = (e: unknown) => {
    if (e instanceof ZodError) {
        return formatZodError(e);
    }

    if (e instanceof NotAuthorizedException) {
        return formatOtherError('Incorrect credentials');
    }

    if (
        e instanceof AliasExistsException ||
        e instanceof CodeMismatchException ||
        e instanceof ExpiredCodeException
    ) {
        return formatOtherError(e.message);
    }

    const msg = 'Unexpected error occured';
    console.error(`Error: ${getGenericErrorMessage(e, msg)}`);
    return formatOtherError(msg);
};
