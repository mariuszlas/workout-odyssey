'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { ChartDataTypes, Units } from '@/interfaces';

interface UIContext {
    year: number;
    secondaryStat: number;
    dataType: ChartDataTypes;
    units: Units;
}

const getDefaultUI = (): UIContext => ({
    year: new Date().getFullYear(),
    secondaryStat: new Date().getMonth(),
    dataType: ChartDataTypes.DISTANCE,
    units: {
        km: 'km',
        kmh: 'km/h',
        h: 'h',
        min: 'min',
    },
});

interface UIContextType extends UIContext {
    userId: string | null;
    setYear: (year: number) => void;
    setSecondaryStat: (secondaryStat: number) => void;
    setChartDataType: (dataType: ChartDataTypes) => void;
}

type Props = {
    userId: string | null;
    children: ReactNode;
};

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider: FC<Props> = ({ userId, children }) => {
    const [ui, setUI] = useState<UIContext>(getDefaultUI());
    const setSecondaryStat = (secondaryStat: number) => {
        setUI(prevUi => ({ ...prevUi, secondaryStat }));
    };

    const setYear = (year: number) => {
        setUI(prevUi => ({ ...prevUi, year }));
    };

    const setChartDataType = (dataType: ChartDataTypes) => {
        setUI(prevUi => ({ ...prevUi, dataType }));
    };

    return (
        <UIContext.Provider
            value={{
                ...ui,
                setYear,
                setSecondaryStat,
                userId,
                setChartDataType,
            }}
        >
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
