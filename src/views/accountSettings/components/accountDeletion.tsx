import { FC, useEffect, useState } from 'react';
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

import { ID } from '../interfaces';

import { deleteUser } from './action';
import { Body, Container, Footer } from './shared';

const ConfirmationModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [formState, action] = useFormState(deleteUser, undefined);

    useEffect(() => {
        if (formState?.other) {
            notify.error(formState.other);
        }
        onClose();
    }, [formState]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} full>
            <ModalHeader onClose={onClose}>Delete Account</ModalHeader>

            <Text as="p" className="py-4">
                Are you sure you want to permanently delete your account?
            </Text>

            <footer className="flex justify-end gap-4">
                <Button onClick={onClose} className="btn-ghost">
                    {_t.btnCancel}
                </Button>

                <form action={action}>
                    <Button type="submit" className="btn-error">
                        {_t.delete}
                    </Button>
                </form>
            </footer>
        </Modal>
    );
};

export const AccountDeletion: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Container id={ID.ACCOUNT_DELETION} danger>
                <Body
                    title="Delete Account"
                    description="Permanently remove your Personal Account and all of its
            contents from the Workout Odyssey platform. This action is
            not reversible, so please continue with caution."
                />

                <Footer>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="btn btn-error"
                    >
                        Delete Account
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
