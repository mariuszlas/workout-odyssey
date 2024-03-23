'use client';

import { forwardRef } from 'react';

import { cn } from '@/utils/helpers';

import { Button } from './button';
import { HTMLBtnProps } from './interfaces';

export const IconButton = forwardRef<HTMLButtonElement, HTMLBtnProps>(
    ({ className, children, ...props }, ref) => (
        <Button
            ref={ref}
            className={cn(
                'btn-square btn-ghost w-10 text-primary focus:outline-primary',
                className
            )}
            {...props}
        >
            {children}
        </Button>
    )
);
