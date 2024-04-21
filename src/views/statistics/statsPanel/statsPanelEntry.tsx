import { FC } from 'react';

import { getStatIcon, Text } from '@/components';
import type { StatIconType } from '@/interfaces';

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
