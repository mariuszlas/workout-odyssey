import type { FC } from 'react';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Theme } from '@/interfaces';

import {
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '..';

export const ThemeSwitch: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const { setTheme } = useTheme();

    const themes = [
        {
            name: 'Light',
            func: () => setTheme(Theme.LIGHT),
            icon: <SunIcon className="h-4 w-4" />,
        },
        {
            name: 'Dark',
            func: () => setTheme(Theme.DARK),
            icon: <MoonIcon className="h-4 w-4" />,
        },
        {
            name: 'System',
            func: () => setTheme(Theme.SYSTEM),
            icon: <DesktopIcon className="h-4 w-4" />,
        },
    ];

    if (isMobile) {
        return (
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button variant="menuitem" role="menuitem">
                        Select theme
                        <SunIcon className="h-5 w-5 dark:hidden" />
                        <MoonIcon className="hidden h-5 w-5 dark:flex" />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6">
                    {themes.map(({ name, func }) => (
                        <Button
                            variant="menuitem"
                            role="menuitem"
                            onClick={func}
                            key={name}
                        >
                            {name}
                        </Button>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:inline-flex">
                <Button variant="ghost" size="icon">
                    <SunIcon className="h-5 w-5 dark:hidden" />
                    <MoonIcon className="hidden h-5 w-5 dark:flex" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map(({ name, func, icon }) => (
                    <DropdownMenuItem
                        key={name}
                        onClick={func}
                        className="flex items-center gap-2"
                    >
                        {icon}
                        {name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
