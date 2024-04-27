import { useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';

interface Args {
    position?: Placement;
    x?: number;
    y?: number;
}

export const usePopover = (args?: Args) => {
    const position = args?.position ?? 'bottom-start';
    const x = args?.x ?? 0;
    const y = args?.y ?? 5;

    const [refElement, setReferenceElement] =
        useState<HTMLButtonElement | null>(null);

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
        null
    );

    const { styles, attributes } = usePopper(refElement, popperElement, {
        modifiers: [{ name: 'offset', options: { offset: [x, y] } }],
        placement: position,
    });

    return {
        setRefEl: setReferenceElement,
        setPopperElement,
        styles,
        attributes,
    };
};
