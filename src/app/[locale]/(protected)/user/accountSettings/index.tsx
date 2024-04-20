import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { InformationIcon, Text } from '@/components';
import { getAllUserData } from '@/server/services';

import { Props } from '../interfaces';

import {
    AccountDeletion,
    BasicDetails,
    DisplayName,
    Email,
    Password,
} from './components';

const AccountSettingsBase: FC<Props> = ({ data, isLoading }) => {
    const t = useTranslations('AccountSettings');
    const props = { data, isLoading };

    return (
        <div className="flex flex-col gap-6">
            {data?.isDemo && (
                <div className="flex items-center gap-2 rounded-lg border-l-4 border-l-blue-600 bg-blue-100 p-2">
                    <InformationIcon className="h-10 w-10 text-blue-600" />
                    <Text
                        className="text-info-content"
                        value={t('demoAccountLimit')}
                    />
                </div>
            )}

            <DisplayName {...props} />
            <Email {...props} />
            <BasicDetails {...props} />
            <Password isLoading={isLoading} />
            <AccountDeletion />
        </div>
    );
};

export const AccountSettingsSkeleton: FC = () => (
    <AccountSettingsBase isLoading />
);

export const AccountSettings: FC<{ username: string }> = async ({
    username,
}) => {
    const data = await getAllUserData(username);
    return <AccountSettingsBase data={data} />;
};
