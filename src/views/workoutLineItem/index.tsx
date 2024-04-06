import type { FC } from 'react';

import { _t, Text } from '@/components';
import type { StatIconType } from '@/interfaces';
import { Workout, WorkoutTypes } from '@/interfaces';

import { formatDuration, formatPace, getDateTimeTZ } from '../helpers';
import { getStatIcon } from '../statistics/statsPanel/statsPanelEntry';

export interface Props {
    data: Workout;
}

export interface TypeProps extends Props {
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

export const Distance: FC<Props> = ({ data }) => (
    <DataEntry value={data.distance.toFixed(1)} unit={_t.km} />
);

export const Duration: FC<Props> = ({ data }) => (
    <DataEntry value={formatDuration(data.duration)} iconType="clockCircle" />
);

export const PaceOrSpeed: FC<TypeProps> = ({ data, type }) =>
    type === WorkoutTypes.CYCLING ? (
        <DataEntry
            value={data.speed.toFixed(1)}
            unit={_t.kmPerHour}
            iconType="speedometer"
        />
    ) : (
        <DataEntry
            value={formatPace(data.pace)}
            unit={_t.perKm}
            iconType="speedometer"
        />
    );
