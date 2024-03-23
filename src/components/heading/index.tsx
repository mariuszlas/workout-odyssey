import type { FC, HTMLAttributes } from 'react';
import { createElement } from 'react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3';
}

export const Heading: FC<Props> = ({ as = 'h1', children, ...props }) => {
    let classes = 'text-4xl font-bold';

    switch (as) {
        case 'h2':
            classes = 'text-2xl font-bold';
            break;
        case 'h3':
            classes = 'text-xl font-bold';
            break;
        default:
            classes = 'text-3xl font-bold';
    }

    props.className = `${props.className} ${classes}`;

    return createElement(as, props, children);
};
