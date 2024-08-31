import { FC, useState } from 'react';

import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
    VisuallyHidden,
} from '@/components';
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
            <VisuallyHidden>
                <DialogDescription>
                    {previewData.length
                        ? 'Preview of uploaded data'
                        : workout
                          ? 'Edit existing workout data'
                          : 'Upload new workout data'}
                </DialogDescription>
            </VisuallyHidden>
            <div className="-m-1 flex min-h-52 flex-col gap-4 overflow-y-scroll p-1">
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
            </div>
        </>
    );
};
