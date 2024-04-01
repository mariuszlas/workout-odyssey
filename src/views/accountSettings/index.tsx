'use client';

import { FC } from 'react';

import { _t, InformationIcon, Text } from '@/components';

import {
    AccountDeletion,
    BasicDetails,
    DisplayName,
    Email,
    Password,
} from './components';
import { Props } from './interfaces';

export const AccountSettings: FC<Props> = ({ data, isLoading }) => (
    <div className="flex flex-col gap-6">
        {data?.isDemo && (
            <div className="flex items-center gap-2 rounded-lg border-l-4 border-l-blue-600 bg-blue-100 p-2">
                <InformationIcon className="h-10 w-10 text-blue-600" />
                <Text
                    className="text-info-content"
                    value={_t.demoAccountLimit}
                />
            </div>
        )}

        <DisplayName data={data} isLoading={isLoading} />
        <Email data={data} isLoading={isLoading} />
        <BasicDetails data={data} isLoading={isLoading} />
        <Password isLoading={isLoading} />
        <AccountDeletion />
    </div>
);
