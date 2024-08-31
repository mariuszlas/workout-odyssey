import type { FC } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { IconButton, Input } from '@/components';

export interface FilteringProps {
    setFilterBy: (filterBy: string) => void;
    filterBy: string;
}

export const Filtering: FC<FilteringProps> = ({ setFilterBy, filterBy }) => (
    <div className="relative flex max-w-52">
        <Input
            type="text"
            value={filterBy}
            placeholder="Filter"
            onChange={e => setFilterBy(e.target.value)}
            className="pr-10"
        />
        <IconButton
            aria-label="Clear filter"
            onClick={() => setFilterBy('')}
            className="absolute right-0"
        >
            <TrashIcon className="h-6 w-6" />
        </IconButton>
    </div>
);
