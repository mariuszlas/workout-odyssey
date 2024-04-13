import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { BrushIcon, IconButton, Input } from '@/components';

export interface FilteringProps {
    setFilterBy: (filterBy: string) => void;
    filterBy: string;
}

export const Filtering: FC<FilteringProps> = ({ setFilterBy, filterBy }) => {
    const t = useTranslations('Dashboard.WorkoutList.Header.filtering');

    return (
        <div className="relative max-w-xs">
            <Input
                type="text"
                value={filterBy}
                placeholder={t('placeholder')}
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
};
