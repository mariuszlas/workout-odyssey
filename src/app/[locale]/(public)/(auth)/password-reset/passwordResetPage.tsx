'use client';

import { useState } from 'react';

import { PasswordResetForm } from './passwordResetForm';
import { RequestResetPasswordForm } from './requestResetPasswordForm';

export const PasswordResetPage = () => {
    const [email, setEmail] = useState<string>();
    const [shouldDisplayPasswordResetForm, setShouldDisplayPasswordResetForm] =
        useState(false);

    return (
        <>
            {shouldDisplayPasswordResetForm ? (
                <PasswordResetForm
                    email={email}
                    setShouldDisplayPasswordResetForm={
                        setShouldDisplayPasswordResetForm
                    }
                />
            ) : (
                <RequestResetPasswordForm
                    setEmail={setEmail}
                    setShouldDisplayPasswordResetForm={
                        setShouldDisplayPasswordResetForm
                    }
                />
            )}
        </>
    );
};
