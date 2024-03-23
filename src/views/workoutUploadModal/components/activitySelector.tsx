import type { FC } from 'react';

import { _t, FormLabel, Select } from '@/components';
import { WorkoutTypes } from '@/interfaces';

import { capitalize } from '../../helpers';
import { NewWorkoutProps } from '../intrefaces';

export const ActivitySelector: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => (
    <div className="w-fit">
        <FormLabel text={_t.selectActivity} htmlFor="activity" />
        <Select
            id="activity"
            className="w-full"
            value={workout.type}
            onChange={e =>
                setWorkout(prev => ({
                    ...prev,
                    type: e.target.value as WorkoutTypes,
                }))
            }
        >
            {Object.values(WorkoutTypes).map(
                (workoutType: WorkoutTypes, idx: number) => (
                    <option key={idx} value={workoutType}>
                        {capitalize(workoutType)}
                    </option>
                )
            )}
        </Select>
    </div>
);
