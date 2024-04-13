import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { FormLabel } from '@/components';

import { NewWorkoutProps } from '../intrefaces';

export const NotesInput: FC<NewWorkoutProps> = ({ setWorkout, workout }) => {
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.notes');

    return (
        <div className="form-control">
            <FormLabel text={t('label')} />
            <textarea
                className="textarea textarea-bordered h-20 hover:border-opacity-40 focus:border-primary focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                value={workout?.notes ?? ''}
                onChange={e =>
                    setWorkout(prev => ({ ...prev, notes: e.target.value }))
                }
            />
        </div>
    );
};
