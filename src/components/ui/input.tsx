import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/utils/helpers';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hideNumberArrows?: boolean;
    error?: string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, hideNumberArrows, error, ...props }, ref) => (
        <input
            className={cn(
                'flex h-10 w-full rounded-md border border-input bg-inherit px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-inputHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                hideNumberArrows &&
                    '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                error &&
                    'border-error-foreground hover:border-error-foreground focus-visible:ring-error-foreground',
                className
            )}
            ref={ref}
            {...props}
        />
    )
);
Input.displayName = 'Input';

export { Input };
