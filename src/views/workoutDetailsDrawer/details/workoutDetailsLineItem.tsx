import type { FC } from 'react';
import clsx from 'clsx';

import { Label, Text } from '@/components';
import type { TLabel } from '@/interfaces';

interface Props {
    title?: string;
    value?: string | number;
    notes?: boolean;
    label?: TLabel | null;
}

export const LineItem: FC<Props> = ({ title, value, label, notes }) => (
    <li
        className={clsx(
            'flex flex-wrap justify-between border-t border-t-base-content border-opacity-20 px-4 py-2 first:border-t-0',
            notes ? 'gap-x-12' : 'gap-x-4'
        )}
    >
        <Text className="font-medium" value={title} />
        {label ? (
            <div className="flex flex-wrap gap-x-4 ">
                <Label label={label} />
                <Text value={value} />
            </div>
        ) : (
            <Text value={value} />
        )}
    </li>
);
