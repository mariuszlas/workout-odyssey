import type { FC } from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

import {
    Button,
    CloseButton,
    Drawer,
    H2,
    Separator,
    ThemeSwitch,
} from '@/components';
import { DrawerProps } from '@/components';

import { WorkoutSelector } from './workoutSelector';

interface Props extends DrawerProps {
    isProtected: boolean;
    openWorkoutUploadModal: () => void;
    openBestResultsModalOpen: () => void;
    showLoginBtn: boolean;
    showSignupBtn: boolean;
}

export const DrawerMenu: FC<Props> = ({
    isProtected,
    isOpen,
    openWorkoutUploadModal,
    openBestResultsModalOpen,
    onClose,
    showLoginBtn,
    showSignupBtn,
}) => (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
        <div className="flex w-full items-center justify-between p-4 pl-8">
            <H2 className="text-xl">Main Menu</H2>
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
                            Add Workout
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="menuitem"
                            role="menuitem"
                            onClick={() => {
                                onClose();
                                openBestResultsModalOpen();
                            }}
                        >
                            Best Results
                        </Button>
                    </li>
                    <Separator />
                    <WorkoutSelector isMobile onClose={onClose} />
                </>
            )}

            {!isProtected && (
                <>
                    {showLoginBtn && (
                        <SignInButton forceRedirectUrl="/dashboard/running">
                            <Button
                                variant="menuitem"
                                role="menuitem"
                                onClick={onClose}
                            >
                                <a>Sign In</a>
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
                                <a>Create Account</a>
                            </Button>
                        </SignUpButton>
                    )}
                </>
            )}
        </ul>
    </Drawer>
);
