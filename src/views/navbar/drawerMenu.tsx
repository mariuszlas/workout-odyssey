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
        <div className="flex h-screen flex-col gap-4 p-4">
            <div className="flex w-full items-center justify-between pl-4">
                <H2 className="text-xl">Main Menu</H2>
                <CloseButton onClick={onClose} />
            </div>
            <Separator />
            <ul className="w-full overflow-y-scroll" role="menu">
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
                        <Separator className="my-2" />
                        <WorkoutSelector isMobile onClose={onClose} />
                    </>
                )}
                {!isProtected && (
                    <>
                        {showLoginBtn && (
                            <li>
                                <SignInButton forceRedirectUrl="/dashboard/running">
                                    <Button
                                        variant="menuitem"
                                        role="menuitem"
                                        onClick={onClose}
                                    >
                                        <a>Sign In</a>
                                    </Button>
                                </SignInButton>
                            </li>
                        )}
                        {showSignupBtn && (
                            <li>
                                <SignUpButton>
                                    <Button
                                        variant="menuitem"
                                        role="menuitem"
                                        onClick={onClose}
                                    >
                                        <a>Create Account</a>
                                    </Button>
                                </SignUpButton>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </div>
    </Drawer>
);
