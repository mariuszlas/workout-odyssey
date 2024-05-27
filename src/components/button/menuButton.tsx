'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/utils/helpers';

import { HTMLBtnProps } from './interfaces';

interface MenuBtnProps extends HTMLBtnProps {
    active?: boolean;
    hoverNoColor?: boolean;
    hoverRed?: boolean;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuBtnProps>(
    (
        {
            className,
            active,
            hoverNoColor,
            hoverRed,
            type = 'button',
            children,
            ...props
        },
        ref
    ) => {
        const { pending } = useFormStatus();

        return (
            <button
                ref={ref}
                type={type}
                role="menuitem"
                className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-4 py-1.5 text-left hover:bg-base-200',
                    {
                        'bg-base-200 text-primary': active,
                        'hover:text-primary': !hoverNoColor,
                        'hover:text-error': hoverRed,
                    },
                    className
                )}
                {...props}
            >
                {pending && <span className="loading loading-spinner" />}
                {children}
            </button>
        );
    }
);
