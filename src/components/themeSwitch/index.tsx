import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Theme } from '@/interfaces';
import { useTheme } from '@/providers';

import { MoonIcon, SunIcon } from '../icon';
import { IconButton, MenuButton, Text } from '..';

export const ThemeSwitch: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const [theme, setTheme] = useTheme();
    const t = useTranslations('Navbar');

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
                        {isDark(theme)
                            ? t('toggleLightMode')
                            : t('toggleDarkMode')}
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
