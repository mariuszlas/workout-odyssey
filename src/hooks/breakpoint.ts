'use client';

import { useEffect, useState } from 'react';

const screens: { [key: string]: string } = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

const getIsBreakpoint = (breakpoint: number) => {
    if (typeof window !== 'object') {
        return false;
    }

    return window?.innerWidth <= breakpoint;
};

export const useIsBreakpoint = (breakpoint: string) => {
    //https://stackoverflow.com/questions/66588340/custom-hook-for-window-resize
    const bkValue = parseInt(screens[breakpoint].slice(0, -2));
    const [isBreakpoint, setIsBreakpoint] = useState(getIsBreakpoint(bkValue));

    useEffect(() => {
        const onResize = () => {
            setIsBreakpoint(getIsBreakpoint(bkValue));
        };
        window?.addEventListener('resize', onResize);

        return () => {
            window?.removeEventListener('resize', onResize);
        };
    }, []);

    return isBreakpoint;
};
