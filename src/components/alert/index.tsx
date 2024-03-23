import type { FC, ReactNode } from 'react';

import { cn } from '@/utils/helpers';

import {
    CheckIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationIcon,
} from '../icon';

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
    classes?: string;
    icon?: boolean;
    children?: ReactNode;
}

export const Alert: FC<Props> = ({
    status,
    children,
    icon = true,
    classes,
}) => (
    <div
        className={cn(
            'alert my-6 flex rounded-xl text-start',
            {
                'alert-error': status === 'error',
                'alert-info': status === 'info',
                'alert-warning': status === 'warning',
                'alert-success': status === 'success',
            },
            classes
        )}
    >
        {icon && getAlertIcon(status)}
        <span>{children}</span>
    </div>
);
