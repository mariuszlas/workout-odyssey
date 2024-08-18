'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import type { NewWorkout, Workout, WorkoutPreview } from '@/interfaces';

import { getWorkoutsPreview } from './action';
import {
    ActivitySelector,
    DatetimePicker,
    DistanceInput,
    DurationPicker,
    LabelSelector,
    NotesInput,
    TimezoneSelector,
} from './components';
import { defaultNewWorkout, formatData } from './helpers';

interface Props {
    setPreviewData: Dispatch<SetStateAction<WorkoutPreview>>;
    workout?: Workout;
}

export const ManualUpload: FC<Props> = ({
    workout = defaultNewWorkout,
    setPreviewData,
}) => {
    const [workouts, setWorkouts] = useState<NewWorkout[]>([workout]);
    const t = useTranslations('Dashboard.WorkoutUpload');
    const props = { workout: workouts[0], setWorkouts };

    const [formState, action] = useFormState(() => {
        if (!workouts[0].distance || !workouts[0].duration) return;
        return getWorkoutsPreview(formatData(workouts));
    }, undefined);

    if (formState?.ok) {
        setPreviewData(formState.preview ?? []);
    }

    return (
        <form action={action}>
            <div className="flex flex-wrap justify-between gap-4 py-4">
                <ActivitySelector {...props} />
                <DistanceInput {...props} />
                <DurationPicker {...props} />
                <DatetimePicker {...props} />
                <TimezoneSelector {...props} />
            </div>
            <div className="flex flex-col gap-4">
                <LabelSelector {...props} />
                <NotesInput {...props} />
            </div>
            <Button className="mt-6 w-full" type="submit">
                {t('Forms.cta')}
            </Button>
        </form>
    );
};
