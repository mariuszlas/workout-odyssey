'use client';

import { type FC, useEffect } from 'react';
import { useFormState } from 'react-dom';

import { _t, Alert, Button, Heading, notify, Text } from '@/components';
import type { WorkoutPreview } from '@/interfaces';

import { addNewWorkout } from './action';
import { formatPreviewItem, formatPreviewMessage } from './helpers';

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

    const existingData = workoutPreview?.foundData;
    const dataToUpload = workoutPreview?.data;
    const isExistingData = existingData && existingData.length > 0;

    useEffect(() => {
        if (formState?.ok) {
            if (isEdit) {
                notify.success('Workout was successfully updated');
                onClose();
            } else {
                notify.success('Workout was successfully uploaded');
                setPreviewData(null);
            }
        }

        if (formState?.error) {
            notify.error(formState.error);
        }
    }, [formState]);

    return (
        <>
            <div className="flex flex-col items-stretch gap-4">
                <Alert
                    status={isExistingData ? 'warning' : 'success'}
                    classes="m-0 p-2"
                >
                    {formatPreviewMessage(existingData, dataToUpload)}
                </Alert>

                {isExistingData && (
                    <div data-testid="found-data-section">
                        <Heading as="h3" value={_t.foundData} />
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
                    <Heading as="h3" value={_t.dataToUpload} />
                    <Text value={formatPreviewItem(dataToUpload)} />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    className="btn-ghost"
                    onClick={() => setPreviewData(null)}
                >
                    {_t.btnCancel}
                </Button>

                <form action={action}>
                    <Button className="btn-primary" type="submit">
                        {_t.btnUpload}
                    </Button>
                </form>
            </div>
        </>
    );
};
