import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('Dashboard.WorkoutUpload');

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    {previewData.length
                        ? t('Preview.header')
                        : workout
                          ? t('Forms.editHeader')
                          : t('Forms.uploadHeader')}
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
