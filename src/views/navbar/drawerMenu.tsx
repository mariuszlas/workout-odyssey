import type { FC } from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { PlusIcon } from '@radix-ui/react-icons';

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
