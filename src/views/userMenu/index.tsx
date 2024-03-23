'use client';

import { Fragment, useState } from 'react';
import { Popover } from '@headlessui/react';
import useSWR from 'swr';

import {
    _t,
    Heading,
    IconButton,
    MenuButton,
    MenuTransition,
    Text,
    UserIcon,
} from '@/components';
import { UserData } from '@/interfaces';

import { BestResultsModal } from '../bestResultsModal';
import { UserDetailsModal } from '../userDetailsModal';

import { logoutUser } from './action';

export const UserMenu = () => {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isBestResultsModalOpen, setIsBestResultsModalOpen] = useState(false);

    const { data } = useSWR<UserData>('/api/user');

    return (
        <>
            <Popover as="div" className="relative">
                <Popover.Button as={Fragment}>
                    <IconButton aria-label="Account menu">
                        <UserIcon />
                    </IconButton>
                </Popover.Button>

                <MenuTransition>
                    <Popover.Panel
                        className="absolute right-0 z-30 mt-1 w-64 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none"
                        role="menu"
                    >
                        {data?.name && data?.email && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <Heading
                                        as="h2"
                                        className="overflow-hidden text-ellipsis px-4"
                                        title="user name"
                                    >
                                        {data.name}
                                    </Heading>
                                    <Text
                                        className="overflow-hidden text-ellipsis px-4 text-sm"
                                        title="user email"
                                    >
                                        {data.email}
                                    </Text>
                                </div>

                                <hr className="my-2 border-t border-t-base-content border-opacity-20 " />
                            </>
                        )}

                        <MenuButton
                            onClick={() => setIsBestResultsModalOpen(true)}
                        >
                            {_t.bestResults}
                        </MenuButton>

                        <MenuButton onClick={() => setIsUserModalOpen(true)}>
                            {_t.accountSettings}
                        </MenuButton>

                        <hr className="my-2 border-t border-t-base-content border-opacity-20 " />

                        <form action={logoutUser}>
                            <MenuButton type="submit" hoverRed>
                                {_t.signOut}
                            </MenuButton>
                        </form>
                    </Popover.Panel>
                </MenuTransition>
            </Popover>

            <UserDetailsModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
            />

            <BestResultsModal
                isOpen={isBestResultsModalOpen}
                onClose={() => setIsBestResultsModalOpen(false)}
            />
        </>
    );
};
