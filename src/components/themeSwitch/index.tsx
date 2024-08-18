import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Theme } from '@/interfaces';
import { useTheme } from '@/providers';

import { MoonIcon, SunIcon } from '../icon';
import { Button, IconButton } from '..';

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
                <Button
                    variant="menuitem"
                    role="menuitem"
                    onClick={toggleTheme}
                    aria-label={t('themeSwitchAriaLabel')}
                >
                    {isDark(theme) ? t('toggleLightMode') : t('toggleDarkMode')}
                    {isDark(theme) ? <SunIcon /> : <MoonIcon />}
                </Button>
            </li>
        );
    }

    return (
        <IconButton
            className="hidden md:inline-flex"
            aria-label={t('themeSwitchAriaLabel')}
            onClick={toggleTheme}
        >
            {isDark(theme) ? <SunIcon /> : <MoonIcon />}
        </IconButton>
    );
};
