'use client';

import { ReactNode } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Alert, Button, Input, PasswordInput } from '@/components';
import { Link } from '@/navigation';
import { getErrors } from '@/server/validation';

import { loginUser } from './action';

export const LoginForm = () => {
    const [formState, action] = useFormState(loginUser, undefined);
    const { emailError, passwordError, otherError } = getErrors(formState);
    const t = useTranslations('Auth');

    const signupLink = (value: ReactNode) => (
        <Link
            href="/signup"
            className="link link-primary text-nowrap font-medium"
        >
            {value}
        </Link>
    );

    return (
        <form action={action} className="form-control w-full gap-6">
            <div className="form-control gap-2">
                {otherError && (
                    <Alert status="error" classes="mb-0" content={otherError} />
                )}
                <div>
                    <Input
                        autoFocus
                        required
                        id="email"
                        name="email"
                        type="email"
                        label={t('form.email.label')}
                        placeholder={t('form.email.placeholder')}
                        error={emailError}
                        aria-invalid={Boolean(emailError)}
                        aria-errormessage={emailError}
                    />
                </div>
                <div>
                    <PasswordInput
                        id="password"
                        name="password"
                        label={t('form.password.label')}
                        placeholder={t('form.passwordPlaceholder')}
                        error={passwordError}
                        aria-invalid={Boolean(passwordError)}
                        aria-errormessage={passwordError}
                        iconAriaLabel={t('form.password.aria')}
                    />
                    <div className="label justify-end">
                        <Link
                            className="link link-primary text-nowrap"
                            href="/password-reset"
                        >
                            {t('Login.forgotPasswordLink')}
                        </Link>
                    </div>
                </div>
            </div>
            <Button type="submit" className="btn-primary btn-block">
                {t('Login.cta')}
            </Button>
            <div>{t.rich('Login.signupLink', { link: signupLink })}</div>
        </form>
    );
};
