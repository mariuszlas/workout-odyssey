'use client';

import { Dispatch, type FC, SetStateAction, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    DialogFooter,
} from '@/components';
import { useBestResultsKey } from '@/hooks';
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
    const { mutate } = useSWRConfig();
    const bestResultsKey = useBestResultsKey();

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
            mutate(bestResultsKey);
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
                        <AlertTitle>Existing Workouts Found</AlertTitle>
                        <AlertDescription>
                            Existing workouts with the same date and activity
                            type were found. You can remove those workouts from
                            the list or ignore this warning and proceed with
                            upload.
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
            <DialogFooter>
                <Button variant="outline" onClick={() => setPreviewData([])}>
                    Cancel
                </Button>
                <form action={action}>
                    <Button type="submit">Upload</Button>
                </form>
            </DialogFooter>
        </>
    );
};
