import type { FC } from 'react';

import { _t, FormLabel } from '@/components';

import { NewWorkoutProps } from '../intrefaces';

export const NotesInput: FC<NewWorkoutProps> = ({ setWorkout, workout }) => (
    <div className="form-control">
        <FormLabel text={_t.notes} />
        <textarea
            className="textarea textarea-bordered h-20 hover:border-opacity-40 focus:border-primary focus:outline-1 focus:outline-offset-0 focus:outline-primary"
            value={workout?.notes ?? ''}
            onChange={e =>
                setWorkout(prev => ({ ...prev, notes: e.target.value }))
            }
        />
    </div>
);
