import type { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { Heading, Skeleton } from '@/components';
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
        className="flex flex-col items-start gap-2 border-base-content border-opacity-20 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg"
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
    const t = useTranslations('Dashboard.Workout');
    const locale = useLocale();

    const statType = isPrimary ? 'primary' : 'secondary';
    const testId = `${statType}-stats-section`;
    const headingTitle = `${statType}-stats-section-title`;

    if (isLoading)
        return (
            <StatsPanelWrapper testId={testId}>
                <Skeleton h={'full'} />
            </StatsPanelWrapper>
        );

    return (
        <StatsPanelWrapper testId={testId}>
            <header>
                <Heading as="h2" title={headingTitle} className="text-2xl">
                    {getStatsPanelHeading(
                        isPrimary,
                        headerData,
                        locale,
                        { yearT: t('year'), totalT: t('total') },
                        isMobile
                    )}
                </Heading>
            </header>
            <div className="flex w-full flex-col gap-3">
                <StatsPanelEntry
                    data={data?.distance?.toFixed(1) ?? 0}
                    field={t('distance')}
                    units={units.km}
                    icon="road"
                />
                <StatsPanelEntry
                    data={formatDurationAsDecimal(data?.duration)}
                    field={t('duration')}
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
                        field={t('avgSpeed')}
                        units={units.kmh}
                        icon="speedometer"
                    />
                ) : (
                    <StatsPanelEntry
                        data={formatPace(data?.pace ?? 0)}
                        field={t('avgPace')}
                        units={`/${units.km}`}
                        icon="speedometer"
                    />
                )}
                <StatsPanelEntry
                    data={data?.counts ?? 0}
                    field={t('counts')}
                    units={''}
                    icon="counter"
                />
            </div>
        </StatsPanelWrapper>
    );
};
