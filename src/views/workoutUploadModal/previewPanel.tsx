'use client';

import { type FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Alert, Button, Heading, notify, Text } from '@/components';
import type { UploadWorkout, Workout, WorkoutPreview } from '@/interfaces';
import { useUI } from '@/providers';

import { formatDuration, getDateTimeTZ } from '../helpers';

import { addNewWorkout } from './action';

interface Props {
    workoutPreview: WorkoutPreview;
    setPreviewData: (data: WorkoutPreview | null) => void;
    isEdit: boolean;
    onClose: () => void;
}

export const PreviewPanel: FC<Props> = ({
    workoutPreview,
    setPreviewData,
    isEdit,
    onClose,
}) => {
    const [formState, action] = useFormState(
        () => addNewWorkout(dataToUpload, isEdit),
        undefined
    );

    const { units } = useUI();
    const t = useTranslations('Dashboard');

    const existingData = workoutPreview?.foundData;
    const dataToUpload = workoutPreview?.data;
    const isExistingData = existingData && existingData.length > 0;

    useEffect(() => {
        if (formState?.ok) {
            if (isEdit) {
                notify.success(t('WorkoutUpload.Preview.notify.updateSuccess'));
                onClose();
            } else {
                notify.success(t('WorkoutUpload.Preview.notify.uploadSuccess'));
                setPreviewData(null);
            }
        }

        if (formState?.error) {
            notify.error(formState.error);
        }
    }, [formState]);

    const formatPreviewItem = (workout: UploadWorkout | Workout) =>
        t('WorkoutUpload.Preview.previewDetails', {
            distance: `${workout.distance.toFixed(1)} ${units.km}`,
            duration: formatDuration(workout.duration),
        });

    return (
        <>
            <div className="flex flex-col items-stretch gap-4">
                <Alert
                    status={isExistingData ? 'warning' : 'success'}
                    classes="m-0 p-2"
                >
                    {t('WorkoutUpload.Preview.alertDetails', {
                        count: existingData.length,
                        type: t('workoutType', {
                            workoutType: dataToUpload.type,
                        }),
                        date: getDateTimeTZ(
                            dataToUpload.timestamp,
                            dataToUpload.timezone,
                            true
                        ),
                    })}
                </Alert>

                {isExistingData && (
                    <div data-testid="found-data-section">
                        <Heading
                            as="h3"
                            value={t('WorkoutUpload.Preview.foundDataHeader')}
                        />
                        <ul>
                            {existingData.map(workout => (
                                <li key={workout.id}>
                                    {formatPreviewItem(workout)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div data-testid="data-to-upload-section">
                    <Heading
                        as="h3"
                        value={t('WorkoutUpload.Preview.toUpoadHeader')}
                    />
                    <Text value={formatPreviewItem(dataToUpload)} />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    className="btn-ghost"
                    onClick={() => setPreviewData(null)}
                >
                    {t('WorkoutUpload.Preview.ctaSecondary')}
                </Button>

                <form action={action}>
                    <Button className="btn-primary" type="submit">
                        {t('WorkoutUpload.Preview.cta')}
                    </Button>
                </form>
            </div>
        </>
    );
};
