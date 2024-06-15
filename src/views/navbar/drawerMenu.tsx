import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import {
    CloseButton,
    Drawer,
    MenuButton,
    MenuLink,
    PlusIcon,
    Text,
    ThemeSwitch,
} from '@/components';
import { DrawerProps } from '@/components';

import { WorkoutSelector } from './workoutSelector';

interface Props extends DrawerProps {
    isProtected: boolean;
    openWorkoutUploadModal: () => void;
    showLoginBtn: boolean;
    showSignupBtn: boolean;
}

export const DrawerMenu: FC<Props> = ({
    isProtected,
    isOpen,
    openWorkoutUploadModal,
    onClose,
    showLoginBtn,
    showSignupBtn,
}) => {
    const t = useTranslations('Navbar');

    return (
        <Drawer isOpen={isOpen} onClose={onClose} size="sm">
            <div className="flex w-full items-center justify-between p-4">
                <Text className="text-xl font-semibold" value={t('mainMenu')} />
                <CloseButton onClick={onClose} />
            </div>

            <hr className="border-t border-t-base-content border-opacity-20 " />

            <ul className="w-full p-4" role="menu">
                <ThemeSwitch isMobile />

                {isProtected && (
                    <>
                        <li>
                            <MenuButton
                                role="menuitem"
                                onClick={() => {
                                    onClose();
                                    openWorkoutUploadModal();
                                }}
                            >
                                <Text value={t('newWorkoutCta')} />
                                <PlusIcon />
                            </MenuButton>
                        </li>

                        <hr className="my-4 border-t border-t-base-content border-opacity-20 " />
                        <WorkoutSelector isMobile onClose={onClose} />
                    </>
                )}

                {!isProtected && (
                    <>
                        {showSignupBtn && (
                            <li>
                                <MenuLink
                                    href="/signup"
                                    role="menuitem"
                                    onClick={onClose}
                                >
                                    {t('signupCta')}
                                </MenuLink>
                            </li>
                        )}
                        {showLoginBtn && (
                            <li>
                                <MenuLink
                                    href="/login"
                                    role="menuitem"
                                    onClick={onClose}
                                >
                                    {t('loginCta')}
                                </MenuLink>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </Drawer>
    );
};
