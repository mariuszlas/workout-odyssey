'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import { _t, Alert, Button, Input, PasswordInput, Text } from '@/components';
import { getErrors } from '@/server/validation';

import { loginUser } from './action';

export const LoginForm = () => {
    const [formState, action] = useFormState(loginUser, undefined);
    const { emailError, passwordError, otherError } = getErrors(formState);

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

                    <div className="label justify-end">
                        <Link
                            className="link link-primary"
                            href="/password-reset"
                        >
                            {_t.forgotPass}
                        </Link>
                    </div>
                </div>
            </div>

            <Button type="submit" className="btn-primary btn-block">
                {_t.btnLogin}
            </Button>

            <div>
                <Text value={_t.signupOffer} />
                <Link href="/signup" className="link link-primary font-medium">
                    {_t.signupHeader}
                </Link>
            </div>
        </form>
    );
};
