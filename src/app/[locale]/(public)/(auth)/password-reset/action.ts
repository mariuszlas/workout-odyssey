'use server';

import {
    CodeMismatchException,
    ExpiredCodeException,
    UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { getTranslations } from 'next-intl/server';
import { ZodError } from 'zod';

import { redirect } from '@/navigation';
import { CognitoApi } from '@/server/cognitoAuth';
import {
    emailSchema,
    formatOtherError,
    formatResponse,
    formatZodError,
    resetPasswordSchema,
    setZodErrorMap,
} from '@/server/validation';
import { getMsgFromError } from '@/utils/helpers';

export const requestPasswordReset = async (_: unknown, formData: FormData) => {
    const t = await getTranslations('Auth.RequestPasswordReset.errors');
    await setZodErrorMap();

    try {
        const { email } = emailSchema.parse(Object.fromEntries(formData));

        const response = await new CognitoApi().requestPasswordReset(email);

        if (response.$metadata.httpStatusCode === 200) {
            return formatResponse(true, formatOtherError(''), email);
        }

        throw new Error();
    } catch (e) {
        if (e instanceof ZodError) {
            return formatResponse(false, formatZodError(e));
        }

        if (e instanceof UserNotFoundException) {
            console.error('Password reset failed - user not found');
            return formatResponse(false, formatOtherError(t('userNotFound')));
        }

        console.error(getMsgFromError(e));
        return formatResponse(false, formatOtherError(t('generic')));
    }
};

export const resetPassword = async (
    email: string | undefined,
    _: unknown,
    formData: FormData
) => {
    const t = await getTranslations('Auth.ResetPassword.errors');
    await setZodErrorMap();

    let shouldRedirectToLogin;

    try {
        const formObj = Object.fromEntries(formData);
        const { passwordResetCode, password } =
            resetPasswordSchema.parse(formObj);

        const response = await new CognitoApi().resetPassword(
            email ?? '',
            password,
            passwordResetCode
        );

        if (response.$metadata.httpStatusCode === 200) {
            shouldRedirectToLogin = true;
        }
    } catch (e) {
        if (e instanceof ZodError) {
            return formatZodError(e);
        }

        if (
            e instanceof CodeMismatchException ||
            e instanceof ExpiredCodeException
        ) {
            return formatOtherError(e.message);
        }

        console.error(getMsgFromError(e));
        return formatOtherError(t('generic'));
    }

    if (shouldRedirectToLogin) {
        redirect('/login');
    } else {
        return formatOtherError(t('generic'));
    }
};
