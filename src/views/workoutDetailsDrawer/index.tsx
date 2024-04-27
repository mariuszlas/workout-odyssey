import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Drawer, DrawerProps, ModalHeader } from '@/components';
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
                <ModalHeader className="p-4" onClose={onClose}>
                    {t('header')}
                </ModalHeader>

                <hr className="border-t border-t-base-content border-opacity-20 " />

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
