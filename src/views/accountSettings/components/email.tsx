'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { Button, Input, notify, Text } from '@/components';
import { getErrors } from '@/server/validation';
import { getCognitoAttribute } from '@/utils/helpers';

import { ID, Props } from '../interfaces';

import { updateEmail, verifyEmailUpdate } from './action';
import { Body, Container, Footer } from './shared';

export const Email: FC<Props> = ({ data, isLoading }) => {
    const [isVerify, setIsVerify] = useState(false);

    const [requestUpdateState, requestUpdate] = useFormState(
        updateEmail,
        undefined
    );
    const [verifyUpdateState, verifyUpdate] = useFormState(
        verifyEmailUpdate,
        undefined
    );

    const { emailError } = getErrors(requestUpdateState);
    const { emailVerificationCodeError } = getErrors(verifyUpdateState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if ((requestUpdateState as any)?.ok) {
            setIsVerify(true);
        }
        if (requestUpdateState?.other) {
            notify.error(requestUpdateState.other);
        }
    }, [requestUpdateState]);

    useEffect(() => {
        if ((verifyUpdateState as any)?.ok) {
            setIsVerify(false);
            notify.success('Email was successfully updated');
        }
        if (verifyUpdateState?.other) {
            notify.error(verifyUpdateState.other);
        }
    }, [verifyUpdateState]);

    const cancelEmailVerification = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
        setIsVerify(false);
    };

    return (
        <Container id={ID.EMAIL} isLoading={isLoading}>
            <form
                action={isVerify ? verifyUpdate : requestUpdate}
                ref={formRef}
            >
                <Body
                    title="Email"
                    description="Email address you want to use to log in with Workout
            Odyssey."
                >
                    <div>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            className="max-w-72"
                            defaultValue={getCognitoAttribute(data, 'email')}
                            error={emailError}
                            aria-invalid={Boolean(emailError)}
                            aria-errormessage={emailError}
                        />
                    </div>

                    {isVerify && (
                        <div className="flex flex-col gap-3 pt-4">
                            <Text as="p">
                                We sent a verification code to your new email.
                                Please enter it below to verify your email.
                                Until your new email is verified, you will still
                                be able to sign in using your previous email.
                            </Text>

                            <div>
                                <Input
                                    id="emailVerificationCode"
                                    name="emailVerificationCode"
                                    type="text"
                                    className="max-w-72"
                                    placeholder="Verification Code"
                                    error={emailVerificationCodeError}
                                    aria-invalid={Boolean(
                                        emailVerificationCodeError
                                    )}
                                    aria-errormessage={
                                        emailVerificationCodeError
                                    }
                                />
                            </div>
                        </div>
                    )}
                </Body>

                <Footer
                    info={
                        isVerify
                            ? ''
                            : 'We will email you to verify the change.'
                    }
                >
                    <div className="flex gap-4">
                        {isVerify && (
                            <Button
                                className="btn btn-ghost"
                                onClick={cancelEmailVerification}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button className="btn btn-primary" type="submit">
                            {isVerify ? 'Verify Email' : 'Save'}
                        </Button>
                    </div>
                </Footer>
            </form>
        </Container>
    );
};
