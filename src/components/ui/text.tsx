import { FC, HTMLAttributes } from 'react';

import { cn } from '@/utils/helpers';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    value?: string | number;
}

const TextP: FC<Props> = ({ value, children, className, ...props }) => (
    <p className={cn('leading-5', className)} {...props}>
        {children}
        {value}
    </p>
);

const TextS: FC<Props> = ({ value, children, className, ...props }) => (
    <span className={cn('leading-5', className)} {...props}>
        {children}
        {value}
    </span>
);

export { TextP, TextS };
