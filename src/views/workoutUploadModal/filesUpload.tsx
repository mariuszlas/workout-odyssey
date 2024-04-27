'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import type { NewWorkout, WorkoutPreview } from '@/interfaces';

import { getWorkoutsPreview } from './action';
import { FileList, FilePicker } from './components';
import { formatData } from './helpers';

interface Props {
    setPreviewData: Dispatch<SetStateAction<WorkoutPreview>>;
    setHasFilesSelected: Dispatch<SetStateAction<boolean>>;
}

export const FilesUpload: FC<Props> = ({
    setPreviewData,
    setHasFilesSelected,
}) => {
    const [workouts, setWorkouts] = useState<NewWorkout[]>([]);
    const t = useTranslations('Dashboard.WorkoutUpload.Forms');

    const [formState, action] = useFormState(() => {
        if (!workouts.length) return;
        return getWorkoutsPreview(formatData(workouts));
    }, undefined);

    if (formState?.ok) {
        setPreviewData(formState.preview ?? []);
    }

    useEffect(() => {
        setHasFilesSelected(workouts.length > 0 ? true : false);
    }, [workouts, setHasFilesSelected]);

    return (
        <form action={action}>
            <div className="flex flex-col items-stretch gap-4 py-4">
                <FilePicker setWorkouts={setWorkouts} />
                <FileList setWorkouts={setWorkouts} workouts={workouts} />
            </div>
            <Button className="btn-primary btn-block mt-6" type="submit">
                {t('cta')}
            </Button>
        </form>
    );
};
