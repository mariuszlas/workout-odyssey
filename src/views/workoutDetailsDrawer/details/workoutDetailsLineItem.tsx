import type { FC, ReactNode } from 'react';

import { _t, Label, Text } from '@/components';
import type { TLabel } from '@/interfaces';

interface Props {
    type?: string;
    value?: string | number;
    notes?: boolean;
    label?: TLabel | null;
    children?: ReactNode;
}

export const LineItem: FC<Props> = ({
    type,
    value,
    label,
    notes,
    children,
}) => {
    const header = <Text className="font-medium">{type}</Text>;

    let body = <Text>{value}</Text>;
    if (label) {
        body = (
            <div className="flex gap-2">
                <Label label={label} />
                {body}
            </div>
        );
    }

    return (
        <li className="flex flex-wrap justify-between">
            {!notes && (
                <>
                    {header}
                    {body}
                </>
            )}
            {notes && (
                <div className="flex flex-col items-stretch">
                    {header}
                    {body}
                </div>
            )}
            {children}
        </li>
    );
};
