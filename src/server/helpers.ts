import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
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

export const handleError = async (e: unknown) => {
    if (e instanceof ZodError) {
        return formatZodError(e);
    }

    console.error(getMsgFromError(e));
    return formatOtherError('Unexpected error occured');
};

export const handleApiError = (
    error = 'Internal server error',
    status = 500
) => {
    return NextResponse.json({ error }, { status });
};
