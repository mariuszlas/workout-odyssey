import type { FC } from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { PlusIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import {
    Button,
    CloseButton,
    Drawer,
    Separator,
    TextP,
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
            <div className="flex w-full items-center justify-between p-4 pl-8">
                <TextP
                    className="text-xl font-semibold"
                    value={t('mainMenu')}
                />
                <CloseButton onClick={onClose} />
            </div>
            <Separator />
            <ul className="w-full p-4" role="menu">
                <ThemeSwitch isMobile />

                {isProtected && (
                    <>
                        <li>
                            <Button
                                variant="menuitem"
                                role="menuitem"
                                onClick={() => {
                                    onClose();
                                    openWorkoutUploadModal();
                                }}
                            >
                                {t('newWorkoutCta')}
                                <PlusIcon className="h-6 w-6" />
                            </Button>
                        </li>
                        <Separator />
                        <WorkoutSelector isMobile onClose={onClose} />
                    </>
                )}

                {!isProtected && (
                    <>
                        {showLoginBtn && (
                            <SignInButton
                                forceRedirectUrl={'/dashboard/running'}
                            >
                                <Button
                                    variant="menuitem"
                                    role="menuitem"
                                    onClick={onClose}
                                >
                                    <a>{t('loginCta')}</a>
                                </Button>
                            </SignInButton>
                        )}
                        {showSignupBtn && (
                            <SignUpButton>
                                <Button
                                    variant="menuitem"
                                    role="menuitem"
                                    onClick={onClose}
                                >
                                    <a>{t('signupCta')}</a>
                                </Button>
                            </SignUpButton>
                        )}
                    </>
                )}
            </ul>
        </Drawer>
    );
};
