import type { FC } from 'react';

import {
    _t,
    CloseButton,
    Drawer,
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
}

export const DrawerMenu: FC<Props> = ({
    isProtected,
    isOpen,
    openWorkoutUploadModal,
    onClose,
    isSignupPage,
}) => (
    <Drawer isOpen={isOpen} onClose={onClose}>
        <div className="flex w-full items-center justify-between p-4">
            <Text className="text-xl font-semibold">{_t.mainMenu}</Text>
            <CloseButton onClick={onClose} />
        </div>

        <hr className="border-t border-t-base-content border-opacity-20 " />

        <ul className="w-full p-4">
            <ThemeSwitch isMobile />

            {isProtected && (
                <>
                    <li>
                        <MenuButton
                            aria-label="add workout"
                            onClick={() => {
                                onClose();
                                openWorkoutUploadModal();
                            }}
                        >
                            <Text>{_t.btnAddWorkout}</Text>
                            <PlusIcon />
                        </MenuButton>
                    </li>

                    <hr className="my-4 border-t border-t-base-content border-opacity-20 " />

                    <WorkoutSelector isMobile onClose={onClose} />
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
