import type { FC, HTMLAttributes } from 'react';
import { createElement } from 'react';

import { cn } from '@/utils/helpers';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    value?: string;
    as?: 'h1' | 'h2' | 'h3';
}

export const Heading: FC<Props> = ({
    as = 'h1',
    value,
    children,
    ...props
}) => {
    let classes;

    switch (as) {
        case 'h2':
            classes = 'text-3xl font-bold';
            break;
        case 'h3':
            classes = 'text-2xl font-bold';
            break;
        default:
            classes = 'text-4xl font-bold';
    }

    props.className = cn(classes, props.className);

    const content = (
        <>
            {value}
            {children}
        </>
    );
    return createElement(as, props, content);
};
