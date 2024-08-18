'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from './button';

export const CloseButton = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
    <Button
        ref={ref}
        aria-label="close"
        size="square"
        variant="ghost"
        {...props}
    >
        <Cross2Icon className="h-6 w-6" />
    </Button>
));
