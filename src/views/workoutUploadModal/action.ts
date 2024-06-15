'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UploadWorkout, Workout as WorkoutT } from '@/interfaces';
import {
    createWorkout,
    getWorkoutPreviewDb,
    updateWorkout,
} from '@/server/services';

export const getWorkoutsPreview = async (workouts: UploadWorkout[]) => {
    const { userId } = auth();
    const t = await getTranslations('Dashboard.WorkoutUpload.errors');

    try {
        if (!userId) throw new Error();

        const existingWorkouts = await Promise.all(
            workouts.map(workout =>
                getWorkoutPreviewDb(workout.type, userId, workout.timestamp)
            )
        );

        return {
            ok: true,
            preview: workouts.map((workout, idx) => ({
                data: workout,
                foundData: existingWorkouts[idx] as unknown as WorkoutT[],
            })),
        };
    } catch (_) {
        return { ok: false, preview: null, error: t('generic') };
    }
};

export const addNewWorkouts = async (
    workouts: UploadWorkout[],
    isEdit: boolean
) => {
    const { userId } = auth();
    const t = await getTranslations('Dashboard.WorkoutUpload.errors');

    try {
        if (!userId) throw new Error();

        if (isEdit) {
            await updateWorkout(workouts[0], userId);
        } else {
            await Promise.all(
                workouts.map(workout => createWorkout(workout, userId))
            );
        }

        revalidatePath('/(protected)/dashboard/[workoutType]', 'page');

        return { ok: true, error: null };
    } catch (_) {
        return { ok: false, error: t('generic') };
    }
};
