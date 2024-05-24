import { FC, useEffect } from 'react';
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
            notify.success(t('notify.success'));
            onClose();
        }

        if (formState?.error) {
            notify.error(formState.error);
        }
    }, [formState]);

    return (
        <div className="flex justify-end gap-4">
            <Button onClick={onClose} className="btn-ghost">
                {t('ctaSecondary')}
            </Button>

            <form action={action}>
                <Button type="submit" className="btn-error">
                    {t('cta')}
                </Button>
            </form>
        </div>
    );
};

export const DeleteWorkoutModal: FC<Props> = ({ id, onClose, isOpen }) => {
    const t = useTranslations('Dashboard.WorkoutDeletion');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <ModalHeader onClose={onClose}>{t('header')}</ModalHeader>
                <Text as="p" value={t('description')} />
                <ModalCta id={id} onClose={onClose} isOpen={isOpen} />
            </div>
        </Modal>
    );
};
