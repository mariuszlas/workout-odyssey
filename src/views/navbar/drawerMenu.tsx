import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import {
    CloseButton,
    Drawer,
    logoutUser,
    MenuButton,
    MenuLink,
    PlusIcon,
    Text,
    ThemeSwitch,
} from '@/components';
import { DrawerProps } from '@/components';

import { WorkoutSelector } from '../workoutSelector';

interface Props extends DrawerProps {
    isProtected: boolean;
    openWorkoutUploadModal: () => void;
    isSignupPage: boolean;
    isAccountSettingsPage: boolean;
}

export const DrawerMenu: FC<Props> = ({
    isProtected,
    isOpen,
    openWorkoutUploadModal,
    onClose,
    isSignupPage,
    isAccountSettingsPage,
}) => {
    const t = useTranslations('Navbar');

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <div className="flex w-full items-center justify-between p-4">
                <Text className="text-xl font-semibold" value={t('mainMenu')} />
                <CloseButton onClick={onClose} />
            </div>

            <hr className="border-t border-t-base-content border-opacity-20 " />

            <ul className="w-full p-4">
                <ThemeSwitch isMobile />

                {isProtected && (
                    <>
                        {isAccountSettingsPage && (
                            <li>
                                <MenuLink
                                    href="/dashboard/running"
                                    onClick={() => onClose()}
                                    popover
                                >
                                    {t('dashboardLink')}
                                </MenuLink>
                            </li>
                        )}

                        <li>
                            <MenuButton
                                aria-label="add workout"
                                onClick={() => {
                                    onClose();
                                    openWorkoutUploadModal();
                                }}
                            >
                                <Text value={t('newWorkoutCta')} />
                                <PlusIcon />
                            </MenuButton>
                        </li>

                        {isAccountSettingsPage && (
                            <form action={logoutUser}>
                                <MenuButton type="submit" hoverRed>
                                    {t('logoutCta')}
                                </MenuButton>
                            </form>
                        )}

                        {!isAccountSettingsPage && (
                            <>
                                <hr className="my-4 border-t border-t-base-content border-opacity-20 " />
                                <WorkoutSelector isMobile onClose={onClose} />
                            </>
                        )}
                    </>
                )}

                {!isProtected && !isSignupPage && (
                    <li>
                        <MenuLink href="/signup" onClick={onClose}>
                            {t('signupCta')}
                        </MenuLink>
                    </li>
                )}
            </ul>
        </Drawer>
    );
};
