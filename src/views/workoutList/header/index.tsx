import type { FC } from 'react';
import { useState } from 'react';
import { CollapsibleContent } from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import { Button, Collapsible, H2 } from '@/components';
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
    sortBy,
    setSortBy,
    headerData,
    setPageNo,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobileOrTabled = useIsBreakpoint('md');

    const toggleProps = { isAll, setIsAll, setPageNo };
    const filterProps = { filterBy, setFilterBy };

    return (
        <header className="w-full">
            <div className="flex items-center justify-between">
                <H2 className="text-lg">
                    {getWorkoutListHeading(headerData, isAll, isMobileOrTabled)}
                </H2>
                <Button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="sm:hidden"
                >
                    Filter
                    <ChevronDownIcon
                        className={cn(
                            'ml-2 h-6 w-6 transform duration-300 ease-in-out',
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
                <Sorting setSortBy={setSortBy} sortBy={sortBy} />
            </div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleContent>
                    <div className="mt-2 flex flex-col items-start gap-3">
                        <div className="flex w-full justify-between gap-6">
                            <Filtering {...filterProps} />
                            <AllWorkoutsToggle
                                {...toggleProps}
                                className="sm:hidden"
                            />
                        </div>
                        <Sorting setSortBy={setSortBy} sortBy={sortBy} />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </header>
    );
};
