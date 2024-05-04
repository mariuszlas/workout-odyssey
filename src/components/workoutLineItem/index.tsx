import type { FC } from 'react';

import type { StatIconType, Units } from '@/interfaces';
import { formatDuration, formatPace, getDateTimeTZ } from '@/utils/helpers';

import { getStatIcon, Text } from '..';

interface DataEntryProps {
    value?: string | number;
    unit?: string;
    iconType?: StatIconType | null;
}

const DataEntry: FC<DataEntryProps> = ({ value, unit = '', iconType }) => {
    const textContent = (
        <Text className="text-nowrap">{`${value} ${unit}`}</Text>
    );

    if (!iconType) return textContent;

    return (
        <div className="flex items-center gap-1">
            {getStatIcon(iconType, true)}
            {textContent}
        </div>
    );
};

interface DateProps {
    timestamp: string | Date | undefined;
    tz: string | undefined;
    dateOnly?: boolean;
}

interface Props {
    units?: Units;
    icon?: boolean;
}

interface NumericProps extends Props {
    value: number;
}

export const DateEntry: FC<DateProps> = ({
    timestamp,
    tz,
    dateOnly = true,
}) => <DataEntry value={getDateTimeTZ(timestamp, tz, dateOnly)} />;

export const Distance: FC<NumericProps> = ({ value, units, icon = false }) => (
    <DataEntry
        value={value.toFixed(1)}
        unit={units?.km}
        iconType={icon ? 'road' : null}
    />
);

export const Duration: FC<NumericProps> = ({ value }) => (
    <DataEntry value={formatDuration(value)} iconType="clockCircle" />
);

export const Pace: FC<NumericProps> = ({ value, units }) => (
    <DataEntry
        value={formatPace(value)}
        unit={`/${units?.km}`}
        iconType="speedometer"
    />
);

export const Speed: FC<NumericProps> = ({ value, units }) => (
    <DataEntry
        value={value.toFixed(1)}
        unit={units?.kmh}
        iconType="speedometer"
    />
);
