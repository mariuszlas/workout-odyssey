import { useUI } from '@/providers';

import { useWorkoutType } from './useWorkoutType';

export const useBestResultsKey = () => {
    const { userId } = useUI();
    const workoutType = useWorkoutType();
    return `/api/best-results?user=${userId}&workoutType=${workoutType}`;
};
