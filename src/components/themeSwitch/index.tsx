import type { FC } from 'react';
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
    MoonIcon,
    SunIcon,
} from '..';

export const ThemeSwitch: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const { setTheme } = useTheme();

    const themes = [
        { name: 'Light', func: () => setTheme(Theme.LIGHT) },
        { name: 'Dark', func: () => setTheme(Theme.DARK) },
        { name: 'System', func: () => setTheme(Theme.SYSTEM) },
    ];

    const btnContent = (
        <>
            <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </>
    );

    if (isMobile) {
        return (
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button variant="menuitem" role="menuitem">
                        Select theme
                        {btnContent}
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
                    {btnContent}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map(({ name, func }) => (
                    <DropdownMenuItem key={name} onClick={func}>
                        {name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
