import type { FC } from 'react';

import { _t, Button, Skeleton, Text } from '@/components';

interface Props {
    header: string;
    value?: string;
    noAction?: boolean;
    deleteAccount?: boolean;
    isLoading?: boolean;
}

export const LineItem: FC<Props> = ({
    header,
    value,
    noAction,
    deleteAccount,
    isLoading,
}) => (
    <>
        {isLoading ? (
            <Skeleton h={12} />
        ) : (
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <Text className="font-medium">{header}</Text>
                    <Text>{value}</Text>
                </div>

                {!noAction && (
                    <Button className={deleteAccount ? 'btn-error' : ''}>
                        {deleteAccount ? _t.btnDeleteAccount : _t.edit}
                    </Button>
                )}
            </div>
        )}
    </>
);
