'use client';

import { Fragment, useState } from 'react';
import { Popover } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import {
    Button,
    Heading,
    IconButton,
    logoutUser,
    MenuButton,
    MenuLink,
    MenuTransition,
    Text,
    UserIcon,
} from '@/components';
import { UserData } from '@/interfaces';
import { usePathname } from '@/navigation';
import { getCognitoAttribute } from '@/utils/helpers';

import { BestResultsModal } from '../bestResultsModal';

export const UserMenu = () => {
    const [isBestResultsModalOpen, setIsBestResultsModalOpen] = useState(false);
    const t = useTranslations('Navbar');

    const pathname = usePathname();
    const isDashboardPage = pathname.startsWith('/dashboard');

    const { data } = useSWR<UserData>('/api/user');
    const email = getCognitoAttribute(data, 'email');
    const name = data?.name;

    return (
        <>
            {isDashboardPage ? (
                <>
                    <Popover as="div" className="relative">
                        <Popover.Button as={Fragment}>
                            <IconButton aria-label={t('aria.accountMenu')}>
                                <UserIcon />
                            </IconButton>
                        </Popover.Button>

                        <MenuTransition>
                            <Popover.Panel
                                className="absolute right-0 z-30 mt-1 w-64 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none"
                                role="menu"
                            >
                                {name && email && (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <Heading
                                                as="h2"
                                                className="overflow-hidden text-ellipsis px-4 text-2xl"
                                                title="user name"
                                                value={name}
                                            />
                                            <Text
                                                className="overflow-hidden text-ellipsis px-4 text-sm"
                                                title="user email"
                                                value={email}
                                            />
                                        </div>

                                        <hr className="my-2 border-t border-t-base-content border-opacity-20 " />
                                    </>
                                )}

                                {isDashboardPage && (
                                    <>
                                        <MenuButton
                                            onClick={() =>
                                                setIsBestResultsModalOpen(true)
                                            }
                                        >
                                            {t('bestResultsLink')}
                                        </MenuButton>

                                        <MenuLink href="/user" popover>
                                            {t('accountSettingsLink')}
                                        </MenuLink>
                                    </>
                                )}

                                <hr className="my-2 border-t border-t-base-content border-opacity-20 " />

                                <form action={logoutUser}>
                                    <MenuButton type="submit" hoverRed>
                                        {t('logoutCta')}
                                    </MenuButton>
                                </form>
                            </Popover.Panel>
                        </MenuTransition>
                    </Popover>

                    <BestResultsModal
                        isOpen={isBestResultsModalOpen}
                        onClose={() => setIsBestResultsModalOpen(false)}
                    />
                </>
            ) : (
                <form action={logoutUser}>
                    <Button
                        className="btn-outline btn-primary hidden sm:block"
                        type="submit"
                    >
                        {t('logoutCta')}
                    </Button>
                </form>
            )}
        </>
    );
};
