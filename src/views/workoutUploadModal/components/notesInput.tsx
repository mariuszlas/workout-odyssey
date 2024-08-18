import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Label } from '@/components';
import { Textarea } from '@/components/ui/textarea';

import { WorkoutForm } from '../intrefaces';

export const NotesInput: FC<WorkoutForm> = ({ setWorkouts, workout }) => {
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.notes');

    return (
        <div className="">
            <Label htmlFor="notesInput">{t('label')}</Label>
            <Textarea
                id="notesInput"
                value={workout?.notes ?? ''}
                placeholder="Add additional notes"
                onChange={e =>
                    setWorkouts(prev =>
                        prev.map(wk =>
                            wk.id === workout.id
                                ? { ...wk, notes: e.target.value }
                                : wk
                        )
                    )
                }
            />
        </div>
    );
};
