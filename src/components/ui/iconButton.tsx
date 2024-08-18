'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Button } from './button';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ children, ...props }, ref) => (
        <Button size="square" variant="ghost" ref={ref} {...props}>
            {children}
        </Button>
    )
);
