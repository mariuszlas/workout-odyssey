import type { FC } from 'react';

import { Badge, TextS } from '@/components';
import type { TLabel } from '@/interfaces';
import { cn } from '@/utils/helpers';

interface Props {
    title?: string;
    value?: string | number;
    notes?: boolean;
    label?: TLabel | null;
}

export const LineItem: FC<Props> = ({ title, value, label, notes }) => (
    <li
        className={cn(
            'flex flex-wrap justify-between border-t px-4 py-1.5 first:border-t-0',
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
