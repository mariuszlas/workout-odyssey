import type { FC } from 'react';
import clsx from 'clsx';

import { cn } from '@/utils/helpers';

import {
    CheckIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationIcon,
} from '../icon';
import { Text } from '../text';

type AlertType = 'error' | 'warning' | 'success' | 'info';

const getAlertIcon = (iconType: AlertType, classes?: string) => {
    switch (iconType) {
        case 'error':
            return <ExclamationCircleIcon className={classes} />;
        case 'warning':
            return <ExclamationTriangleIcon className={classes} />;
        case 'success':
            return <CheckIcon className={classes} />;
        case 'info':
            return <InformationIcon className={classes} />;
        default:
            return null;
    }
};

interface Props {
    status: AlertType;
    content: string;
    title?: string;
    classes?: string;
    icon?: boolean;
}

export const Alert: FC<Props> = ({
    status,
    content,
    title,
    icon = true,
    classes,
}) => (
    <div
        className={cn(
            'alert my-6 grid-flow-col rounded-xl border-l-4 text-start',
            {
                'alert-error border-l-red-600': status === 'error',
                'alert-info border-blue-100 border-l-blue-600 bg-blue-100':
                    status === 'info',
                'alert-warning border-l-yellow-600': status === 'warning',
                'alert-success border-l-green-600': status === 'success',
            },
            { 'items-start': !!title },
            classes
        )}
    >
        <div className={clsx(!!title && 'pt-1')}>
            {icon && getAlertIcon(status, clsx(!!title && 'h-8 w-8'))}
        </div>

        <div>
            {title && (
                <Text as="p" className="pb-1 font-medium uppercase">
                    {title}
                </Text>
            )}
            <Text>{content}</Text>
        </div>
    </div>
);
