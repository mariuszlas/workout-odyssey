import { FC } from 'react';

import { _t, Drawer, DrawerProps, ModalHeader } from '@/components';
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
}) => (
    <Drawer isOpen={isOpen} onClose={onClose} size="lg" unmount={true}>
        <div className="flex h-full flex-col" id="workout-details">
            <ModalHeader className="p-4" onClose={onClose}>
                {_t.workoutDetails}
            </ModalHeader>

            <hr className="border-t border-t-base-content border-opacity-20 " />

            <div className="flex-grow p-4 sm:p-6">
                <div className="flex h-full flex-col gap-4">
                    <WorkoutDetailsPanel data={workout} />
                    <MapPanel workout={workout} />
                </div>
            </div>
        </div>
    </Drawer>
);
