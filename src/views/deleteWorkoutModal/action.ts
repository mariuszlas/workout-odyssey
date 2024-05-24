'use server';

import { revalidatePath } from 'next/cache';

import { deleteWorkout } from '@/server/services';

export const deleteWorkoutById = async (id: string) => {
    try {
        const response = await deleteWorkout(id);

        if (!response) {
            throw new Error('Workout deletion failed');
        }

        revalidatePath('/(protected)/dashboard/[workoutType]', 'page');
        return { ok: true, error: null };
    } catch (_) {
        return { ok: false, error: 'Failed to delete the workout' };
    }
};
