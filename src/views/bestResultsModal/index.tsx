import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';

import {
    _t,
    Button,
    Modal,
    ModalHeader,
    ModalProps,
    Skeleton,
} from '@/components';
import type { BestResults as TBestResults } from '@/interfaces';
import { getWorkoutTypeFromPathname } from '@/utils/helpers';

import { LineItem } from './bestResultsLineItem';

const running = [
    { key: 'one_k', value: '1K' },
    { key: 'five_k', value: '5K' },
    { key: 'ten_k', value: '10K' },
    { key: 'half_marathon', value: 'Half Marathon' },
    { key: 'marathon', value: 'Marathon' },
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

const allKeys = { running, walking, cycling };

export const BestResultsModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const workoutType = getWorkoutTypeFromPathname(pathname);

    const { data, isLoading } = useSWR<TBestResults>(
        `/api/best-results?workoutType=${workoutType}`
    );

    const keys = workoutType ? allKeys[workoutType] : null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} full>
            <ModalHeader onClose={onClose}>
                {`${_t.bestResults} for ${workoutType}`}
            </ModalHeader>

            <ul id="best-results" className="mt-6 flex w-full flex-col gap-4">
                {isLoading
                    ? keys?.map(({ key, value }) => (
                          <Skeleton
                              key={key + value}
                              h={14}
                              className="block h-14 w-full"
                          />
                      ))
                    : keys?.map(({ key, value }, idx) => (
                          <LineItem
                              key={idx}
                              data={data?.[key]}
                              header={value}
                          />
                      ))}
            </ul>

            <footer className="mt-6 flex justify-end">
                <Button className="btn-primary" onClick={onClose}>
                    {_t.btnClose}
                </Button>
            </footer>
        </Modal>
    );
};
