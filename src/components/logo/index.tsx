import type { FC } from 'react';
import Link from 'next/link';

export const Logo: FC<{ isProtected: boolean }> = ({ isProtected }) => {
    const content = (
        <div className="inline" data-testid="logo">
            <span className="after:content[''] relative font-bold text-primary after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-1/5 after:w-full after:bg-primary after:brightness-150 dark:after:brightness-50">
                Workout
            </span>
            <span className="font-medium">Odyssey</span>
        </div>
    );

    if (isProtected) {
        return <div>{content}</div>;
    } else {
        return (
            <Link
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                href="/"
            >
                {content}
            </Link>
        );
    }
};
