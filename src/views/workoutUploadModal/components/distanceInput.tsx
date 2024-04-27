import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { FormLabel, Input } from '@/components';
import { useIsBreakpoint } from '@/hooks';

import { WorkoutForm } from '../intrefaces';

export const DistanceInput: FC<WorkoutForm> = ({ workout, setWorkouts }) => {
    const isMobile = useIsBreakpoint('sm');
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.distance');

    return (
        <div className="w-fit">
            <FormLabel
                text={isMobile ? t('labelShort') : t('label')}
                htmlFor="distance"
                isRequired
            />
            <Input
                id="distance"
                className="w-20 [appearance:textfield] sm:w-24 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={workout?.distance}
                type="number"
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
};
