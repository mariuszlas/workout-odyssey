'use server';

import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

import { Cookie } from '@/interfaces';
import { CognitoApi } from '@/server/cognitoAuth';
import { handleError, validateSession } from '@/server/helpers';
import { destroyUser, updateUserName } from '@/server/services';
import {
    changePasswordSchema,
    emailSchema,
    emailVerificationSchema,
    formatOtherError,
    formatResponse,
    nameSchema,
    setZodErrorMap,
} from '@/server/validation';

export const updateDisplayName = async (_: unknown, formData: FormData) => {
    const username = validateSession();
    await setZodErrorMap();

    try {
        const { name } = nameSchema.parse(Object.fromEntries(formData));
        const user = await updateUserName(username, name);

        if (!user) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return await handleError(e);
    }
};

export const updateEmail = async (_: unknown, formData: FormData) => {
    const username = validateSession();
    await setZodErrorMap();

    try {
        const { email } = emailSchema.parse(Object.fromEntries(formData));
        const response = await new CognitoApi().updateEmail(username, email);

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return await handleError(e);
    }
};

export const verifyEmailUpdate = async (_: unknown, formData: FormData) => {
    const accessToken = validateSession(true);
    await setZodErrorMap();

    try {
        const { emailVerificationCode: code } = emailVerificationSchema.parse(
            Object.fromEntries(formData)
        );
        const response = await new CognitoApi().verifyEmail(accessToken, code);

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return await handleError(e);
    }
};

export const updatePassword = async (_: unknown, formData: FormData) => {
    const accessToken = validateSession(true);
    await setZodErrorMap();

    try {
        const formObj = Object.fromEntries(formData);
        const { currentPassword, password } =
            changePasswordSchema.parse(formObj);

        const response = await new CognitoApi().updatePassword(
            currentPassword,
            password,
            accessToken
        );

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return await handleError(e);
    }
};

export const deleteUser = async () => {
    const username = validateSession();

    try {
        const response = await new CognitoApi().deleteUser(username);

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        await destroyUser(username);
    } catch (e) {
        return await handleError(e);
    }

    cookies().delete(Cookie.ACCESS_TOKEN);
    cookies().delete(Cookie.REFRESH_SESSION);

    redirect('/', RedirectType.replace);
};
