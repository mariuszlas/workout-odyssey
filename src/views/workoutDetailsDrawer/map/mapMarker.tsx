import { FC } from 'react';

import { MapPinIcon } from '@/components';
import { cn } from '@/utils/helpers';

export enum MarkerType {
    START = 'start',
    FINISH = 'finish',
}

interface Props {
    lat: number;
    lng: number;
    type: MarkerType;
}

export const Marker: FC<Props> = ({ type }) => (
    <MapPinIcon
        className={cn(
            'absolute h-8 w-8 -translate-x-1/2 -translate-y-full transform',
            type === MarkerType.START ? 'text-success' : 'text-error'
        )}
    />
);
