'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';

import { ToggleState } from '@/interfaces';

interface Props {
    appConfig: ToggleState;
    children: ReactNode;
}

const ConfigContext = createContext<ToggleState | null>(null);

export const ConfigProvider: FC<Props> = ({ children, appConfig }) => (
    <ConfigContext.Provider value={appConfig}>
        {children}
    </ConfigContext.Provider>
);

export const useConfig = () => {
    const config = useContext(ConfigContext);

    if (!config) {
        throw new Error('You must use this hook inside the <ConfigProvider>');
    }

    return config;
};
