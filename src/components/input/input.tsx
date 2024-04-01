import { forwardRef } from 'react';

import { cn } from '@/utils/helpers';

import { FormLabel } from '..';

import { InputProps } from './interfaces';

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, children, error, label, ...props }, ref) => {
        const input = (
            <input
                ref={ref}
                className={cn(
                    'input input-bordered h-10 w-full bg-inherit hover:border-opacity-40 focus:border-primary focus:outline-1 focus:outline-offset-0 focus:outline-primary',
                    { 'input-error': !!error },
                    className
                )}
                {...props}
            />
        );

        return (
            <>
                {label && (
                    <FormLabel
                        text={label}
                        htmlFor={props.id}
                        isRequired={props.required}
                    />
                )}

                {children ? (
                    <div className="relative inline h-full">
                        {input}
                        {children}
                    </div>
                ) : (
                    input
                )}

                {error && (
                    <label className="label">
                        <span className="label-text-alt font-semibold text-error">
                            {error}
                        </span>
                    </label>
                )}
            </>
        );
    }
);
