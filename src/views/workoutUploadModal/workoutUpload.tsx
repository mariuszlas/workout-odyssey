import { FC, useState } from 'react';

import { DialogHeader, DialogTitle } from '@/components';
import type { Workout, WorkoutPreview } from '@/interfaces';

import { FormsPanel } from './formsPanel';
import { ManualUpload } from './manualUpload';
import { PreviewPanel } from './previewPanel';

interface Props {
    workout?: Workout;
    onClose: () => void;
}

export const WorkoutUpload: FC<Props> = ({ workout, onClose }) => {
    const [previewData, setPreviewData] = useState<WorkoutPreview>([]);

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    {previewData.length
                        ? 'Data Preview'
                        : workout
                          ? 'Edit Workout Data'
                          : 'Workout Upload'}
                </DialogTitle>
            </DialogHeader>

            {previewData.length ? (
                <PreviewPanel
                    setPreviewData={setPreviewData}
                    workoutPreview={previewData}
                    isEdit={!!workout}
                    onClose={onClose}
                />
            ) : (
                <>
                    {workout ? (
                        <ManualUpload
                            setPreviewData={setPreviewData}
                            workout={workout}
                        />
                    ) : (
                        <FormsPanel setPreviewData={setPreviewData} />
                    )}
                </>
            )}
        </>
    );
};
