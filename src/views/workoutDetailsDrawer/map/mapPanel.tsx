import { FC } from 'react';
import useSWR from 'swr';

import { Alert, Skeleton } from '@/components';
import { Geolocation } from '@/db/models';
import { Trajectory, Workout } from '@/interfaces';

import { Map } from './map';

interface Props {
    workout: Workout;
}

export const MapPanel: FC<Props> = ({ workout }) => {
    const id = (workout as any)?.geolocationId;

    const { data, error, isLoading } = useSWR<Geolocation>(
        `/api/geolocation?id=${id}`
    );

    if (!id) {
        return <p>This workout does not have geolocation data</p>;
    }

    if (isLoading) {
        return <Skeleton h="full" />;
    }

    if (!data || error) {
        return (
            <Alert status="error" classes="mb-0">
                Something went wrong and we could not get the geolocation data
            </Alert>
        );
    }

    const trajectory = {
        type: 'Feature',
        geometry: data.geometry,
    } as Trajectory;

    return <Map trajectory={trajectory} />;
};
