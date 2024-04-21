import type { FC } from 'react';

import type { StatIconType, Units } from '@/interfaces';
import { Workout, WorkoutTypes } from '@/interfaces';
import { formatDuration, formatPace, getDateTimeTZ } from '@/utils/helpers';

import { getStatIcon, Text } from '..';

interface Props {
    data: Workout;
    units?: Units;
}

interface TypeProps extends Props {
    type: WorkoutTypes;
}

interface DataEntryProps {
    value?: string | number;
    unit?: string;
    iconType?: StatIconType;
}

const DataEntry: FC<DataEntryProps> = ({ value, unit, iconType }) => {
    const content = (
        <Text>
            {value} {unit}
        </Text>
    );

    if (!iconType) {
        return content;
    }

    return (
        <div className="flex items-center gap-1 sm:gap-2">
            {getStatIcon(iconType, true)}
            {content}
        </div>
    );
};

export const DateEntry: FC<Props> = ({ data }) => (
    <DataEntry value={getDateTimeTZ(data.timestamp, data.timezone)} />
);

export const Distance: FC<Props> = ({ data, units }) => (
    <DataEntry value={data.distance.toFixed(1)} unit={units?.km} />
);

export const Duration: FC<Props> = ({ data }) => (
    <DataEntry value={formatDuration(data.duration)} iconType="clockCircle" />
);

export const PaceOrSpeed: FC<TypeProps> = ({ data, type, units }) =>
    type === WorkoutTypes.CYCLING ? (
        <DataEntry
            value={data.speed.toFixed(1)}
            unit={units?.kmh}
            iconType="speedometer"
        />
    ) : (
        <DataEntry
            value={formatPace(data.pace)}
            unit={`/${units?.km}`}
            iconType="speedometer"
        />
    );
