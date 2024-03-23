import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils/helpers';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(
    ({ className, children, ...props }, ref) => (
        <select
            ref={ref}
            className={cn(
                'select select-bordered h-10 min-h-min bg-inherit hover:border-opacity-40 focus:border-primary focus:outline-1 focus:outline-offset-0 focus:outline-primary',
                className
            )}
            {...props}
        >
            {children}
        </select>
    )
);
