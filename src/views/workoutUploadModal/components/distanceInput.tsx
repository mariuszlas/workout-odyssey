import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Input, Label } from '@/components';
import { useIsBreakpoint } from '@/hooks';

import { WorkoutForm } from '../intrefaces';

export const DistanceInput: FC<WorkoutForm> = ({ workout, setWorkouts }) => {
    const isMobile = useIsBreakpoint('sm');
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.distance');

    return (
        <div className="max-w-28">
            <Label htmlFor="distance" isRequired>
                {isMobile ? t('labelShort') : t('label')}
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
};
