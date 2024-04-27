import type { NewWorkout, UploadWorkout } from '@/interfaces';
import { WorkoutTypes } from '@/interfaces';
import dayjs from '@/utils/extended-dayjs';
import { isValidWorkoutType } from '@/utils/helpers';

export const formatAndValidateData = (
    workout: NewWorkout,
    id?: number
): UploadWorkout => {
    if (!workout.duration) throw new Error('Incorrect data input');

    let distance = workout.distance;
    if (typeof distance === 'string') distance = parseFloat(distance);

    if (distance < 0.5) throw new Error('Minimum distance is 0.5 km');

    const type = workout.type;
    if (!isValidWorkoutType(type)) {
        throw new Error('Incorrect data input');
    }

    return {
        ...(id && { id }),
        type,
        distance,
        timestamp: workout.timestamp,
        timezone: workout.timezone,
        duration: workout.duration,
        label: workout.label,
        notes: workout.notes,
        geolocation: workout.coordinates?.length ? workout.coordinates : null,
    };
};

export const formatData = (workouts: NewWorkout[]): UploadWorkout[] =>
    workouts.map(workout => ({
        id: workout.id,
        type: workout.type,
        distance: workout.distance,
        timestamp: workout.timestamp,
        timezone: workout.timezone,
        duration: workout.duration,
        label: workout.label,
        notes: workout.notes,
        geolocation: workout.coordinates?.length ? workout.coordinates : null,
    }));

export const defaultNewWorkout = {
    type: WorkoutTypes.RUNNING,
    timestamp: '',
    timezone: dayjs.tz.guess(),
    distance: 0,
    duration: 0,
    coordinates: [],
    label: null,
    notes: null,
};
