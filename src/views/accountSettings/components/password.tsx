'use client';

import { FC, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { _t, Button, notify, PasswordInput, Text } from '@/components';
import { getErrors } from '@/server/validation';

import { ID } from '../interfaces';

import { updatePassword } from './action';
import { Body, Container, Footer } from './shared';

export const Password: FC<{ isLoading?: boolean }> = ({ isLoading }) => {
    const [formState, action] = useFormState(updatePassword, undefined);
    const formRef = useRef<HTMLFormElement>(null);

    const { passwordError, passwordRepeatError, currentPasswordError } =
        getErrors(formState);

    useEffect(() => {
        if ((formState as any)?.ok) {
            notify.success('Password was successfully updated');
            if (formRef?.current) {
                formRef.current.reset();
            }
        }
        if (formState?.other) {
            notify.error(formState.other);
        }
    }, [formState]);

    return (
        <Container
            id={ID.PASSWORD}
            isLoading={isLoading}
            loadingClass="h-[35rem]"
        >
            <form action={action} ref={formRef}>
                <Body title="Change Password">
                    <div className="flex flex-col gap-3">
                        <div>
                            <PasswordInput
                                id="currentPassword"
                                name="currentPassword"
                                label="Current Password"
                                className="max-w-80 "
                                placeholder={_t.plcdPassword}
                                error={currentPasswordError}
                                aria-invalid={Boolean(currentPasswordError)}
                                aria-errormessage={currentPasswordError}
                                iconAriaLabel="toggle current password visibility"
                            />
                        </div>

                        <div>
                            <PasswordInput
                                id="password"
                                name="password"
                                className="max-w-80"
                                label="New Password"
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
                                className="max-w-80"
                                label="Confirm New Password"
                                placeholder={_t.plcdPassword}
                                error={passwordRepeatError}
                                aria-invalid={Boolean(passwordRepeatError)}
                                aria-errormessage={passwordRepeatError}
                                iconAriaLabel="toggle password repeat visibility"
                            />
                        </div>

                        <div>
                            <Text as="p" className="py-2 text-lg font-semibold">
                                Password requirements
                            </Text>
                            <Text as="p">
                                Please follow this guide for a strong password
                            </Text>
                            <ul className="list-disc px-6 py-2">
                                <li>Min 8 characters</li>
                                <li>One number (2 are recommended)</li>
                                <li>One uppercase letter</li>
                            </ul>
                        </div>
                    </div>
                </Body>

                <Footer>
                    <Button className="btn btn-primary" type="submit">
                        Update Password
                    </Button>
                </Footer>
            </form>
        </Container>
    );
};
