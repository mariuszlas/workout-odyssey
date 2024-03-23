import { Dispatch, SetStateAction } from 'react';

import { NewWorkout } from '@/interfaces';

export interface NewWorkoutProps {
    setWorkout: Dispatch<SetStateAction<NewWorkout>>;
    workout: NewWorkout;
}
