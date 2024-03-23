'use client';

import { forwardRef } from 'react';

import { cn } from '@/utils/helpers';

import { HTMLBtnProps } from './interfaces';

export const InputButton = forwardRef<HTMLButtonElement, HTMLBtnProps>(
    ({ className, children, type = 'button', ...props }, ref) => (
        <button
            ref={ref}
            type={type}
            className={cn(
                'input input-bordered flex h-10 items-center gap-4 hover:border-opacity-40 focus:border-primary focus:outline-1 focus:outline-offset-0 focus:outline-primary',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
);
