'use client';

import { FC } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components';
import { ChartDataTypes } from '@/interfaces';
import { useUI } from '@/providers';
import { cn } from '@/utils/helpers';

const chartDataTypesMap = {
    [ChartDataTypes.DISTANCE]: 'Distance (km)',
    [ChartDataTypes.COUNTS]: 'Excercise Times',
    [ChartDataTypes.DURATION]: 'Total Duration (hours)',
    [ChartDataTypes.PACE]: 'Average Pace (min/km)',
    [ChartDataTypes.SPEED]: 'Average Speed (km/h)',
};

interface Props {
    className?: string;
}

export const ChartDataTypeSelector: FC<Props> = ({ className }) => {
    const { dataType, setChartDataType } = useUI();

    return (
        <Select
            onValueChange={value => setChartDataType(value as ChartDataTypes)}
            value={dataType}
        >
            <SelectTrigger className={cn('w-52', className)}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.values(ChartDataTypes).map(value => (
                        <SelectItem key={value} value={value}>
                            {chartDataTypesMap[value]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
