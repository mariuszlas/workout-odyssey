'use server';

import { redirect } from 'next/navigation';

import { _t } from '@/constants';
import { CognitoApi } from '@/server/cognitoAuth';
import {
    getAccessTokenFromCookie,
    getUsernameFromCookie,
    handleError,
} from '@/server/helpers';
import { destroyUser, updateUserName } from '@/server/services';
import {
    changePasswordSchema,
    emailSchema,
    emailVerificationSchema,
    formatOtherError,
    formatResponse,
    nameSchema,
} from '@/server/validation';

export const updateDisplayName = async (_: unknown, formData: FormData) => {
    try {
        const { name } = nameSchema.parse(Object.fromEntries(formData));

        const username = getUsernameFromCookie();
        const user = await updateUserName(username, name);

        if (!user) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return handleError(e);
    }
};

export const updateEmail = async (_: unknown, formData: FormData) => {
    try {
        const { email } = emailSchema.parse(Object.fromEntries(formData));

        const username = getUsernameFromCookie();
        const response = await new CognitoApi().updateEmail(username, email);

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return handleError(e);
    }
};

export const verifyEmailUpdate = async (_: unknown, formData: FormData) => {
    try {
        const { emailVerificationCode: code } = emailVerificationSchema.parse(
            Object.fromEntries(formData)
        );

        const accessToken = getAccessTokenFromCookie();
        const response = await new CognitoApi().verifyEmail(accessToken, code);

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return handleError(e);
    }
};

export const updatePassword = async (_: unknown, formData: FormData) => {
    try {
        const formObj = Object.fromEntries(formData);
        const { currentPassword, password } =
            changePasswordSchema.parse(formObj);

        const accessToken = getAccessTokenFromCookie();
        const response = await new CognitoApi().updatePassword(
            currentPassword,
            password,
            accessToken
        );

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        return formatResponse(true, formatOtherError(''));
    } catch (e) {
        return handleError(e);
    }
};

export const deleteUser = async () => {
    try {
        const username = getUsernameFromCookie();
        const response = await new CognitoApi().deleteUser(username);

        if (response.$metadata.httpStatusCode !== 200) throw new Error();

        await destroyUser(username);
    } catch (e) {
        return handleError(e);
    }

    redirect('/');
};
