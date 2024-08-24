import type { FC } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Theme } from '@/interfaces';
import { cn } from '@/utils/helpers';

const LOGO_TEXT_1 = 'Workout';
const LOGO_TEXT_2 = 'Odyssey';

export const Logo: FC<{ isProtected: boolean }> = ({ isProtected }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === Theme.DARK;

    const content = (
        <div className="inline" data-testid="logo">
            <span
                className={cn(
                    "after:content[''] relative font-bold after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-1/5 after:w-full",
                    isDark
                        ? 'text-teal-400 after:bg-teal-800'
                        : 'text-teal-600 after:bg-teal-200'
                )}
            >
                {LOGO_TEXT_1}
            </span>
            <span className="font-medium">{LOGO_TEXT_2}</span>
        </div>
    );

    if (isProtected) {
        return <div>{content}</div>;
    } else {
        return <Link href="/">{content}</Link>;
    }
};
