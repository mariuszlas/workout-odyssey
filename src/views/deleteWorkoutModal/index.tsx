import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ModalProps,
} from '@/components';
import { useBestResultsKey } from '@/hooks';

import { deleteWorkoutById } from './action';

interface Props extends ModalProps {
    id: string;
}

const ModalCta: FC<Props> = ({ id, onClose }) => {
    const [formState, action] = useFormState(
        () => deleteWorkoutById(id),
        undefined
    );
    const { mutate } = useSWRConfig();
    const bestResultsKey = useBestResultsKey();

    useEffect(() => {
        if (formState?.ok) {
            toast.success('Workout was successfully deleted');
            mutate(bestResultsKey);
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
            <DialogDescription>
                Are you sure you want to delete this workout?
            </DialogDescription>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <ModalCta id={id} onClose={onClose} isOpen={isOpen} />
            </DialogFooter>
        </DialogContent>
    </Dialog>
);
