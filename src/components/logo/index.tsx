import type { FC } from 'react';
import Link from 'next/link';

import { Theme } from '@/interfaces';
import { useTheme } from '@/providers';
import { cn } from '@/utils/helpers';

import { _t, Text } from '..';

export const Logo: FC<{ isProtected: boolean }> = ({ isProtected }) => {
    const [theme] = useTheme();
    const isDark = theme === Theme.DARK;

    const content = (
        <div className="inline text-lg md:text-xl" data-testid="logo">
            <Text
                value={_t.logo1}
                className={cn(
                    "after:content[''] relative font-bold after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-1/5 after:w-full",
                    isDark
                        ? 'text-teal-400 after:bg-teal-800'
                        : 'text-teal-600 after:bg-teal-200'
                )}
            />
            <Text className="font-medium" value={_t.logo2} />
        </div>
    );

    if (isProtected) {
        return <div>{content}</div>;
    } else {
        return <Link href="/">{content}</Link>;
    }
};
