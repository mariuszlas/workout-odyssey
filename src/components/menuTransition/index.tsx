'use client';

import { type FC, type ReactNode } from 'react';
import { Transition } from '@headlessui/react';

export const MenuTransition: FC<{ children: ReactNode }> = ({ children }) => (
    <Transition
        as="div"
        enter=" duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 "
    >
        {children}
    </Transition>
);
