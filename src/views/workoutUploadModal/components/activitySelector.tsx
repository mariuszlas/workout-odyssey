import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { FormLabel, Select } from '@/components';
import { WorkoutTypes } from '@/interfaces';
import { capitalize } from '@/utils/helpers';

import { WorkoutForm } from '../intrefaces';

export const ActivitySelector: FC<WorkoutForm> = ({ workout, setWorkouts }) => {
    const t = useTranslations('Dashboard');

    return (
        <div className="w-fit">
            <FormLabel
                text={t('WorkoutUpload.Forms.activity.label')}
                htmlFor="activity"
            />
            <Select
                id="activity"
                className="w-full capitalize"
                value={workout?.type}
                onChange={e =>
                    setWorkouts(prev =>
                        prev.map(wk =>
                            wk.id === workout.id
                                ? {
                                      ...wk,
                                      type: e.target.value as WorkoutTypes,
                                  }
                                : wk
                        )
                    )
                }
            >
                {Object.values(WorkoutTypes).map(
                    (workoutType: WorkoutTypes, idx: number) => (
                        <option key={idx} value={workoutType}>
                            {capitalize(t('workoutType', { workoutType }))}
                        </option>
                    )
                )}
            </Select>
        </div>
    );
};
