import { FC, useState } from 'react';

import { _t, ModalHeader } from '@/components';
import type { Workout, WorkoutPreview } from '@/interfaces';

import { FormsPanel } from './formsPanel';
import { PreviewPanel } from './previewPanel';

interface Props {
    workout?: Workout;
    onClose: () => void;
}

export const WorkoutUpload: FC<Props> = ({ workout, onClose }) => {
    const [previewData, setPreviewData] = useState<WorkoutPreview | null>(null);

    return (
        <>
            <ModalHeader onClose={onClose}>
                {previewData ? _t.dataPreviewHeader : _t.dataUploadHeader}
            </ModalHeader>

            {previewData ? (
                <PreviewPanel
                    workoutPreview={previewData}
                    setPreviewData={setPreviewData}
                    isEdit={!!workout}
                    onClose={onClose}
                />
            ) : (
                <FormsPanel
                    editWorkout={workout}
                    setPreviewData={setPreviewData}
                />
            )}
        </>
    );
};
