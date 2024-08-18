'use client';

import { Dispatch, type FC, SetStateAction, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle, Button } from '@/components';
import type { WorkoutPreview } from '@/interfaces';

import { addNewWorkouts } from './action';
import { PreviewListItem } from './components';

interface Props {
    workoutPreview: WorkoutPreview;
    setPreviewData: Dispatch<SetStateAction<WorkoutPreview>>;
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
        () =>
            addNewWorkouts(
                workoutPreview.map(({ data }) => data),
                isEdit
            ),
        undefined
    );

    const isExistingData = workoutPreview?.some(obj => {
        if (isEdit) {
            return (
                obj.foundData?.length > 0 &&
                obj.foundData.some(
                    foundDataObj => foundDataObj.id !== obj.data.id
                )
            );
        } else {
            return obj.foundData?.length > 0;
        }
    });

    useEffect(() => {
        if (formState?.ok) {
            toast.success(
                isEdit
                    ? 'Workout was successfully updated'
                    : 'Workout was successfully uploaded'
            );
            onClose();
        }

        if (formState?.error) {
            toast.error(formState.error);
            setPreviewData([]);
        }
    }, [formState]);

    return (
        <>
            <div className="flex flex-1 flex-col gap-4">
                {isExistingData && (
                    <Alert variant="warning">
                        <AlertTitle>Similar existing data found</AlertTitle>
                        <AlertDescription>
                            For some of the workouts there are already records
                            for the same date and activity type. Check the
                            details below. You may remove those workouts or
                            ignore this warning and proceed with upload.
                        </AlertDescription>
                    </Alert>
                )}
                <ul className="flex max-h-96 flex-wrap gap-3 overflow-y-scroll">
                    {workoutPreview.map((item, idx) => (
                        <PreviewListItem
                            key={idx}
                            {...item}
                            isEdit={isEdit}
                            removeItem={() => {
                                setPreviewData(prev =>
                                    prev.filter(
                                        prevObj =>
                                            prevObj.data.id !== item.data.id
                                    )
                                );
                            }}
                        />
                    ))}
                </ul>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setPreviewData([])}>
                    Cancel
                </Button>
                <form action={action}>
                    <Button type="submit">Upload</Button>
                </form>
            </div>
        </>
    );
};
