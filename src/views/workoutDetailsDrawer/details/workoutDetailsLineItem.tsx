import type { FC } from 'react';
import clsx from 'clsx';

import { Badge, TextS } from '@/components';
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
            'border-t-base-content flex flex-wrap justify-between border-t border-opacity-20 px-4 py-1.5 first:border-t-0',
            notes ? 'gap-x-12' : 'gap-x-4'
        )}
    >
        <TextS className="font-medium" value={title} />
        {label ? (
            <div className="flex flex-wrap gap-x-4 ">
                <Badge label={label} />
                <TextS value={value} />
            </div>
        ) : (
            <TextS value={value} />
        )}
    </li>
);
