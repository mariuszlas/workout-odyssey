import type { FC, HTMLAttributes, ReactNode } from 'react';
import { createElement } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement | HTMLParagraphElement> {
    value?: string | number | ReactNode;
    as?: 'p' | 'span';
}

export const Text: FC<Props> = ({ as = 'span', value, children, ...props }) => {
    const content = (
        <>
            {value}
            {children}
        </>
    );
    return createElement(as, props, content);
};
