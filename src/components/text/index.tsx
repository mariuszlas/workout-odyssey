import type {
    FC,
    HTMLAttributes,
    JSXElementConstructor,
    ReactElement,
    ReactNodeArray,
} from 'react';
import { createElement } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement | HTMLParagraphElement> {
    value?:
        | string
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactNodeArray
        | number;
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
