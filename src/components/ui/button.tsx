'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/helpers';

import { SpinnerIcon } from '../icon';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-offset-2 ',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-offset-2 ',
                outline:
                    'border border-input bg-inherit hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-offset-2 ',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                menuitem:
                    'hover:bg-accent hover:text-accent-foreground w-full justify-start gap-2',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                xs: 'h-8 w-8',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
                hero: 'h-12 px-8 text-lg',
                icon: 'h-10 w-10',
                square: 'h-10 aspect-square',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, isLoading, asChild = false, ...props },
        ref
    ) => {
        const { pending } = useFormStatus();
        const showSpinner = isLoading || (props.type === 'submit' && pending);

        if (asChild) {
            return (
                <Slot
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                />
            );
        }

        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={props.disabled || showSpinner}
                {...props}
            >
                {showSpinner && <SpinnerIcon className="mr-2 animate-spin" />}
                {props.children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
