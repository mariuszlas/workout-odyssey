import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { LocaleParam } from '@/interfaces';
import { CognitoApi } from '@/server/cognitoAuth';

import { VerifyForm } from './verifyForm';

export async function generateMetadata({ params: { locale } }: LocaleParam) {
    const t = await getTranslations({
        locale,
        namespace: 'Metadata.EmailConfirmation',
    });

    return { title: t('title'), description: t('description') };
}

export default async function EmailConfirmation({
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
            console.error('Verfication failed - user not found');
            redirect('/signup');
        }

        console.error('Verfication failed');
        return redirect('/');
    }

    if (shouldRedirectToLogin) {
        redirect('/login');
    }

    return <VerifyForm email={email} />;
}
