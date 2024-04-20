'use client';

import type { FC } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { cn } from '@/utils/helpers';

import { DrawerProps } from './interfaces';

const sizeMapping = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
        case 'lg':
            return 'max-w-2xl';
        case 'md':
            return 'max-w-xl';
        case 'sm':
            return 'max-w-lg';
        default:
            return 'max-w-lg';
    }
};

export const Drawer: FC<DrawerProps> = ({
    isOpen,
    onClose,
    children,
    unmount = false,
    size = 'sm',
}) => (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog unmount={unmount} onClose={onClose} className="relative z-50">
            <Transition.Child
                as={Fragment}
                enter="ease-in duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    id="drawer-backdrop"
                    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm backdrop-filter"
                    aria-hidden="true"
                />
            </Transition.Child>

            <div
                id="drawer-container"
                data-testid="drawer-container"
                className="fixed inset-0 h-screen w-screen"
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Dialog.Panel
                        as="section"
                        className={cn(
                            'h-full w-full bg-base-100',
                            sizeMapping(size)
                        )}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
);
