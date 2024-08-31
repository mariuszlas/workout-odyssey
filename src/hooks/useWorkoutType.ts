import { usePathname } from 'next/navigation';

import { getWorkoutTypeFromPathname } from '@/utils/helpers';

export const useWorkoutType = () => {
    const pathname = usePathname();
    return getWorkoutTypeFromPathname(pathname);
};
