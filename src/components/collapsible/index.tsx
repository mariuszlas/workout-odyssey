'use client';

import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { Transition } from '@headlessui/react';

import { useIsBreakpoint } from '@/hooks';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: ReactNode;
}
export const Collapsible: FC<Props> = ({ isOpen, setIsOpen, children }) => {
    const isMobile = useIsBreakpoint('sm');

    useEffect(() => {
        if (!isMobile) {
            setIsOpen(false);
        }
    }, [isMobile, setIsOpen]);

    return (
        <Transition
            show={isOpen}
            as="div"
            className="sm:hidden"
            enter="transition ease duration-300 transform"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transition ease duration-300 transform"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
        >
            {children}
        </Transition>
    );
};
