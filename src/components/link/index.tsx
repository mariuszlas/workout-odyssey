import { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

import { cn } from '@/utils/helpers';

interface Props extends LinkProps {
    active?: boolean;
    danger?: boolean;
    popover?: boolean;
    className?: string;
    children?: any;
}

export const MenuLink = forwardRef<HTMLAnchorElement, Props>(
    ({ className, active, danger, popover, children, ...props }, ref) => (
        <Link
            ref={ref}
            className={cn(
                'flex w-full items-center gap-2 rounded-lg px-4 py-1.5 text-left',
                {
                    'bg-base-200 text-primary': active,
                    'text-error': active && danger,
                    'hover:bg-base-200 hover:text-primary focus-visible:bg-base-200 focus-visible:text-primary':
                        popover,
                },
                className
            )}
            {...props}
        >
            {children}
        </Link>
    )
);
