import type { FC } from 'react';

import { H2, Skeleton } from '@/components';
import {
    Children,
    MonthStats,
    TotalStats,
    WorkoutTypes,
    YearStats,
} from '@/interfaces';
import { useUI } from '@/providers';
import dayjs from '@/utils/extended-dayjs';
import { formatPace } from '@/utils/helpers';

import { formatDurationAsDecimal, getStatsPanelHeading } from './helpers';
import { StatsPanelEntry } from './statsPanelEntry';

interface Props {
    data: TotalStats | YearStats | MonthStats | undefined;
    headerData: { year: number; secStats: number };
    workoutType: WorkoutTypes;
    isPrimary?: boolean;
    isMobile?: boolean;
    isLoading?: boolean;
}

const StatsPanelWrapper: FC<Children & { testId: string }> = ({
    children,
    testId,
}) => (
    <section
        className="flex flex-col items-start gap-2 text-card-foreground sm:rounded-lg sm:border sm:bg-card sm:p-6 sm:shadow-sm"
        data-testid={testId}
    >
        {children}
    </section>
);

export const StatsPanel: FC<Props> = ({
    data,
    headerData,
    workoutType,
    isPrimary = false,
    isMobile,
    isLoading,
}) => {
    const { units } = useUI();

    const statType = isPrimary ? 'primary' : 'secondary';
    const testId = `${statType}-stats-section`;

    if (isLoading)
        return (
            <StatsPanelWrapper testId={testId}>
                <Skeleton />
            </StatsPanelWrapper>
        );

    return (
        <StatsPanelWrapper testId={testId}>
            <header>
                <H2 className="text-lg">
                    {getStatsPanelHeading(isPrimary, headerData, isMobile)}
                </H2>
            </header>
            <div className="flex w-full flex-col gap-2">
                <StatsPanelEntry
                    data={data?.distance?.toFixed(1) ?? 0}
                    field="Distance"
                    units={units.km}
                    icon="road"
                />
                <StatsPanelEntry
                    data={formatDurationAsDecimal(data?.duration)}
                    field="Duration"
                    units={
                        dayjs.duration(data?.duration ?? 0, 's').hours() >= 1
                            ? units.h
                            : units.min
                    }
                    icon="clockCircle"
                />
                {workoutType === WorkoutTypes.CYCLING ? (
                    <StatsPanelEntry
                        data={data?.speed?.toFixed(1) ?? 0}
                        field="Average Speed"
                        units={units.kmh}
                        icon="speedometer"
                    />
                ) : (
                    <StatsPanelEntry
                        data={formatPace(data?.pace ?? 0)}
                        field="Average Pace"
                        units={`/${units.km}`}
                        icon="speedometer"
                    />
                )}
                <StatsPanelEntry
                    data={data?.counts ?? 0}
                    field="Exercise Times"
                    units={''}
                    icon="counter"
                />
            </div>
        </StatsPanelWrapper>
    );
};
