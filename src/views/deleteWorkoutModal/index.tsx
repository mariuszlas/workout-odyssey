import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
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
    const [formState, action] = useFormState(
        () => deleteWorkoutById(id),
        undefined
    );

    useEffect(() => {
        if (formState?.ok) {
            toast.success('Workout was successfully deleted');
            onClose();
        }

        if (formState?.error) {
            toast.error(formState.error);
        }
    }, [formState]);

    return (
        <form action={action}>
            <Button type="submit" variant="destructive">
                Delete{' '}
            </Button>
        </form>
    );
};

export const DeleteWorkoutModal: FC<Props> = ({ id, onClose, isOpen }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Workout Deletion</DialogTitle>
            </DialogHeader>
            <TextP>Are you sure you want to delete this workout?</TextP>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <ModalCta id={id} onClose={onClose} isOpen={isOpen} />
            </DialogFooter>
        </DialogContent>
    </Dialog>
);
