import { FC } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import { Alert, Skeleton, Text } from '@/components';
import { Trajectory, Workout } from '@/interfaces';

import { Map } from './map';

export const MapPanel: FC<{ id: number }> = ({ id }) => {
    const { data, error, isLoading } = useSWR<Workout>(`/api/workout?id=${id}`);
    const t = useTranslations('Dashboard.WorkoutDetails');

    if (isLoading) {
        return <Skeleton h="full" />;
    }

    if (!data?.geometry) {
        return (
            <div className="flex h-full items-center justify-center">
                <Text value={t('noGeolocation')} />
            </div>
        );
    }

    if (error) {
        return (
            <Alert status="error" classes="mb-0">
                {t('errorGeolocation')}
            </Alert>
        );
    }

    const trajectory: Trajectory = {
        type: 'Feature',
        geometry: data.geometry,
        properties: null,
    };

    return <Map trajectory={trajectory} />;
};
