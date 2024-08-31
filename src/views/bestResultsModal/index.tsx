import type { FC } from 'react';
import useSWR from 'swr';

import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ModalProps,
    Skeleton,
    VisuallyHidden,
} from '@/components';
import { useBestResultsKey, useWorkoutType } from '@/hooks';
import { BestResults as TBestResults, WorkoutTypes } from '@/interfaces';
import { useUI } from '@/providers';

import { LineItem } from './bestResultsLineItem';

const getRunning = (translations: Translations) => [
    { key: 'one_k', value: '1K' },
    { key: 'five_k', value: '5K' },
    { key: 'ten_k', value: '10K' },
    { key: 'half_marathon', value: translations.halfMarathon },
    { key: 'marathon', value: translations.marathon },
];

const walking = [
    { key: 'ten_k', value: '10K' },
    { key: 'thirty_k', value: '30K' },
    { key: 'fifty_k', value: '50K' },
];

const cycling = [
    { key: 'thirty_k', value: '30K' },
    { key: 'fifty_k', value: '50K' },
    { key: 'hundred_k', value: '100K' },
    { key: 'one_hundred_fifty_k', value: '150K' },
    { key: 'two_hundred_k', value: '200K' },
];

interface Translations {
    halfMarathon: string;
    marathon: string;
}

const getAllKeys = (workoutType: WorkoutTypes, translations: Translations) => {
    switch (workoutType) {
        case WorkoutTypes.RUNNING:
            return getRunning(translations);
        case WorkoutTypes.WALKING:
            return walking;
        case WorkoutTypes.CYCLING:
            return cycling;
        default:
            return [];
    }
};

export const BestResultsModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const { units } = useUI();
    const workoutType = useWorkoutType();
    const bestResultsKey = useBestResultsKey();
    const { data, isLoading } = useSWR<TBestResults>(bestResultsKey);

    const translations = {
        halfMarathon: 'Half Marathon',
        marathon: 'Marathon',
    };
    const keys = getAllKeys(workoutType, translations);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Best Results for {workoutType}</DialogTitle>
                </DialogHeader>
                <VisuallyHidden>
                    <DialogDescription>
                        Best Results for {workoutType}
                    </DialogDescription>
                </VisuallyHidden>
                <ul
                    id="best-results"
                    className="flex w-full flex-col gap-2 overflow-y-scroll pt-4"
                >
                    {isLoading
                        ? keys.map(({ key, value }) => (
                              <Skeleton key={key + value} h={14} />
                          ))
                        : keys.map(({ key, value }, idx) => (
                              <LineItem
                                  key={idx}
                                  data={data?.[key]}
                                  header={value}
                                  units={units}
                                  noDataText="No data"
                              />
                          ))}
                </ul>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
