'use server';

import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UploadWorkout, Workout as WorkoutT } from '@/interfaces';
import {
    createWorkout,
    getCurrentUserId,
    getWorkoutPreviewDb,
    updateWorkout,
} from '@/server/services';

export const getWorkoutPreview = async (workout: UploadWorkout) => {
    const userId = await getCurrentUserId();
    const t = await getTranslations('Dashboard.WorkoutUpload.errors');

    try {
        const existingWorkouts = (await getWorkoutPreviewDb(
            workout.type,
            userId,
            workout.timestamp
        )) as any as WorkoutT[];

        return {
            ok: true,
            preview: { data: workout, foundData: existingWorkouts },
        };
    } catch (_) {
        return { ok: false, preview: null, error: t('generic') };
    }
};

export const addNewWorkout = async (
    workout: UploadWorkout,
    isEdit: boolean
) => {
    const userId = await getCurrentUserId();
    const t = await getTranslations('Dashboard.WorkoutUpload.errors');

    try {
        if (isEdit) {
            await updateWorkout(workout, userId);
        } else {
            await createWorkout(workout, userId);
        }

        revalidatePath('/(protected)/dashboard/[workoutType]', 'page');

        return { ok: true, error: null };
    } catch (_) {
        return { ok: false, error: t('generic') };
    }
};
