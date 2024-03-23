'use client';

import { type FC, Fragment, type ReactNode } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
    children: ReactNode;
}

export const MenuTransition: FC<Props> = ({ children }) => (
    <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-1 scale-95"
    >
        {children}
    </Transition>
);
