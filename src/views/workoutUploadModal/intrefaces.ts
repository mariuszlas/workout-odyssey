import { Dispatch, SetStateAction } from 'react';

import { NewWorkout } from '@/interfaces';

export interface WorkoutForm {
    setWorkouts: Dispatch<SetStateAction<NewWorkout[]>>;
    workout: NewWorkout;
}
