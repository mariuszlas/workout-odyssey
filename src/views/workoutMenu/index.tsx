'use client';

import type { FC } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Menu } from '@headlessui/react';

import {
    _t,
    EditIcon,
    IconButton,
    InformationIcon,
    MenuButton,
    MenuTransition,
    MoreVerticalIcon,
    Text,
    TrashIcon,
} from '@/components';
import { Workout } from '@/interfaces';
import { cn } from '@/utils/helpers';

import { DeleteWorkoutModal } from '../deleteWorkoutModal';
import { WorkoutDetailsDrawer } from '../workoutDetailsDrawer';
import { WorkoutUploadModal } from '../workoutUploadModal';

export interface Props {
    data: Workout;
}
export const WorkoutMenu: FC<Props> = ({ data }) => {
    const [top, setTop] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const MIN_MENU_HEIGHT = 140;

    const [isWorkoutUploadModalOpen, setIsWorkoutUploadModalOpen] =
        useState(false);
    const [isDeleteWorkoutModalOpen, setDeleteWorkoutModalOpen] =
        useState(false);
    const [isWorkoutDetailsDrawerOpen, setWorkoutDetailsDrawerOpen] =
        useState(false);

    const handleMenuBtnClick = () => {
        if (ref?.current) {
            const btnBottomPosition =
                ref.current.getBoundingClientRect().bottom;
            const shouldDisplayMenuAboveBtn =
                window.innerHeight - btnBottomPosition < MIN_MENU_HEIGHT;
            if (shouldDisplayMenuAboveBtn) {
                setTop(true);
            }
        }
    };

    const items = [
        {
            onClick: () => setWorkoutDetailsDrawerOpen(true),
            text: _t.workoutDetails,
            icon: <InformationIcon />,
        },
        {
            onClick: () => setIsWorkoutUploadModalOpen(true),
            text: _t.edit,
            icon: <EditIcon />,
        },
        {
            onClick: () => setDeleteWorkoutModalOpen(true),
            text: _t.delete,
            icon: <TrashIcon />,
            hoverRed: true,
        },
    ];

    return (
        <>
            <Menu as="div" className="relative">
                <Menu.Button as={Fragment}>
                    <IconButton
                        ref={ref}
                        aria-label={`workout ${data.id} properties menu`}
                        onClick={handleMenuBtnClick}
                    >
                        <MoreVerticalIcon />
                    </IconButton>
                </Menu.Button>

                <MenuTransition>
                    <Menu.Items
                        className={cn(
                            'absolute right-0 z-10 w-52 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none',
                            top ? 'bottom-0 mb-11' : 'mt-1'
                        )}
                    >
                        {items.map(({ onClick, text, icon, hoverRed }) => (
                            <Menu.Item key={text}>
                                {({ active }) => (
                                    <MenuButton
                                        active={active}
                                        hoverRed={hoverRed}
                                        onClick={onClick}
                                    >
                                        {icon}
                                        <Text>{text}</Text>
                                    </MenuButton>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </MenuTransition>
            </Menu>

            <WorkoutUploadModal
                isOpen={isWorkoutUploadModalOpen}
                onClose={() => setIsWorkoutUploadModalOpen(false)}
                workout={data}
            />

            <DeleteWorkoutModal
                isOpen={isDeleteWorkoutModalOpen}
                onClose={() => setDeleteWorkoutModalOpen(false)}
                id={data.id}
            />

            <WorkoutDetailsDrawer
                isOpen={isWorkoutDetailsDrawerOpen}
                onClose={() => setWorkoutDetailsDrawerOpen(false)}
                workout={data}
            />
        </>
    );
};
