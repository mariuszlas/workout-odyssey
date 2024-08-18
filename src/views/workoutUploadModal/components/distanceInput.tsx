import type { FC } from 'react';

import { Input, Label } from '@/components';

import { WorkoutForm } from '../intrefaces';

export const DistanceInput: FC<WorkoutForm> = ({ workout, setWorkouts }) => (
    <div className="max-w-28">
        <Label htmlFor="distance" isRequired>
            Distance (km)
        </Label>
        <Input
            id="distance"
            value={workout?.distance}
            type="number"
            hideNumberArrows
            onChange={e =>
                setWorkouts(prev =>
                    prev.map(wk =>
                        wk.id === workout.id
                            ? { ...wk, distance: Number(e.target.value) }
                            : wk
                    )
                )
            }
        />
    </div>
);
