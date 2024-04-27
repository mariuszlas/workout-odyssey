'use client';

import { ReactNode } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Alert, Button, Input, PasswordInput } from '@/components';
import { Link } from '@/navigation';
import { useConfig } from '@/providers';
import { getErrors } from '@/server/validation';

import { signupUser } from './action';

export const SignupForm = () => {
    const { acceptNewUsers } = useConfig();
    const [formState, action] = useFormState(
        signupUser.bind(null, acceptNewUsers),
        undefined
    );
    const t = useTranslations('Auth');

    const {
        emailError,
        nameError,
        passwordError,
        passwordRepeatError,
        otherError,
    } = getErrors(formState);

    const loginLink = (value: ReactNode) => (
        <Link href="/login" className="link link-primary font-medium">
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
                    <Input
                        required
                        id="name"
                        name="name"
                        type="text"
                        label={t('form.name.label')}
                        placeholder={t('form.name.placeholder')}
                        error={nameError}
                        aria-invalid={Boolean(nameError)}
                        aria-errormessage={nameError}
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
                </div>

                <div>
                    <PasswordInput
                        id="passwordRepeat"
                        name="passwordRepeat"
                        label={t('form.passwordRepeat.label')}
                        placeholder={t('form.passwordPlaceholder')}
                        error={passwordRepeatError}
                        aria-invalid={Boolean(passwordRepeatError)}
                        aria-errormessage={passwordRepeatError}
                        iconAriaLabel={t('form.passwordRepeat.aria')}
                    />
                </div>
            </div>

            <Button type="submit" className="btn-primary btn-block">
                {t('Signup.cta')}
            </Button>

            <div>{t.rich('Signup.loginLink', { link: loginLink })}</div>
        </form>
    );
};
