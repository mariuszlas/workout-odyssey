import type { FC } from 'react';

import {
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/';
import { WorkoutTypes } from '@/interfaces';

import { WorkoutForm } from '../intrefaces';

export const ActivitySelector: FC<WorkoutForm> = ({ workout, setWorkouts }) => (
    <div className="w-fit">
        <Label htmlFor="activitySelector">Workout Type</Label>
        <Select
            value={workout?.type}
            onValueChange={value =>
                setWorkouts(prev =>
                    prev.map(wk =>
                        wk.id === workout.id
                            ? { ...wk, type: value as WorkoutTypes }
                            : wk
                    )
                )
            }
        >
            <SelectTrigger className="w-full capitalize" id="activitySelector">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.values(WorkoutTypes).map(
                        (workoutType: WorkoutTypes, idx: number) => (
                            <SelectItem
                                className="capitalize"
                                key={idx}
                                value={workoutType}
                            >
                                {workoutType}
                            </SelectItem>
                        )
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
);
