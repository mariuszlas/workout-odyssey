import type { FC } from 'react';

import { cn } from '@/utils/helpers';

import { _t } from '../../..';

export interface AllWorkoutsToggleProps {
    setIsAll: (isAll: boolean) => void;
    isAll: boolean;
    setPageNo: (pageNo: number) => void;
    className?: string;
}

export const AllWorkoutsToggle: FC<AllWorkoutsToggleProps> = ({
    isAll,
    setIsAll,
    setPageNo,
    className,
}) => (
    <label className={cn('label cursor-pointer gap-3', className)}>
        <span className="label-text w-max"> {_t.allWorkoutsToggle}</span>
        <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={() => {
                setIsAll(!isAll);
                setPageNo(1);
            }}
            checked={isAll}
        />
    </label>
);
