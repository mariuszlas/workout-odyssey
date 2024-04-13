import { FC } from 'react';

import {
    ClockIcon,
    CounterIcon,
    RoadIcon,
    SpeedeometerIcon,
    Text,
} from '@/components';
import type { StatIconType } from '@/interfaces';

export const getStatIcon = (iconType: StatIconType, isLineItem?: boolean) => {
    const classes = isLineItem
        ? 'h-5 w-5 text-primary'
        : 'h-8 w-8 text-primary';

    switch (iconType) {
        case 'road':
            return <RoadIcon className={classes} />;
        case 'clockCircle':
            return <ClockIcon className={classes} />;
        case 'speedometer':
            return <SpeedeometerIcon className={classes} />;
        case 'counter':
            return <CounterIcon className={classes} />;
        default:
            return null;
    }
};

interface Props {
    data: number | string | undefined;
    field: string;
    units: string;
    icon: StatIconType;
}

export const StatsPanelEntry: FC<Props> = ({ data, field, units, icon }) => (
    <div className="flex items-center gap-3">
        {getStatIcon(icon)}

        <div className="flex flex-col">
            <Text value={field} />

            <div>
                <Text value={data} className="font-medium" />
                <Text value={` ${units}`} />
            </div>
        </div>
    </div>
);
