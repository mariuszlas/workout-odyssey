'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ModalProps,
    TextP,
} from '@/components';

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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                </DialogHeader>
                <TextP className="py-4" value={t('description')} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">{t('cancelCta')}</Button>
                    </DialogClose>
                    <Button onClick={confirmAction} variant="destructive">
                        {t('confirmCta')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
