import type { FC } from 'react';

import { Theme } from '@/interfaces';
import { Link } from '@/navigation';
import { useTheme } from '@/providers';
import { cn } from '@/utils/helpers';

import { Text } from '..';

const LOGO_TEXT_1 = 'Workout';
const LOGO_TEXT_2 = 'Odyssey';

export const Logo: FC<{ isProtected: boolean }> = ({ isProtected }) => {
    const [theme] = useTheme();
    const isDark = theme === Theme.DARK;

    const content = (
        <div className="inline text-lg md:text-xl" data-testid="logo">
            <Text
                value={LOGO_TEXT_1}
                className={cn(
                    "after:content[''] relative font-bold after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-1/5 after:w-full",
                    isDark
                        ? 'text-teal-400 after:bg-teal-800'
                        : 'text-teal-600 after:bg-teal-200'
                )}
            />
            <Text className="font-medium" value={LOGO_TEXT_2} />
        </div>
    );

    if (isProtected) {
        return <div>{content}</div>;
    } else {
        return <Link href="/">{content}</Link>;
    }
};
