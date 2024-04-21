'use client';

import { FC, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Button, notify, PasswordInput, Text } from '@/components';
import { getErrors } from '@/server/validation';

import { ID } from '../../interfaces';

import { updatePassword } from './action';
import { Body, Container, Footer } from './shared';

export const Password: FC<{ isLoading?: boolean }> = ({ isLoading }) => {
    const [formState, action] = useFormState(updatePassword, undefined);
    const formRef = useRef<HTMLFormElement>(null);

    const t = useTranslations('AccountSettings.sections.password');
    const authT = useTranslations('Auth.form');

    const { passwordError, passwordRepeatError, currentPasswordError } =
        getErrors(formState);

    useEffect(() => {
        if ((formState as any)?.ok) {
            notify.success(t('notify.success'));
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
                <Body title={t('title')}>
                    <div className="flex flex-col gap-3">
                        <div>
                            <PasswordInput
                                id="currentPassword"
                                name="currentPassword"
                                label={authT('currentPassword.label')}
                                className="max-w-80 "
                                placeholder={authT('passwordPlaceholder')}
                                error={currentPasswordError}
                                aria-invalid={Boolean(currentPasswordError)}
                                aria-errormessage={currentPasswordError}
                                iconAriaLabel={authT('currentPassword.aria')}
                            />
                        </div>

                        <div>
                            <PasswordInput
                                id="password"
                                name="password"
                                className="max-w-80"
                                label={authT('newPassword.label')}
                                placeholder={authT('passwordPlaceholder')}
                                error={passwordError}
                                aria-invalid={Boolean(passwordError)}
                                aria-errormessage={passwordError}
                                iconAriaLabel={authT('newPassword.aria')}
                            />
                        </div>

                        <div>
                            <PasswordInput
                                id="passwordRepeat"
                                name="passwordRepeat"
                                className="max-w-80"
                                label={authT('newPasswordRepeat.label')}
                                placeholder={authT('passwordPlaceholder')}
                                error={passwordRepeatError}
                                aria-invalid={Boolean(passwordRepeatError)}
                                aria-errormessage={passwordRepeatError}
                                iconAriaLabel={authT('newPasswordRepeat.aria')}
                            />
                        </div>

                        <div>
                            <Text
                                as="p"
                                className="py-2 text-lg font-semibold"
                                value={t('requirements.title')}
                            />
                            <Text
                                as="p"
                                value={t('requirements.description')}
                            />
                            <ul className="list-disc px-6 py-2">
                                <li>{t('requirements.req1')}</li>
                                <li>{t('requirements.req2')}</li>
                                <li>{t('requirements.req3')}</li>
                            </ul>
                        </div>
                    </div>
                </Body>

                <Footer>
                    <Button className="btn btn-primary" type="submit">
                        {t('cta')}
                    </Button>
                </Footer>
            </form>
        </Container>
    );
};
