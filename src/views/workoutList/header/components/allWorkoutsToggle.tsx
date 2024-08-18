import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Label } from '@/components';
import { Switch } from '@/components/ui/switch';
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
        <div className={cn('flex items-center gap-3', className)}>
            <Label htmlFor="allWorkoutsToggle">{t('allWorkoutsToggle')}</Label>
            <Switch
                id="allWorkoutsToggle"
                checked={isAll}
                onCheckedChange={() => {
                    setIsAll(!isAll);
                    setPageNo(1);
                }}
            />
        </div>
    );
};
