'use client';

import type { FC } from 'react';
import { useState } from 'react';
import {
    DotsVerticalIcon,
    InfoCircledIcon,
    Pencil2Icon,
    TrashIcon,
} from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import { IconButton } from '@/components';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Workout } from '@/interfaces';
import { cn } from '@/utils/helpers';

import { DeleteWorkoutModal } from '../../deleteWorkoutModal';
import { WorkoutDetailsDrawer } from '../../workoutDetailsDrawer';
import { WorkoutUploadModal } from '../../workoutUploadModal';

export const WorkoutMenu: FC<{ data: Workout }> = ({ data }) => {
    const t = useTranslations('Dashboard.WorkoutList.WorkoutMenu');

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
            icon: <InfoCircledIcon className="h-5 w-5" />,
        },
        {
            onClick: () => setIsWorkoutUploadModalOpen(true),
            text: t('edit'),
            icon: <Pencil2Icon className="h-5 w-5" />,
        },
        {
            onClick: () => setDeleteWorkoutModalOpen(true),
            text: t('delete'),
            icon: <TrashIcon className="h-5 w-5" />,
            hoverRed: true,
        },
    ];

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <IconButton aria-label={t('ariaLabel', { id: data.id })}>
                        <DotsVerticalIcon className="h-5 w-5" />
                    </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                    <DropdownMenuGroup>
                        {items.map(({ onClick, text, icon, hoverRed }) => (
                            <DropdownMenuItem
                                key={text}
                                onClick={onClick}
                                className={cn(
                                    'gap-2',
                                    hoverRed && 'hover:!text-red-500 '
                                )}
                            >
                                {icon}
                                {text}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

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
