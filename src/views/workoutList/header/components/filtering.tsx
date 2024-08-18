import type { FC } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import { IconButton, Input } from '@/components';

export interface FilteringProps {
    setFilterBy: (filterBy: string) => void;
    filterBy: string;
}

export const Filtering: FC<FilteringProps> = ({ setFilterBy, filterBy }) => {
    const t = useTranslations('Dashboard.WorkoutList.Header.filtering');

    return (
        <div className="relative flex max-w-xs">
            <Input
                type="text"
                value={filterBy}
                placeholder={t('placeholder')}
                onChange={e => setFilterBy(e.target.value)}
                className="pr-10"
            />
            <IconButton
                aria-label={t('ariaLabel')}
                onClick={() => setFilterBy('')}
                className="absolute right-0"
            >
                <TrashIcon className="h-6 w-6" />
            </IconButton>
        </div>
    );
};
