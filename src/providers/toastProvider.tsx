'use client';

import { Toaster } from 'react-hot-toast';

import { Children } from '@/interfaces';

export const ToastProvider = ({ children }: Children) => (
    <>
        {children}
        <Toaster containerStyle={{ top: 56 }} />
    </>
);
