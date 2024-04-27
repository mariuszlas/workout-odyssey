import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ModalHeader } from '@/components';
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
            <ModalHeader onClose={onClose}>
                {previewData.length
                    ? t('Preview.header')
                    : workout
                      ? t('Forms.editHeader')
                      : t('Forms.uploadHeader')}
            </ModalHeader>

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
