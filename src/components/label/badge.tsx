import type { FC } from 'react';

import { cn } from '@/utils/helpers';

import { CloseIcon } from '../icon';
import { Text } from '..';

import { BaseProps } from './interfaces';

interface BadgeProps extends BaseProps {
    value: string;
}

export const Badge: FC<BadgeProps> = ({ value, onClose, small }) => (
    <span
        className={cn(
            'badge overflow-hidden border border-primary text-primary',
            small ? 'badge-md' : 'badge-lg'
        )}
    >
        <Text className="overflow-hidden text-ellipsis" value={value} />
        {onClose && (
            <button className="ml-2 p-0.5" onClick={onClose} aria-label="close">
                <CloseIcon className="h-4 w-4 rounded-full opacity-60 hover:opacity-100" />
            </button>
        )}
    </span>
);
