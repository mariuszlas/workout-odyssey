'use client';

import { FC, Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { useTranslations } from 'next-intl';

import {
    Button,
    ChevronDownIcon,
    MenuLink,
    MenuTransition,
    Text,
} from '@/components';
import { usePopover } from '@/hooks';
import { WorkoutTypes } from '@/interfaces';
import { usePathname } from '@/navigation';
import { cn, getWorkoutTypeFromPathname } from '@/utils/helpers';

interface Props {
    onClose?: () => void;
    isMobile?: boolean;
}

export const WorkoutSelector: FC<Props> = ({ onClose, isMobile }) => {
    const pathname = usePathname();
    const currentWorkoutType = getWorkoutTypeFromPathname(pathname);
    const t = useTranslations('Dashboard');
    const { setRefEl, setPopperElement, styles, attributes } = usePopover();

    const workoutOptions = Object.values(WorkoutTypes).filter(
        workoutType => workoutType !== currentWorkoutType
    );

    if (isMobile) {
        return (
            <>
                {Object.values(WorkoutTypes).map(workoutType => (
                    <li key={workoutType.toString()}>
                        <MenuLink
                            className="capitalize"
                            href={workoutType}
                            onClick={() => onClose && onClose()}
                        >
                            {t('workoutType', { workoutType })}
                        </MenuLink>
                    </li>
                ))}
            </>
        );
    }

    return (
        <Menu as="div" data-testid="workout-selector">
            {({ open }) => (
                <>
                    <Menu.Button as={Fragment}>
                        <Button
                            className="btn-outline btn-primary"
                            ref={setRefEl}
                        >
                            <Text
                                className="capitalize"
                                value={t('workoutType', {
                                    workoutType: currentWorkoutType,
                                })}
                            />
                            <ChevronDownIcon
                                className={cn(
                                    'transform duration-300 ease-in-out',
                                    open ? 'rotate-180' : 'rotate-0'
                                )}
                            />
                        </Button>
                    </Menu.Button>
                    <MenuTransition>
                        <Menu.Items
                            className="w-52 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none"
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            {workoutOptions.map(workoutType => (
                                <Menu.Item key={workoutType.toString()}>
                                    {({ active }) => (
                                        <MenuLink
                                            href={workoutType}
                                            className="capitalize"
                                            active={active}
                                        >
                                            {t('workoutType', { workoutType })}
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
