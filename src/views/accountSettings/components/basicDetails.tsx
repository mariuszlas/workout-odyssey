'use client';

import type { FC } from 'react';

import { Heading, Text } from '@/components';
import { _t } from '@/constants';

import { ID, Props } from '../interfaces';

import { Container } from './shared';

export const BasicDetails: FC<Props> = ({ data, isLoading }) => {
    const basicDetails = [
        {
            title: _t.dateCreated,
            value: new Date(data?.createdAt ?? '').toLocaleDateString(),
        },
        {
            title: _t.lastLogin,
            value: new Date(data?.lastLogin ?? '').toLocaleString(),
        },
        {
            title: _t.labelTotalNoWorkout,
            value: `${data?.totalNoOfWorkouts?.toString()}${data?.isDemo ? '/1000' : ''}`,
        },
    ];

    return (
        <Container id={ID.BASIC_INFO} isLoading={isLoading} loadingClass="h-60">
            <Heading className="px-6 pb-3 pt-6 text-lg" value="Basic Info" />

            {basicDetails.map(({ title, value }, idx) => (
                <div
                    key={idx}
                    className="flex justify-between border-t border-base-content border-opacity-20 px-6 py-4"
                >
                    <Text value={title} />
                    <Text value={value} />
                </div>
            ))}
        </Container>
    );
};
