import { FC } from 'react';
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

    if (isLoading) {
        return <Skeleton />;
    }

    if (!data?.geometry) {
        return (
            <div className="flex h-full items-center justify-center">
                <TextP>This workout doesn&apos;t have geolocation data</TextP>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="error">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                    Something went wrong and we could not get the geolocation
                    data
                </AlertDescription>
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
