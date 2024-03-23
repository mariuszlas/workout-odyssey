'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/utils/helpers';

import { HTMLBtnProps } from './interfaces';

interface Props extends HTMLBtnProps {
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
    ({ isLoading, className, children, type = 'button', ...props }, ref) => {
        const { pending } = useFormStatus();
        const showLoader = isLoading || (type === 'submit' && pending);

        return (
            <button
                ref={ref}
                type={type}
                disabled={isLoading}
                className={cn(
                    'btn h-10 min-h-min text-base focus:outline-offset-0 focus:outline-secondary',
                    { 'btn-disabled': props.disabled },
                    className
                )}
                {...props}
            >
                {showLoader && <span className="loading loading-spinner" />}
                {children}
            </button>
        );
    }
);
