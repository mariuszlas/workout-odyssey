'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { cn } from '@/utils/helpers';

import { EyeIcon, EyeSlashIcon, IconButton } from '..';

import { Input } from './input';
import { InputProps } from './interfaces';

interface Props extends InputProps {
    iconAriaLabel: string;
}

export const PasswordInput: FC<Props> = ({
    iconAriaLabel,
    className,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Input
            required
            className={cn('pr-10', className)}
            type={showPassword ? 'text' : 'password'}
            {...props}
        >
            <IconButton
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-0"
                aria-label={iconAriaLabel}
            >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </IconButton>
        </Input>
    );
};
