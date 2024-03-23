import type { FC } from 'react';
import useSWR from 'swr';

import {
    Button,
    InformationIcon,
    Modal,
    ModalHeader,
    ModalProps,
    Text,
} from '@/components';
import { UserData } from '@/interfaces';

import { _t } from '..';

import { LineItem } from './userDetailLineItem';

export const UserDetailsModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const { data, isLoading } = useSWR<UserData>('/api/user');

    return (
        <Modal isOpen={isOpen} onClose={onClose} full>
            <ModalHeader onClose={onClose}>{_t.accountSettings}</ModalHeader>

            <div className="mt-6 flex flex-col gap-4">
                {data?.isDemo && (
                    <div className="flex items-center gap-2 rounded-lg border-l-4 border-l-blue-600 bg-blue-100 p-2">
                        <InformationIcon className="h-10 w-10 text-blue-600" />
                        <Text className="text-info-content">
                            {_t.demoAccountLimit}
                        </Text>
                    </div>
                )}

                <LineItem
                    header={_t.labelName}
                    value={data?.name}
                    isLoading={isLoading}
                />
                <LineItem
                    header={_t.labelEmail}
                    value={data?.email}
                    isLoading={isLoading}
                />
                <LineItem
                    header={_t.labelPass}
                    value={_t.plcdPassword}
                    isLoading={isLoading}
                />

                <div className="flex justify-between">
                    <LineItem
                        header={_t.dateCreated}
                        value={new Date(
                            data?.createdAt ?? ''
                        ).toLocaleDateString()}
                        isLoading={isLoading}
                        noAction
                    />
                    <LineItem
                        header={_t.lastLogin}
                        value={new Date(data?.lastLogin ?? '').toLocaleString()}
                        isLoading={isLoading}
                        noAction
                    />
                </div>

                <LineItem
                    header={_t.labelTotalNoWorkout}
                    value={`${data?.totalNoOfWorkouts?.toString()}${data?.isDemo ? '/1000' : ''}`}
                    isLoading={isLoading}
                    noAction
                />

                <LineItem
                    header={_t.accountDeletion}
                    isLoading={isLoading}
                    deleteAccount
                />
            </div>

            <footer className="mt-6 flex justify-end">
                <Button className="btn-primary" onClick={onClose}>
                    {_t.btnClose}
                </Button>
            </footer>
        </Modal>
    );
};
