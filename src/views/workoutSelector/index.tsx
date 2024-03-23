'use client';

import { FC, Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { usePathname } from 'next/navigation';

import {
    Button,
    ChevronDownIcon,
    MenuLink,
    MenuTransition,
    Text,
} from '@/components';
import { WorkoutTypes } from '@/interfaces';
import { cn, getWorkoutTypeFromPathname } from '@/utils/helpers';
import { capitalize } from '@/views/helpers';

interface Props {
    onClose?: () => void;
    isMobile?: boolean;
}

export const WorkoutSelector: FC<Props> = ({ onClose, isMobile }) => {
    const pathname = usePathname();
    const currentWorkoutType = getWorkoutTypeFromPathname(pathname);

    const workoutOptions = Object.values(WorkoutTypes).filter(
        workoutType => workoutType !== currentWorkoutType
    );

    if (isMobile) {
        return (
            <>
                {Object.values(WorkoutTypes).map(workoutType => (
                    <li key={workoutType.toString()}>
                        <MenuLink
                            href={workoutType}
                            onClick={() => onClose && onClose()}
                        >
                            {capitalize(workoutType)}
                        </MenuLink>
                    </li>
                ))}
            </>
        );
    }

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button as={Fragment}>
                        <Button
                            className="btn-outline btn-primary"
                            aria-label={capitalize(currentWorkoutType)}
                        >
                            <Text>{capitalize(currentWorkoutType)}</Text>
                            <ChevronDownIcon
                                className={cn(
                                    'transform duration-300 ease-in-out',
                                    open ? 'rotate-180' : 'rotate-0'
                                )}
                            />
                        </Button>
                    </Menu.Button>

                    <MenuTransition>
                        <Menu.Items className="absolute left-0 z-10 mt-1 w-52 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none">
                            {workoutOptions.map(workoutType => (
                                <Menu.Item key={workoutType.toString()}>
                                    {({ active }) => (
                                        <MenuLink
                                            href={workoutType}
                                            active={active}
                                        >
                                            {capitalize(workoutType)}
                                        </MenuLink>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </MenuTransition>
                </>
            )}
        </Menu>
    );
};
