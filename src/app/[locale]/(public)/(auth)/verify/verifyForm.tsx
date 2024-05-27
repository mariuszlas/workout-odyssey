'use client';

import { FC } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Alert, Button, CheckIcon, Text } from '@/components';
import { Link } from '@/navigation';

import { resendVerificationLink } from './action';

export const VerifyForm: FC<{ email: string }> = ({ email }) => {
    const [formState, action] = useFormState(
        () => resendVerificationLink(email),
        undefined
    );
    const { pending } = useFormStatus();
    const t = useTranslations('Auth');

    const success = formState?.success;
    const error = formState?.error;

    return (
        <div className="flex flex-col gap-8">
            {error && <Alert status="error" classes="mb-0" content={error} />}
            <Text
                as="p"
                value={t.rich('Verify.description', {
                    email: () => (
                        <Text
                            className="font-bold"
                            data-testid="verification-email"
                            value={email}
                        />
                    ),
                })}
            />
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
                            {t('Verify.cta')}
                        </Button>
                    </form>
                </div>
                <Link
                    className="btn btn-primary h-10 min-h-min text-nowrap"
                    href="/login"
                    color="primary"
                >
                    {t('Login.cta')}
                </Link>
            </div>
        </div>
    );
};
