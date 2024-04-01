'use server';

import { UsernameExistsException } from '@aws-sdk/client-cognito-identity-provider';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

import { _t } from '@/constants';
import { CognitoApi } from '@/server/cognitoAuth';
import { createUser } from '@/server/services';
import {
    formatOtherError,
    formatZodError,
    userSignupSchema,
} from '@/server/validation';
import { getGenericErrorMessage } from '@/utils/helpers';

export const signupUser = async (
    acceptNewUsers: boolean | undefined,
    _: unknown,
    formData: FormData
) => {
    if (!acceptNewUsers) {
        return formatOtherError(_t.errorNewUsers);
    }
    const formObj = Object.fromEntries(formData);

    try {
        const { email, name, password } = userSignupSchema.parse(formObj);

        const response = await new CognitoApi().signup(email, password);
        const username = response.UserSub;

        if (response.$metadata.httpStatusCode !== 200 || !username) {
            throw new Error('Unexpected error occured');
        }

        await createUser(username, name);
    } catch (e) {
        if (e instanceof ZodError) {
            return formatZodError(e);
        }

        if (e instanceof UsernameExistsException) {
            return formatOtherError('User already exists');
        }

        console.error(
            'Error: ' + getGenericErrorMessage(e, 'User signup failed')
        );

        return formatOtherError('User signup failed');
    }

    const encodedEmail = Buffer.from(formObj['email'].toString()).toString(
        'base64url'
    );
    redirect(`/verify?user=${encodedEmail}`);
};
