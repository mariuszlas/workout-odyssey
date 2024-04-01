import { FC } from 'react';

import { cn } from '@/utils/helpers';

interface SkeletonProps {
    h?: number | string;
    className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ h, className }) => (
    <div className="h-full w-full animate-pulse">
        <div
            className={cn(
                'rounded-lg bg-base-300',
                h ? `h-${h}` : '',
                className
            )}
        />
    </div>
);

export const SkeletonList: FC<{ length: number }> = ({ length }) => (
    <>
        {[...Array(length)].map((_, i) => (
            <Skeleton key={i} h={6} />
        ))}
    </>
);
