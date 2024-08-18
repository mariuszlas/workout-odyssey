import { FC, HTMLAttributes } from 'react';

import { cn } from '@/utils/helpers';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    h?: number | string;
}

const Skeleton: FC<SkeletonProps> = ({ className, h, ...props }) => (
    <div
        className={cn(
            'w-full animate-pulse rounded-md bg-muted',
            h ? `h-${h}` : 'h-full',
            className
        )}
        {...props}
    />
);

interface SkeletonListProps {
    length: number;
    h?: number | string;
}

const SkeletonList: FC<SkeletonListProps> = ({ length, h = 6 }) => (
    <>
        {[...Array(length)].map((_, i) => (
            <Skeleton key={i} h={h} />
        ))}
    </>
);

export { Skeleton, SkeletonList };
