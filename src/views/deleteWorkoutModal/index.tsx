import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

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

import { deleteWorkoutById } from './action';

interface Props extends ModalProps {
    id: string;
}

const ModalCta: FC<Props> = ({ id, onClose }) => {
    const t = useTranslations('Dashboard.WorkoutDeletion');

    const [formState, action] = useFormState(
        () => deleteWorkoutById(id),
        undefined
    );

    useEffect(() => {
        if (formState?.ok) {
            toast.success(t('notify.success'));
            onClose();
        }

        if (formState?.error) {
            toast.error(formState.error);
        }
    }, [formState]);

    return (
        <form action={action}>
            <Button type="submit" variant="destructive">
                {t('cta')}
            </Button>
        </form>
    );
};

export const DeleteWorkoutModal: FC<Props> = ({ id, onClose, isOpen }) => {
    const t = useTranslations('Dashboard.WorkoutDeletion');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('header')}</DialogTitle>
                </DialogHeader>
                <TextP value={t('description')} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">{t('ctaSecondary')}</Button>
                    </DialogClose>
                    <ModalCta id={id} onClose={onClose} isOpen={isOpen} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
