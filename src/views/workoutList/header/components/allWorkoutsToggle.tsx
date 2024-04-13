import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Text } from '@/components';
import { cn } from '@/utils/helpers';

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
}) => {
    const t = useTranslations('Dashboard.WorkoutList.Header');

    return (
        <label className={cn('label cursor-pointer gap-3', className)}>
            <Text className="label-text w-max" value={t('allWorkoutsToggle')} />
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
};
