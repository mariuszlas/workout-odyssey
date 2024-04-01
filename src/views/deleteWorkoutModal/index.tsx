import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';

import {
    _t,
    Button,
    Modal,
    ModalHeader,
    ModalProps,
    notify,
    Text,
} from '@/components';

import { deleteWorkoutById } from './action';

interface Props extends ModalProps {
    id: number;
}

const ModalCta: FC<Props> = ({ id, onClose }) => {
    const [formState, action] = useFormState(
        () => deleteWorkoutById(id),
        undefined
    );

    useEffect(() => {
        if (formState?.ok) {
            notify.success('Workout was successfully deleted');
            onClose();
        }

        if (formState?.error) {
            notify.error(formState.error);
        }
    }, [formState]);

    return (
        <div className="flex justify-end gap-4">
            <Button onClick={onClose} className="btn-ghost">
                {_t.btnCancel}
            </Button>

            <form action={action}>
                <Button type="submit" className="btn-error">
                    {_t.delete}
                </Button>
            </form>
        </div>
    );
};

export const DeleteWorkoutModal: FC<Props> = ({ id, onClose, isOpen }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4">
            <ModalHeader onClose={onClose}>{_t.dataDeletionHeader}</ModalHeader>
            <Text as="p" value={_t.deleteConfirmation} />
            <ModalCta id={id} onClose={onClose} isOpen={isOpen} />
        </div>
    </Modal>
);
