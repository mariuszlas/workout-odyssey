import type { FC } from 'react';

import { _t, Heading } from '@/components';
import type { MonthStats, TotalStats, YearStats } from '@/interfaces';

import { getPace } from '../../helpers';

import { getDecimal, getStatsPanelHeading } from './helpers';
import { Field, StatsPanelEntry } from './statsPanelEntry';

interface Props {
    data: TotalStats | YearStats | MonthStats | undefined;
    headerData: { year: number; secStats: number };
    isPrimary: boolean;
    isMobile?: boolean;
}

export const StatsPanel: FC<Props> = ({
    data,
    headerData,
    isPrimary,
    isMobile,
}) => (
    <section
        className="flex flex-col items-start gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg"
        data-testid={`${isPrimary ? 'primary' : 'secondary'}-stats-section`}
    >
        <header>
            <Heading
                as="h2"
                title={`${
                    isPrimary ? 'primary' : 'secondary'
                }-stats-section-title`}
            >
                {getStatsPanelHeading(isPrimary, headerData, isMobile)}
            </Heading>
        </header>

        <div className="flex w-full flex-col gap-3">
            <StatsPanelEntry
                data={data?.distance?.toFixed(1) ?? 0}
                field={Field.DISTANCE}
                units={_t.km}
                icon="road"
            />

            <StatsPanelEntry
                data={getDecimal(data?.duration)?.time ?? 0}
                field={Field.DURATION}
                units={getDecimal(data?.duration)?.unit ?? _t.h}
                icon="clockCircle"
            />

            <StatsPanelEntry
                data={getPace(data?.duration, data?.distance) ?? 0}
                field={Field.PACE}
                units={_t.perKm}
                icon="speedometer"
            />

            <StatsPanelEntry
                data={data?.counts ?? 0}
                field={Field.EX_TIMES}
                units={''}
                icon="counter"
            />
        </div>
    </section>
);
