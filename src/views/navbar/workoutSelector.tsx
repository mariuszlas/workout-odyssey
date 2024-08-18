'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { WorkoutTypes } from '@/interfaces';
import { Link, usePathname } from '@/navigation';
import { cn, getWorkoutTypeFromPathname } from '@/utils/helpers';

interface Props {
    onClose?: () => void;
    isMobile?: boolean;
}

export const WorkoutSelector: FC<Props> = ({ onClose, isMobile }) => {
    const pathname = usePathname();
    const currentWorkoutType = getWorkoutTypeFromPathname(pathname);
    const t = useTranslations('Dashboard');
    const workoutOptions = Object.values(WorkoutTypes);

    if (isMobile) {
        return (
            <>
                {workoutOptions.map(workoutType => (
                    <li key={workoutType.toString()}>
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <Link
                                className="capitalize"
                                href={workoutType}
                                onClick={() => onClose && onClose()}
                            >
                                {t('workoutType', { workoutType })}
                            </Link>
                        </Button>
                    </li>
                ))}
            </>
        );
    }

    return (
        <NavigationMenu className="hidden gap-4 md:flex">
            <NavigationMenuList>
                {workoutOptions.map((workoutType, idx) => (
                    <NavigationMenuItem key={idx}>
                        <Link href={workoutType} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    'bg-inherit capitalize',
                                    {
                                        'text-primary':
                                            workoutType === currentWorkoutType,
                                    }
                                )}
                            >
                                {t('workoutType', { workoutType })}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};
