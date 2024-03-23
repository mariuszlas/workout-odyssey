'use client';

import type { FC } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { cn } from '@/utils/helpers';

import { CloseButton, ModalProps } from '..';

import { ModalHeaderProps } from './interfaces';

export const ModalHeader: FC<ModalHeaderProps> = ({
    onClose,
    children,
    className,
}) => (
    <header className={clsx(className, 'flex items-center justify-between')}>
        <Dialog.Title className="text-xl font-bold">{children}</Dialog.Title>
        <CloseButton onClick={onClose} aria-label="close" />
    </header>
);

export const Modal: FC<ModalProps> = ({ isOpen, onClose, full, children }) => (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={onClose} className="relative z-50">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div
                    id="modal-backdrop"
                    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm backdrop-filter"
                    aria-hidden="true"
                />
            </Transition.Child>

            <div
                id="modal-container"
                data-testid="modal-container"
                className="fixed inset-0 flex w-screen overflow-scroll p-2 sm:p-4"
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel
                        role="dialog"
                        as="section"
                        className={cn(
                            'm-auto max-w-md rounded-xl border border-base-content border-opacity-20 bg-base-100 p-4 sm:p-6',
                            full && 'w-full'
                        )}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
);
