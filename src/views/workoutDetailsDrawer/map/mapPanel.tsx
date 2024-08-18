import { FC } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import {
    Alert,
    AlertDescription,
    AlertTitle,
    Skeleton,
    TextP,
} from '@/components';
import { Trajectory, Workout } from '@/interfaces';

import { Map } from './map';

export const MapPanel: FC<{ id: string }> = ({ id }) => {
    const { data, error, isLoading } = useSWR<Workout>(`/api/workout?id=${id}`);
    const t = useTranslations('Dashboard.WorkoutDetails');

    if (isLoading) {
        return <Skeleton />;
    }

    if (!data?.geometry) {
        return (
            <div className="flex h-full items-center justify-center">
                <TextP value={t('noGeolocation')} />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="error">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>{t('errorGeolocation')}</AlertDescription>
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
