'use client';

import type { FC } from 'react';

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

interface Props extends ModalProps {
    confirmAction: () => void;
}

export const ConfirmationModal: FC<Props> = ({
    isOpen,
    onClose,
    confirmAction,
}) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Discard Files</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Are you sure you want to switch to manual upload? The currently
                selected files will be discarded.
            </DialogDescription>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button onClick={confirmAction} variant="destructive">
                    Discard
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);
