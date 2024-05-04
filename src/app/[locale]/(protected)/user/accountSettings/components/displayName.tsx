'use client';

import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Button, Input, notify } from '@/components';
import { getErrors } from '@/server/validation';

import { ID, Props } from '../../interfaces';

import { updateDisplayName } from './action';
import { Body, Container, Footer } from './shared';

export const DisplayName: FC<Props> = ({ data, isLoading }) => {
    const [formState, action] = useFormState(updateDisplayName, undefined);
    const { nameError } = getErrors(formState);
    const t = useTranslations('AccountSettings.sections.name');

    useEffect(() => {
        if (formState?.ok) {
            notify.success(t('notify.success'));
        }
        if (formState?.other) {
            notify.error(formState.other);
        }
    }, [formState, t]);

    return (
        <Container id={ID.DISPLAY_NAME} isLoading={isLoading}>
            <form action={action}>
                <Body title={t('title')} description={t('description')}>
                    <div className="max-w-96">
                        <Input
                            required
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={data?.name}
                            error={nameError}
                            aria-invalid={Boolean(nameError)}
                            aria-errormessage={nameError}
                        />
                    </div>
                </Body>
                <Footer info={t('ctaInfo')}>
                    <Button className="btn btn-primary" type="submit">
                        {t('cta')}
                    </Button>
                </Footer>
            </form>
        </Container>
    );
};
