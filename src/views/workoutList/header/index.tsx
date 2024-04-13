import type { FC } from 'react';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import {
    Button,
    ChevronDownIcon,
    Collapsible,
    Heading,
    Text,
} from '@/components';
import { useIsBreakpoint } from '@/hooks';
import type { HeaderData } from '@/interfaces';
import { cn } from '@/utils/helpers';

import { getWorkoutListHeading } from '../helpers';

import type {
    AllWorkoutsToggleProps,
    FilteringProps,
    SortingProps,
} from './components';
import { AllWorkoutsToggle, Filtering, Sorting } from './components';

interface Props extends FilteringProps, AllWorkoutsToggleProps, SortingProps {
    headerData: HeaderData;
    setPageNo: (pageNo: number) => void;
}

export const WorkoutListHeader: FC<Props> = ({
    isAll,
    setIsAll,
    filterBy,
    setFilterBy,
    setSortBy,
    headerData,
    setPageNo,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobileOrTabled = useIsBreakpoint('md');
    const t = useTranslations('Dashboard.WorkoutList.Header');
    const locale = useLocale();

    const headers = {
        allWorkouts: t('allWorkouts'),
        currentMonthWorkouts: t('currentMonthWorkouts'),
        generic: t('generic'),
    };

    const toggleProps = { isAll, setIsAll, setPageNo };
    const filterProps = { filterBy, setFilterBy };

    return (
        <header className="w-full">
            <div className="flex justify-between">
                <Heading
                    as="h2"
                    className="text-2xl"
                    title="workout-list-section-title"
                >
                    {getWorkoutListHeading(
                        headerData,
                        isAll,
                        headers,
                        locale,
                        isMobileOrTabled
                    )}
                </Heading>

                <Button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="btn-primary sm:hidden"
                >
                    <Text value={t('filtering.cta')} />
                    <ChevronDownIcon
                        className={cn(
                            'transform duration-300 ease-in-out',
                            isOpen ? 'rotate-180' : 'rotate-0'
                        )}
                    />
                </Button>

                <AllWorkoutsToggle
                    {...toggleProps}
                    className="hidden sm:flex"
                />
            </div>

            <div className="mt-4 hidden justify-between gap-6 sm:flex">
                <Filtering {...filterProps} />
                <Sorting setSortBy={setSortBy} />
            </div>

            <Collapsible isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="mt-3 flex flex-col items-start gap-3 sm:hidden">
                    <div className="flex w-full justify-between gap-6">
                        <Filtering {...filterProps} />
                        <AllWorkoutsToggle
                            {...toggleProps}
                            className="sm:hidden"
                        />
                    </div>
                    <Sorting setSortBy={setSortBy} />
                </div>
            </Collapsible>
        </header>
    );
};
