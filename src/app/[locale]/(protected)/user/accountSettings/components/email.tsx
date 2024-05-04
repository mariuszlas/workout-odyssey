'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Button, Input, notify, Text } from '@/components';
import { getErrors } from '@/server/validation';
import { getCognitoAttribute } from '@/utils/helpers';

import { ID, Props } from '../../interfaces';

import { updateEmail, verifyEmailUpdate } from './action';
import { Body, Container, Footer } from './shared';

export const Email: FC<Props> = ({ data, isLoading }) => {
    const [isVerify, setIsVerify] = useState(false);
    const t = useTranslations('AccountSettings.sections.email');

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
        if (requestUpdateState?.ok) {
            setIsVerify(true);
        }
        if (requestUpdateState?.other) {
            notify.error(requestUpdateState.other);
        }
    }, [requestUpdateState]);

    useEffect(() => {
        if (verifyUpdateState?.ok) {
            setIsVerify(false);
            notify.success(t('notify.success'));
        }
        if (verifyUpdateState?.other) {
            notify.error(verifyUpdateState.other);
        }
    }, [verifyUpdateState, t]);

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
                <Body title={t('title')} description={t('description')}>
                    <div className="max-w-96">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={getCognitoAttribute(data, 'email')}
                            error={emailError}
                            aria-invalid={Boolean(emailError)}
                            aria-errormessage={emailError}
                        />
                    </div>
                    {isVerify && (
                        <div className="flex flex-col gap-3 pt-4">
                            <Text
                                as="p"
                                value={t('verification.description')}
                            />
                            <div className="max-w-96">
                                <Input
                                    id="emailVerificationCode"
                                    name="emailVerificationCode"
                                    type="text"
                                    placeholder={t(
                                        'verification.codePlaceholder'
                                    )}
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
                <Footer info={isVerify ? '' : t('ctaInfo')}>
                    <div className="flex gap-4">
                        {isVerify && (
                            <Button
                                className="btn btn-ghost"
                                onClick={cancelEmailVerification}
                            >
                                {t('verification.cancelCta')}
                            </Button>
                        )}
                        <Button className="btn btn-primary" type="submit">
                            {isVerify ? t('verification.confirmCta') : t('cta')}
                        </Button>
                    </div>
                </Footer>
            </form>
        </Container>
    );
};
