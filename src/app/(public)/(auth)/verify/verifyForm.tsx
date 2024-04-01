'use client';

import { FC } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';

import { _t, Alert, Button, CheckIcon, Text } from '@/components';

import { resendVerificationLink } from './action';

export const VerifyForm: FC<{ email: string }> = ({ email }) => {
    const [formState, action] = useFormState(
        () => resendVerificationLink(email),
        undefined
    );
    const { pending } = useFormStatus();

    const success = formState?.success;
    const error = formState?.error;

    return (
        <div className="flex flex-col gap-8">
            {error && (
                <Alert status="error" classes="mb-0">
                    {error}
                </Alert>
            )}

            <Text as="p">
                {_t.emailConfirmationBody1}
                <Text className="font-bold" value={email} />
                {_t.emailConfirmationBody2}
            </Text>

            <div className="flex flex-wrap justify-end gap-4">
                <div className="flex items-center gap-2">
                    {pending ? (
                        <span className="loading loading-spinner" />
                    ) : (
                        success && <CheckIcon className="text-success" />
                    )}

                    <form action={action}>
                        <Button
                            type="submit"
                            className="btn btn-outline btn-primary"
                            disabled={pending}
                        >
                            {_t.resendCodeCTA}
                        </Button>
                    </form>
                </div>

                <Link
                    className="btn btn-primary  h-10 min-h-min"
                    href="/login"
                    color="primary"
                >
                    {_t.btnLogin}
                </Link>
            </div>
        </div>
    );
};
