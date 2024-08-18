'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/helpers';

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

interface LabelProps {
    isRequired?: boolean;
}

const Label = forwardRef<
    ElementRef<typeof LabelPrimitive.Root>,
    ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
        VariantProps<typeof labelVariants> &
        LabelProps
>(({ className, isRequired, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            labelVariants(),
            isRequired && "after:ml-0.5 after:text-red-500 after:content-['*']",
            className
        )}
        {...props}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
