import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import { useTranslations } from 'next-intl';

import { CloseButton, Drawer, DrawerProps, Separator } from '@/components';
import { Workout } from '@/interfaces';

import { WorkoutDetailsPanel } from './details/workoutDetailsPanel';
import { MapPanel } from './map/mapPanel';

interface Props extends DrawerProps {
    workout: Workout;
}

export const WorkoutDetailsDrawer: FC<Props> = ({
    onClose,
    isOpen,
    workout,
}) => {
    const t = useTranslations('Dashboard.WorkoutDetails');

    return (
        <Drawer isOpen={isOpen} onClose={onClose} size="lg" unmount={true}>
            <div className="flex h-full flex-col" id="workout-details">
                <header
                    className={'flex items-center justify-between px-4 py-2'}
                >
                    <Dialog.Title as="h2" className="text-lg font-medium">
                        {t('header')}
                    </Dialog.Title>
                    <CloseButton onClick={onClose} />
                </header>
                <Separator />
                <div className="flex-grow p-4">
                    <div className="flex h-full flex-col gap-4">
                        <WorkoutDetailsPanel data={workout} />
                        <MapPanel id={workout.id} />
                    </div>
                </div>
            </div>
        </Drawer>
    );
};
