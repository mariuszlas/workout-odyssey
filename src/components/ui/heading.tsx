import { FC, HTMLAttributes } from 'react';

import { cn } from '@/utils/helpers';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    value?: string;
}

const H1: FC<Props> = ({ value, children, className, ...props }) => (
    <h1
        className={cn(
            'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
            className
        )}
        {...props}
    >
        {children}
        {value}
    </h1>
);

const H2: FC<Props> = ({ value, children, className, ...props }) => (
    <h2
        className={cn(
            'scroll-m-20 text-3xl font-semibold tracking-tight',
            className
        )}
        {...props}
    >
        {children}
        {value}
    </h2>
);

const H3: FC<Props> = ({ value, children, className, ...props }) => (
    <h2
        className={cn(
            'scroll-m-20 text-lg font-semibold tracking-tight',
            className
        )}
        {...props}
    >
        {children}
        {value}
    </h2>
);

export { H1, H2, H3 };
