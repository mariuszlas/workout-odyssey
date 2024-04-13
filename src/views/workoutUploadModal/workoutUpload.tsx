import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ModalHeader } from '@/components';
import type { Workout, WorkoutPreview } from '@/interfaces';

import { FormsPanel } from './formsPanel';
import { PreviewPanel } from './previewPanel';

interface Props {
    workout?: Workout;
    onClose: () => void;
}

export const WorkoutUpload: FC<Props> = ({ workout, onClose }) => {
    const [previewData, setPreviewData] = useState<WorkoutPreview | null>(null);
    const t = useTranslations('Dashboard.WorkoutUpload');

    return (
        <>
            <ModalHeader onClose={onClose}>
                {previewData ? t('Preview.header') : t('Forms.header')}
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
