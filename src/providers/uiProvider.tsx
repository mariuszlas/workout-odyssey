'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { Units } from '@/interfaces';

interface UIContext {
    year: number;
    secondaryStat: number;
    units: Units;
}

const getDefaultUI = (): UIContext => ({
    year: new Date().getFullYear(),
    secondaryStat: new Date().getMonth(),
    units: {
        km: 'km',
        kmh: 'km/h',
        h: 'h',
        min: 'min',
    },
});

interface UIContextType extends UIContext {
    setYear: (year: number) => void;
    setSecondaryStat: (secondaryStat: number) => void;
}

type Props = {
    children: ReactNode;
};

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider: FC<Props> = ({ children }) => {
    const [ui, setUI] = useState<UIContext>(getDefaultUI());

    const setSecondaryStat = (secondaryStat: number) => {
        setUI(prevUi => ({ ...prevUi, secondaryStat }));
    };

    const setYear = (year: number) => {
        setUI(prevUi => ({ ...prevUi, year }));
    };

    return (
        <UIContext.Provider value={{ ...ui, setYear, setSecondaryStat }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const ui = useContext(UIContext);

    if (!ui) {
        throw new Error('You must use this hook inside the <UIProvider>');
    }

    return ui;
};
