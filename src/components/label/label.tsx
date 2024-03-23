import type { FC } from 'react';

import type { TLabel } from '@/interfaces';
import { cn } from '@/utils/helpers';

import { CloseIcon } from '../icon';
import { Text } from '..';

import { BaseProps } from './interfaces';

interface Props extends BaseProps {
    label: TLabel;
}

export const Label: FC<Props> = ({ onClose, label, small }) => (
    <div
        className={cn(
            'badge text-neutral-100',
            small ? 'badge-md' : 'badge-lg'
        )}
        style={{ background: `${label.color}` }}
    >
        <Text>{label.value}</Text>
        {onClose && (
            <button className="ml-2 p-0.5" onClick={onClose} aria-label="close">
                <CloseIcon className="h-3 w-3 rounded-full" />
            </button>
        )}
    </div>
);
