import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import { Button, Modal, ModalHeader, ModalProps, Skeleton } from '@/components';
import { BestResults as TBestResults, WorkoutTypes } from '@/interfaces';
import { usePathname } from '@/navigation';
import { useUI } from '@/providers';
import { getWorkoutTypeFromPathname } from '@/utils/helpers';

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
    const pathname = usePathname();
    const { userId, units } = useUI();
    const t = useTranslations('Dashboard');
    const workoutType = getWorkoutTypeFromPathname(pathname);

    const { data, isLoading } = useSWR<TBestResults>(
        `/api/best-results?user=${userId}&workoutType=${workoutType}`
    );

    const translations = {
        halfMarathon: t('BestResults.halfMarathon'),
        marathon: t('BestResults.marathon'),
    };
    const keys = getAllKeys(workoutType, translations);

    return (
        <Modal isOpen={isOpen} onClose={onClose} full>
            <ModalHeader onClose={onClose}>
                {`${t('BestResults.header')} ${t('workoutType', { workoutType })}`}
            </ModalHeader>

            <ul id="best-results" className="mt-6 flex w-full flex-col gap-4">
                {isLoading
                    ? keys.map(({ key, value }) => (
                          <Skeleton
                              key={key + value}
                              h={14}
                              className="block h-14 w-full"
                          />
                      ))
                    : keys.map(({ key, value }, idx) => (
                          <LineItem
                              key={idx}
                              data={data?.[key]}
                              header={value}
                              units={units}
                              noDataText={t('BestResults.noData')}
                          />
                      ))}
            </ul>

            <footer className="mt-6 flex justify-end">
                <Button className="btn-primary" onClick={onClose}>
                    {t('BestResults.cta')}
                </Button>
            </footer>
        </Modal>
    );
};
