'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal, ModalHeader, ModalProps, Text } from '@/components';

interface Props extends ModalProps {
    confirmAction: () => void;
}

export const ConfirmationModal: FC<Props> = ({
    isOpen,
    onClose,
    confirmAction,
}) => {
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.confirmation');

    return (
        <Modal isOpen={isOpen} onClose={onClose} full>
            <ModalHeader onClose={onClose}>{t('title')}</ModalHeader>
            <Text as="p" className="py-4" value={t('description')} />

            <footer className="flex justify-end gap-4">
                <Button onClick={onClose} className="btn-ghost">
                    {t('cancelCta')}
                </Button>
                <Button onClick={confirmAction} className="btn-error">
                    {t('confirmCta')}
                </Button>
            </footer>
        </Modal>
    );
};
