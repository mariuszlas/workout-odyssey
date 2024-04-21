'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils/helpers';

import { CloseIcon } from '../icon';

import { Button } from './button';
import { HTMLBtnProps } from './interfaces';

export const CloseButton = forwardRef<HTMLButtonElement, HTMLBtnProps>(
    ({ className, ...props }, ref) => {
        const t = useTranslations('Dashboard');

        return (
            <Button
                ref={ref}
                aria-label={t('ariaLabelCloseBtn')}
                className={cn(
                    'btn-square btn-ghost w-10 focus:outline-offset-0 focus:outline-primary',
                    className
                )}
                {...props}
            >
                <CloseIcon className="h-4 w-4" />
            </Button>
        );
    }
);
