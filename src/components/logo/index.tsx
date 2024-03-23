import type { FC } from 'react';
import Link from 'next/link';

import { Theme } from '@/interfaces';
import { useTheme } from '@/providers';
import { cn } from '@/utils/helpers';

import { _t, Text } from '..';

interface Props {
    isProtected: boolean;
}

export const Logo: FC<Props> = ({ isProtected }) => {
    const [theme] = useTheme();
    const isDark = theme === Theme.DARK;

    const content = (
        <div className="inline text-lg md:text-xl" data-testid="logo">
            <Text
                className={cn(
                    "after:content[''] relative font-bold after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-1/5 after:w-full",
                    isDark
                        ? 'text-teal-400 after:bg-teal-800'
                        : 'text-teal-600 after:bg-teal-200'
                )}
            >
                {_t.logo1}
            </Text>
            <Text className="font-medium">{_t.logo2}</Text>
        </div>
    );

    if (isProtected) {
        return <div>{content}</div>;
    } else {
        return <Link href="/">{content}</Link>;
    }
};
