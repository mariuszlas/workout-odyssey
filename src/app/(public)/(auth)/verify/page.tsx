import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { _t } from '@/constants';
import { CognitoApi } from '@/server/cognitoAuth';

import { VerifyForm } from './verifyForm';

export const metadata: Metadata = {
    title: _t.emailConfirmationHeader,
    description: 'Verify your email',
};

export default async function Verify({
    searchParams,
}: {
    searchParams: { user: string };
}) {
    if (!searchParams.user) {
        redirect('/');
    }

    const email = Buffer.from(searchParams.user, 'base64url').toString();
    let shouldRedirectToLogin;

    try {
        const response = await new CognitoApi().getUser(email);

        const isEmailVerified = response.UserAttributes?.find(
            ({ Name, Value }) => Name === 'email_verified' && Value === 'true'
        );
        const isConfirmed = response.UserStatus === 'CONFIRMED';

        if (isEmailVerified && isConfirmed) {
            shouldRedirectToLogin = true;
        }
    } catch (e) {
        if (e instanceof UserNotFoundException) {
            console.error('Error: Verfication failed - user not found');
            redirect('/signup');
        }

        console.error('Error: Verfication failed');
        return redirect('/');
    }

    if (shouldRedirectToLogin) {
        redirect('/login');
    }

    return <VerifyForm email={email} />;
}
