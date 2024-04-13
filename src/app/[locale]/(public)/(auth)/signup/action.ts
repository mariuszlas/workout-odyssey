'use server';

import { UsernameExistsException } from '@aws-sdk/client-cognito-identity-provider';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ZodError } from 'zod';

import { CognitoApi } from '@/server/cognitoAuth';
import { createUser } from '@/server/services';
import {
    formatOtherError,
    formatZodError,
    setZodErrorMap,
    signupSchema,
} from '@/server/validation';
import { getMsgFromError } from '@/utils/helpers';

export const signupUser = async (
    acceptNewUsers: boolean | undefined,
    _: unknown,
    formData: FormData
) => {
    const t = await getTranslations('Auth.Signup.errors');

    if (!acceptNewUsers) {
        return formatOtherError(t('usersNotAccepted'));
    }

    await setZodErrorMap();
    const formObj = Object.fromEntries(formData);

    try {
        const { email, name, password } = signupSchema.parse(formObj);

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
            return formatOtherError(t('userExists'));
        }

        console.error(getMsgFromError(e));
        return formatOtherError(t('generic'));
    }

    const encodedEmail = Buffer.from(formObj['email'].toString()).toString(
        'base64url'
    );
    redirect(`/verify?user=${encodedEmail}`);
};
