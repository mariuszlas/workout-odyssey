'use client';

import { type FC, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import {
    Collapsible,
    CollapsibleContent,
    H2,
    IconButton,
    Skeleton,
} from '@/components';
import type {
    Children,
    Dashboarad,
    Loading,
    WorkoutsDashboard,
} from '@/interfaces';
import { cn } from '@/utils/helpers';

import { BarChart } from './chart';
import { ChartDataTypeSelector } from './dataTypeSelector';
import { YearSelector } from './yearSelector';

const ChartViewWrapper: FC<Children & Loading> = ({ children, isLoading }) => (
    <section
        className={cn(
            'border-base-content flex flex-col items-center gap-2 border-opacity-20 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg',
            isLoading && 'aspect-[3/2]'
        )}
        data-testid="chart-section"
    >
        {children}
    </section>
);

export const ChartView: FC<Dashboarad & Loading> = ({
    dashboard = {} as WorkoutsDashboard,
    isLoading,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    if (isLoading)
        return (
            <ChartViewWrapper isLoading>
                <Skeleton />
            </ChartViewWrapper>
        );

    return (
        <ChartViewWrapper>
            <header className="w-full">
                <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <H2 className="text-lg">Overview</H2>
                        <YearSelector dashboard={dashboard} />
                    </div>
                    <IconButton
                        onClick={() => setIsOpen(prev => !prev)}
                        className="sm:hidden"
                    >
                        <ChevronDownIcon
                            className={cn(
                                'h-6 w-6 transform duration-300 ease-in-out',
                                isOpen ? 'rotate-180' : 'rotate-0'
                            )}
                        />
                    </IconButton>
                    <ChartDataTypeSelector className="hidden sm:flex" />
                </div>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <CollapsibleContent>
                        <ChartDataTypeSelector className="mt-2" />
                    </CollapsibleContent>
                </Collapsible>
            </header>
            <BarChart dashboard={dashboard} />
        </ChartViewWrapper>
    );
};
