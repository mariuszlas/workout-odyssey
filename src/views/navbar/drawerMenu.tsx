import type { FC } from 'react';

import {
    _t,
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
    isUser: boolean;
}

export const DrawerMenu: FC<Props> = ({
    isProtected,
    isOpen,
    openWorkoutUploadModal,
    onClose,
    isSignupPage,
    isUser,
}) => (
    <Drawer isOpen={isOpen} onClose={onClose}>
        <div className="flex w-full items-center justify-between p-4">
            <Text className="text-xl font-semibold" value={_t.mainMenu} />
            <CloseButton onClick={onClose} />
        </div>

        <hr className="border-t border-t-base-content border-opacity-20 " />

        <ul className="w-full p-4">
            <ThemeSwitch isMobile />

            {isProtected && (
                <>
                    {isUser && (
                        <li>
                            <MenuLink
                                href="/dashboard/running"
                                onClick={() => onClose()}
                                popover
                            >
                                Dashboard
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
                            <Text value={_t.btnAddWorkout} />
                            <PlusIcon />
                        </MenuButton>
                    </li>

                    {isUser && (
                        <form action={logoutUser}>
                            <MenuButton type="submit" hoverRed>
                                {_t.signOut}
                            </MenuButton>
                        </form>
                    )}

                    {!isUser && (
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
                        {_t.btnSignup}
                    </MenuLink>
                </li>
            )}
        </ul>
    </Drawer>
);
