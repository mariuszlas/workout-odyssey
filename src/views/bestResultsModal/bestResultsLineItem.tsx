import type { FC } from 'react';

import { _t, Text } from '@/components';
import type { Workout } from '@/interfaces';

import { DateEntry, Duration, PaceOrSpeed } from '../workoutLineItem';

interface Props {
    data: Workout | null | undefined;
    header: string;
}

export const LineItem: FC<Props> = ({ data, header }) => (
    <li className="flex w-full flex-col items-stretch gap-1">
        <div className="flex flex-col sm:px-4">
            <Text as="p" className="font-medium">
                {header}
            </Text>
            <div className="flex flex-wrap justify-between">
                {data ? (
                    <>
                        <DateEntry data={data} />
                        <div className="flex gap-4">
                            <Duration data={data} />
                            <PaceOrSpeed data={data} type={data.type} />
                        </div>
                    </>
                ) : (
                    <>{_t.noData}</>
                )}
            </div>
        </div>

        <hr className="border-t border-t-primary" />
    </li>
);
