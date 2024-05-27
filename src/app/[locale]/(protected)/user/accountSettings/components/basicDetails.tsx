'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Heading, Text } from '@/components';

import { ID, Props } from '../../interfaces';

import { Container } from './shared';

export const BasicDetails: FC<Props> = ({ data, isLoading }) => {
    const t = useTranslations('AccountSettings.sections.info');

    const basicDetails = [
        {
            title: t('memberSince'),
            value: new Date(data?.createdAt ?? '').toLocaleDateString(),
        },
        {
            title: t('lastLogin'),
            value: new Date(data?.lastLogin ?? '').toLocaleString(),
        },
        {
            title: t('totalWorkouts'),
            value: `${data?.totalNoOfWorkouts?.toString()}${data?.isDemo ? '/1000' : ''}`,
        },
    ];

    return (
        <Container id={ID.BASIC_INFO} isLoading={isLoading} loadingClass="h-60">
            <Heading
                as="h3"
                className="px-6 pb-3 pt-6 text-lg"
                value={t('title')}
            />

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
