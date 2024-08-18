import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import { cn } from '@/utils/helpers';

interface Props {
    onClick: () => void;
}

export const FloatingNewWorkoutBtn: FC<Props> = ({ onClick }) => {
    const t = useTranslations('Navbar');

    const [y, setY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = useCallback(() => {
        if (!window || !document) return;

        const isOverscrollTop = window.scrollY <= 0;
        const isOverscrollBottom =
            window.scrollY + window.innerHeight >= document.body.offsetHeight;
        const isScrollUp = y > window.scrollY;
        const isScrollDown = y < window.scrollY;

        if (isOverscrollTop) {
            setIsVisible(true);
        } else if (isOverscrollBottom) {
            setIsVisible(false);
        } else if (isScrollUp) {
            setIsVisible(true);
        } else if (isScrollDown) {
            setIsVisible(false);
        }

        setY(window.scrollY);
    }, [y]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <Button
            aria-label={t('newWorkoutCta')}
            data-testid="floating-new-workout-btn"
            className={cn(
                { hidden: !isVisible },
                'fixed bottom-3 right-3 z-10 h-12 rounded-full bg-secondary p-3 text-secondary-foreground drop-shadow-2xl sm:hidden'
            )}
            onClick={onClick}
        >
            <PlusIcon className="h-6 w-6" />
        </Button>
    );
};
