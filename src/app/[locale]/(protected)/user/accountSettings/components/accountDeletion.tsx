'use client';

import { FC, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import {
    Button,
    Modal,
    ModalHeader,
    ModalProps,
    notify,
    Text,
} from '@/components';

import { ID } from '../../interfaces';

import { deleteUser } from './action';
import { Body, Container, Footer } from './shared';

const ConfirmationModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [formState, action] = useFormState(deleteUser, undefined);
    const t = useTranslations('AccountSettings.sections.deletion.confirmation');

    useEffect(() => {
        if (formState?.other) {
            notify.error(formState.other);
        }
        onClose();
    }, [formState]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} full>
            <ModalHeader onClose={onClose}>{t('title')}</ModalHeader>
            <Text as="p" className="py-4" value={t('description')} />

            <footer className="flex justify-end gap-4">
                <Button onClick={onClose} className="btn-ghost">
                    {t('cancelCta')}
                </Button>

                <form action={action}>
                    <Button type="submit" className="btn-error">
                        {t('confirmCta')}
                    </Button>
                </form>
            </footer>
        </Modal>
    );
};

export const AccountDeletion: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('AccountSettings.sections.deletion');

    return (
        <>
            <Container id={ID.ACCOUNT_DELETION} danger>
                <Body title={t('title')} description={t('description')} />

                <Footer>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="btn btn-error"
                    >
                        {t('cta')}
                    </Button>
                </Footer>
            </Container>

            <ConfirmationModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};
