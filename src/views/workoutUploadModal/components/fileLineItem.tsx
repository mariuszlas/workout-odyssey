import { Dispatch, FC, SetStateAction } from 'react';
import { ArrowLeftIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

import { Distance, IconButton, Separator, TextS } from '@/components';
import { useUI } from '@/providers';
import { getDateTimeTZ } from '@/utils/helpers';

import { WorkoutForm } from '../intrefaces';

import { LabelSelector } from './labelSelector';
import { NotesInput } from './notesInput';

interface Props extends WorkoutForm {
    isFormOpen: boolean;
    setIsFormOpen: Dispatch<SetStateAction<boolean>>;
    setSelectedWorkoutId: Dispatch<SetStateAction<string | undefined>>;
}

export const FileLineItem: FC<Props> = ({
    workout,
    setWorkouts,
    isFormOpen,
    setIsFormOpen,
    setSelectedWorkoutId,
}) => {
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
        <li className="flex w-full flex-col gap-2 rounded-lg border px-4 py-2">
            <div className="flex w-full justify-between">
                <div>
                    <TextS
                        className="font-medium"
                        value={getDateTimeTZ(
                            workout.timestamp,
                            workout.timezone,
                            false
                        )}
                    />
                    <div className="flex gap-4">
                        <TextS className="capitalize">{workout.type}</TextS>
                        <Distance value={workout.distance} units={units} />
                    </div>
                </div>
                <div className="flex gap-2">
                    <IconButton
                        onClick={onEdit}
                        aria-label={
                            isFormOpen
                                ? 'Edit data for this file'
                                : 'Back to files flist'
                        }
                    >
                        {isFormOpen ? (
                            <ArrowLeftIcon className="h-6 w-6" />
                        ) : (
                            <Pencil2Icon className="h-6 w-6" />
                        )}
                    </IconButton>
                    <IconButton
                        aria-label="Remove this file from the list"
                        onClick={onDelete}
                    >
                        <TrashIcon className="h-6 w-6" />
                    </IconButton>
                </div>
            </div>

            {isFormOpen && (
                <>
                    <Separator />
                    <NotesInput {...props} />
                    <LabelSelector {...props} />
                </>
            )}
        </li>
    );
};
