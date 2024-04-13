'use server';

import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { CognitoApi } from '@/server/cognitoAuth';
import { getMsgFromError } from '@/utils/helpers';

export const resendVerificationLink = async (email: string) => {
    const t = await getTranslations('Auth.Verify.errors');

    try {
        const response = await new CognitoApi().resendConfirmationCode(email);

        if (response.$metadata.httpStatusCode === 200) {
            return { success: true, error: null };
        }

        throw new Error();
    } catch (e) {
        if (e instanceof UserNotFoundException) {
            redirect('/signup');
        }

        console.error(getMsgFromError(e));
        return { success: false, error: t('generic') };
    }
};
