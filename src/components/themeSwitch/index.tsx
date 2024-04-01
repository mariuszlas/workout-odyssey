import type { FC } from 'react';

import { Theme } from '@/interfaces';
import { useTheme } from '@/providers';

import { MoonIcon, SunIcon } from '../icon';
import { _t, IconButton, MenuButton, Text } from '..';

export const ThemeSwitch: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const [theme, setTheme] = useTheme();

    const isDark = (theme: Theme | null) => theme === Theme.DARK;

    const toggleTheme = () => {
        setTheme(prevTheme =>
            prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        );
    };

    if (isMobile) {
        return (
            <li>
                <MenuButton onClick={toggleTheme} aria-label="theme-switch">
                    <Text>
                        {isDark(theme) ? _t.toggleLightMode : _t.toggleDarkMode}
                    </Text>
                    {isDark(theme) ? <SunIcon /> : <MoonIcon />}
                </MenuButton>
            </li>
        );
    }

    return (
        <IconButton
            aria-label="theme-switch"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
        >
            {isDark(theme) ? <SunIcon /> : <MoonIcon />}
        </IconButton>
    );
};
