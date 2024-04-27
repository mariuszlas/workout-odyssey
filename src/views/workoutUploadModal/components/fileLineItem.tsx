import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';

import {
    BackArrow,
    Distance,
    EditIcon,
    IconButton,
    Text,
    TrashIcon,
} from '@/components';
import { useUI } from '@/providers';

import { WorkoutForm } from '../intrefaces';

import { LabelSelector } from './labelSelector';
import { NotesInput } from './notesInput';

interface Props extends WorkoutForm {
    isFormOpen: boolean;
    setIsFormOpen: Dispatch<SetStateAction<boolean>>;
    setSelectedWorkoutId: Dispatch<SetStateAction<number | undefined>>;
}

export const FileLineItem: FC<Props> = ({
    workout,
    setWorkouts,
    isFormOpen,
    setIsFormOpen,
    setSelectedWorkoutId,
}) => {
    const tDashboard = useTranslations('Dashboard');
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.files');
    const { units } = useUI();

    const props = { workout, setWorkouts };

    const onDelete = () => {
        setIsFormOpen(false);
        setSelectedWorkoutId(undefined);
        setWorkouts(prev => prev.filter(wk => wk?.id !== workout.id));
    };

    const onEdit = () => {
        setSelectedWorkoutId(!isFormOpen ? workout.id : undefined);
        setIsFormOpen(prev => !prev);
    };

    return (
        <li className="flex w-full flex-col gap-2 rounded-lg border border-base-content border-opacity-20 px-4 py-2">
            <div className="flex w-full justify-between">
                <div className="overflow-hidden overflow-ellipsis">
                    <Text className="font-medium">{workout.file?.name}</Text>
                    <div className="flex gap-4">
                        <Text className="capitalize">
                            {tDashboard('workoutType', {
                                workoutType: workout.type,
                            })}
                        </Text>
                        <Distance value={workout.distance} units={units} />
                    </div>
                </div>
                <div className="flex gap-2">
                    <IconButton
                        onClick={onEdit}
                        aria-label={t(isFormOpen ? 'aria.back' : 'aria.edit')}
                    >
                        {isFormOpen ? <BackArrow /> : <EditIcon />}
                    </IconButton>
                    <IconButton
                        aria-label={t('aria.remove')}
                        onClick={onDelete}
                    >
                        <TrashIcon />
                    </IconButton>
                </div>
            </div>

            {isFormOpen && (
                <>
                    <hr className="border-t border-t-base-content border-opacity-20" />
                    <NotesInput {...props} />
                    <LabelSelector {...props} />
                </>
            )}
        </li>
    );
};
