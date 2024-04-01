import { FC } from 'react';
import useSWR from 'swr';

import { Alert, Skeleton, Text } from '@/components';
import { Trajectory, Workout } from '@/interfaces';

import { Map } from './map';

export const MapPanel: FC<{ id: number }> = ({ id }) => {
    const { data, error, isLoading } = useSWR<Workout>(`/api/workout?id=${id}`);

    if (isLoading) {
        return <Skeleton h="full" />;
    }

    if (!data?.geometry) {
        return (
            <div className="flex h-full items-center justify-center">
                <Text value="This workout does not have geolocation data" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert status="error" classes="mb-0">
                Something went wrong and we could not get the geolocation data
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
