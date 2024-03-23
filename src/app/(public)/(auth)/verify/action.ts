'use server';

import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import { redirect } from 'next/navigation';

import { CognitoApi } from '@/server/cognitoAuth';

export const resendVerificationLink = async (email: string) => {
    try {
        const response = await new CognitoApi().resendConfirmationCode(email);

        if (response.$metadata.httpStatusCode === 200) {
            return { success: true, error: null };
        }

        throw new Error();
    } catch (e) {
        if (e instanceof UserNotFoundException) {
            console.error('Error: Verfication failed - user not found');
            redirect('/signup');
        }

        const msg = 'Failed to resend the verification email';
        console.error(msg);
        return { success: false, error: msg };
    }
};
