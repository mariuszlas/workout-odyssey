import type { FC } from 'react';

import { DateEntry, Duration, PaceOrSpeed, Text } from '@/components';
import type { Units, Workout } from '@/interfaces';

interface Props {
    data: Workout | null | undefined;
    header: string;
    units: Units;
    noDataText: string;
}

export const LineItem: FC<Props> = ({ data, header, units, noDataText }) => (
    <li className="flex w-full flex-col items-stretch gap-1">
        <div className="flex flex-col sm:px-4">
            <Text as="p" className="font-medium" value={header} />
            <div className="flex flex-wrap justify-between">
                {data ? (
                    <>
                        <DateEntry data={data} />
                        <div className="flex gap-4">
                            <Duration data={data} units={units} />
                            <PaceOrSpeed
                                data={data}
                                type={data.type}
                                units={units}
                            />
                        </div>
                    </>
                ) : (
                    <>{noDataText}</>
                )}
            </div>
        </div>

        <hr className="border-t border-t-primary" />
    </li>
);
