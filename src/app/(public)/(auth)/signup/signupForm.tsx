'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import { Alert, Button, Input, PasswordInput } from '@/components';
import { _t } from '@/constants';
import { useConfig } from '@/providers';
import { getErrors } from '@/server/validation';

import { signupUser } from './action';

export const SignupForm = () => {
    const { acceptNewUsers } = useConfig();
    const [formState, action] = useFormState(
        signupUser.bind(null, acceptNewUsers),
        undefined
    );

    const {
        emailError,
        nameError,
        passwordError,
        passwordRepeatError,
        otherError,
    } = getErrors(formState);

    return (
        <form action={action} className="form-control w-full gap-6">
            <div className="form-control gap-2">
                {otherError && (
                    <Alert status="error" classes="mb-0">
                        {otherError}
                    </Alert>
                )}

                <div>
                    <Input
                        autoFocus
                        required
                        id="email"
                        name="email"
                        type="email"
                        label={_t.labelEmail}
                        placeholder={_t.plcdEmail}
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
                        label={_t.labelName}
                        placeholder={_t.plcdName}
                        error={nameError}
                        aria-invalid={Boolean(nameError)}
                        aria-errormessage={nameError}
                    />
                </div>

                <div>
                    <PasswordInput
                        id="password"
                        name="password"
                        label={_t.labelPass}
                        placeholder={_t.plcdPassword}
                        error={passwordError}
                        aria-invalid={Boolean(passwordError)}
                        aria-errormessage={passwordError}
                        iconAriaLabel="toggle password visibility"
                    />
                </div>

                <div>
                    <PasswordInput
                        id="passwordRepeat"
                        name="passwordRepeat"
                        label={_t.labelPassRep}
                        placeholder={_t.plcdPassword}
                        error={passwordRepeatError}
                        aria-invalid={Boolean(passwordRepeatError)}
                        aria-errormessage={passwordRepeatError}
                        iconAriaLabel="toggle password repeat visibility"
                    />
                </div>
            </div>

            <Button type="submit" className="btn-primary btn-block">
                {_t.btnSignup}
            </Button>

            <div>
                <span>{_t.loginOffer}</span>
                <Link href="/login" className="link link-primary font-medium">
                    {_t.loginHeader}
                </Link>
            </div>
        </form>
    );
};
