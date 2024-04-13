import { FC } from 'react';

import { Modal, ModalProps } from '@/components';
import type { Workout } from '@/interfaces';

import { WorkoutUpload } from './workoutUpload';

interface Props extends ModalProps {
    workout?: Workout;
}

export const WorkoutUploadModal: FC<Props> = ({ workout, isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} full>
        <div className="relative flex flex-col gap-4">
            <WorkoutUpload workout={workout} onClose={onClose} />
        </div>
    </Modal>
);
