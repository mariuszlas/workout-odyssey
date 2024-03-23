'use server';

import { revalidatePath } from 'next/cache';

import { UploadWorkout, Workout as WorkoutT } from '@/interfaces';
import {
    createWorkout,
    getSessionUserId,
    getWorkoutPreviewDb,
    updateWorkout,
} from '@/server/services';

export const getWorkoutPreview = async (workout: UploadWorkout) => {
    const userId = await getSessionUserId();

    if (!userId) {
        throw new Error('User does not exist');
    }

    const existingWorkouts = (await getWorkoutPreviewDb(
        workout.type,
        userId,
        workout.timestamp
    )) as any as WorkoutT[];

    return {
        ok: true,
        preview: { data: workout, foundData: existingWorkouts },
    };
};

export const addNewWorkout = async (
    workout: UploadWorkout,
    isEdit: boolean
) => {
    try {
        const userId = await getSessionUserId();

        if (!userId) {
            throw new Error('User does not exist');
        }

        if (isEdit) {
            await updateWorkout(workout, userId);
        } else {
            await createWorkout(workout, userId);
        }

        revalidatePath('/(protected)/dashboard/[workoutType]', 'page');

        return { ok: true, error: null };
    } catch (_) {
        return { ok: false, error: 'Failed to upload the workout data' };
    }
};
