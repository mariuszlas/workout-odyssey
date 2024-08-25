import type { FC } from 'react';
import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import useSWR from 'swr';

import {
    Badge,
    Button,
    IconButton,
    Input,
    ScrollArea,
    Separator,
    SkeletonList,
    TextP,
} from '@/components';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { TLabel } from '@/interfaces';
import { useUI } from '@/providers';
import { cn } from '@/utils/helpers';

import { WorkoutForm } from '../intrefaces';

import { getNewLabel, validateNewLabel } from './helpers';

export const LabelSelector: FC<WorkoutForm> = ({ setWorkouts, workout }) => {
    const { userId } = useUI();
    const { data, isLoading } = useSWR<TLabel[]>(`/api/labels?user=${userId}`);
    const [newLabelValue, setNewLabelValue] = useState<string>('');
    const [newLabels, setNewLabels] = useState<TLabel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const labels = data ?? [];
    const isNoLabels = labels?.length + newLabels.length === 0 && !isLoading;
    const isLabelsList = !isNoLabels && !isLoading;

    const handleAddNewLabel = () => {
        setError(null);

        try {
            validateNewLabel(labels, newLabels, newLabelValue);
            const newLabel = getNewLabel(labels, newLabels, newLabelValue);
            setNewLabels(state => [...state, newLabel]);
            setNewLabelValue('');
        } catch (_) {
            setError('Incorrect data input');
        }
    };

    const onRemoveLabel = () => {
        setWorkouts(prev =>
            prev.map(wk => (wk.id === workout.id ? { ...wk, label: null } : wk))
        );
    };

    const renderLabelsList = (labels: TLabel[]) =>
        labels?.map(label => (
            <DropdownMenuItem
                key={label.background + label.value}
                onClick={() => {
                    setWorkouts(prev =>
                        prev.map(wk =>
                            wk.id === workout.id ? { ...wk, label } : wk
                        )
                    );
                    setIsOpen(false);
                }}
            >
                <div
                    className="mr-2 h-4 w-6 rounded-full"
                    style={{ background: `${label.background}` }}
                />
                {label.value}
            </DropdownMenuItem>
        ));

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn('justify-start text-left font-normal')}
                        id="dateTimeTrigger"
                    >
                        Select Label
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-3">
                    <div>
                        <div className="relative flex w-full">
                            <Input
                                type="text"
                                value={newLabelValue}
                                onChange={e => setNewLabelValue(e.target.value)}
                                placeholder="Add a new label"
                                className="pr-10"
                                error={error}
                            />
                            <IconButton
                                onClick={handleAddNewLabel}
                                className="absolute right-0"
                                aria-label="Add a new label"
                            >
                                <PlusIcon className="h-6 w-6" />
                            </IconButton>
                        </div>
                        {error && (
                            <label>
                                <span className="text-xs font-medium leading-3 text-red-600">
                                    {error}
                                </span>
                            </label>
                        )}
                    </div>
                    {labels?.length + newLabels?.length > 0 && (
                        <Separator
                            className={cn('mb-2', error ? 'mt-2' : 'mt-4')}
                        />
                    )}
                    {isLoading && (
                        <div className="flex flex-col items-stretch gap-3 p-3">
                            <SkeletonList length={6} />
                        </div>
                    )}
                    {isNoLabels && (
                        <div className="flex justify-center p-3">
                            <TextP>No labels</TextP>
                        </div>
                    )}
                    <ScrollArea>
                        <DropdownMenuGroup className="max-h-40">
                            {isLabelsList && (
                                <>
                                    {renderLabelsList(newLabels)?.reverse()}
                                    {renderLabelsList(labels)}
                                </>
                            )}
                        </DropdownMenuGroup>
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>

            {workout?.label && (
                <Badge label={workout.label} onRemoveLabel={onRemoveLabel} />
            )}
        </div>
    );
};
