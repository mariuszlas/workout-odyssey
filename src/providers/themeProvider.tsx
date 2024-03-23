'use client';

import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Cookie, Theme } from '@/interfaces';
import { getClientCookie, isValidTheme } from '@/utils/helpers';

const setDataTheme = (theme: Theme) =>
    document.querySelector('html')?.setAttribute('data-theme', theme);

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
    children: ReactNode;
    specifiedTheme: Theme | null;
};

export const ThemeProvider: FC<Props> = ({ children, specifiedTheme }) => {
    const [theme, setTheme] = useState<Theme | null>(() => {
        if (specifiedTheme && isValidTheme(specifiedTheme)) {
            return specifiedTheme;
        }

        if (typeof window !== 'object') {
            return null;
        }

        return Theme.LIGHT;
    });

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!theme) return;

        const setServerTheme = async () =>
            await fetch(`/api/set-theme?theme=${theme}`);

        const themeCookie = getClientCookie(Cookie.THEME);

        if (!isFirstRender.current || (isFirstRender.current && !themeCookie)) {
            setServerTheme();
        }

        isFirstRender.current = false;

        setDataTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const theme = useContext(ThemeContext);

    if (!theme) {
        throw new Error('You must use this hook inside the <ThemeProvider>');
    }

    return theme;
};
