'use client';

import { Fragment } from 'react';
import toast from 'react-hot-toast';
import { Transition } from '@headlessui/react';

import { cn } from '@/utils/helpers';

import { CheckIcon, ExclamationCircleIcon } from '../icon';
import { Text } from '../text';

type TNotification = 'error' | 'success';

const notification = (msg: string, type: TNotification) =>
    toast.custom(t => (
        <Transition
            appear
            as={Fragment}
            show={t.visible}
            enter="transition-all duration-230 ease-in"
            enterFrom="opacity-0 scale-50 -translate-y-60"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition-all duration-230 ease-out"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-75 -translate-y-20"
        >
            <div
                className={cn(
                    'flex items-center gap-2 rounded-xl p-4 shadow-md',
                    type === 'success' && 'bg-success text-success-content',
                    type === 'error' && 'bg-error text-error-content'
                )}
            >
                {type === 'error' && <ExclamationCircleIcon />}
                {type === 'success' && <CheckIcon />}
                <Text as="p" value={msg} />
            </div>
        </Transition>
    ));

export const notify = {
    error: (msg: string) => notification(msg, 'error'),
    success: (msg: string) => notification(msg, 'success'),
};
