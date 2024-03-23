'use server';

import {
    CodeMismatchException,
    ExpiredCodeException,
    UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

import { CognitoApi } from '@/server/cognitoAuth';
import {
    formatOtherError,
    formatResponse,
    formatZodError,
    requestPasswordResetSchema,
    resetPasswordSchema,
} from '@/server/validation';

export const requestPasswordReset = async (_: unknown, formData: FormData) => {
    try {
        const formObj = Object.fromEntries(formData);
        const { email } = requestPasswordResetSchema.parse(formObj);

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
            console.error('Error: Password reset failed - user not found');
            return formatResponse(
                false,
                formatOtherError('User with that email does not exist')
            );
        }

        const msg = 'Failed to resend the password reset code';
        console.error('Error' + msg);
        return formatResponse(false, formatOtherError(msg));
    }
};

export const resetPassword = async (
    email: string | undefined,
    _: unknown,
    formData: FormData
) => {
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

        const msg = 'Failed to reset password';
        console.error(msg);
        return formatOtherError(msg);
    }

    if (shouldRedirectToLogin) {
        redirect('/login');
    } else {
        return formatOtherError('Failed to reset password');
    }
};
