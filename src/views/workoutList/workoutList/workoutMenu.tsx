'use client';

import type { FC } from 'react';
import { Fragment, useState } from 'react';
import { Menu } from '@headlessui/react';
import { useTranslations } from 'next-intl';

import {
    EditIcon,
    IconButton,
    InformationIcon,
    MenuButton,
    MenuTransition,
    MoreVerticalIcon,
    Text,
    TrashIcon,
} from '@/components';
import { usePopover } from '@/hooks';
import { Workout } from '@/interfaces';

import { DeleteWorkoutModal } from '../../deleteWorkoutModal';
import { WorkoutDetailsDrawer } from '../../workoutDetailsDrawer';
import { WorkoutUploadModal } from '../../workoutUploadModal';

export const WorkoutMenu: FC<{ data: Workout }> = ({ data }) => {
    const t = useTranslations('Dashboard.WorkoutList.WorkoutMenu');
    const { setRefEl, setPopperElement, styles, attributes } = usePopover({
        position: 'bottom-end',
    });

    const [isWorkoutUploadModalOpen, setIsWorkoutUploadModalOpen] =
        useState(false);
    const [isDeleteWorkoutModalOpen, setDeleteWorkoutModalOpen] =
        useState(false);
    const [isWorkoutDetailsDrawerOpen, setWorkoutDetailsDrawerOpen] =
        useState(false);

    const items = [
        {
            onClick: () => setWorkoutDetailsDrawerOpen(true),
            text: t('details'),
            icon: <InformationIcon />,
        },
        {
            onClick: () => setIsWorkoutUploadModalOpen(true),
            text: t('edit'),
            icon: <EditIcon />,
        },
        {
            onClick: () => setDeleteWorkoutModalOpen(true),
            text: t('delete'),
            icon: <TrashIcon />,
            hoverRed: true,
        },
    ];

    return (
        <>
            <Menu as="div">
                <Menu.Button as={Fragment}>
                    <IconButton
                        ref={setRefEl}
                        aria-label={t('ariaLabel', { id: data.id })}
                    >
                        <MoreVerticalIcon />
                    </IconButton>
                </Menu.Button>
                <MenuTransition>
                    <Menu.Items
                        className="w-52 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none"
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
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
                                        <Text value={text} />
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
