import type { FC } from 'react';

import { _t, BrushIcon, IconButton, Input } from '@/components';

export interface FilteringProps {
    setFilterBy: (filterBy: string) => void;
    filterBy: string;
}

export const Filtering: FC<FilteringProps> = ({ setFilterBy, filterBy }) => (
    <div className="relative max-w-xs">
        <Input
            type="text"
            value={filterBy}
            placeholder={_t.filter}
            onChange={e => setFilterBy(e.target.value)}
            className="pr-10"
        />

        <IconButton
            aria-label="Clear filter"
            onClick={() => setFilterBy('')}
            className="absolute right-0"
        >
            <BrushIcon />
        </IconButton>
    </div>
);
