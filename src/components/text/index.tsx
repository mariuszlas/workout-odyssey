import type { FC, HTMLAttributes } from 'react';
import { createElement } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement | HTMLParagraphElement> {
    as?: 'p' | 'span';
}

export const Text: FC<Props> = ({ as = 'span', children, ...props }) =>
    createElement(as, props, children);
