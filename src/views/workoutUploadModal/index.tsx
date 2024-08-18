import { FC } from 'react';

import { Dialog, DialogContent, ModalProps } from '@/components';
import type { Workout } from '@/interfaces';

import { WorkoutUpload } from './workoutUpload';

interface Props extends ModalProps {
    workout?: Workout;
}

export const WorkoutUploadModal: FC<Props> = ({ workout, isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <div className="relative flex min-h-72 flex-col gap-4">
                <WorkoutUpload workout={workout} onClose={onClose} />
            </div>
        </DialogContent>
    </Dialog>
);
