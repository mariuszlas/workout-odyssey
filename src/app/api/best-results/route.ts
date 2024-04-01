import { NextRequest } from 'next/server';

import { getBestResult, getCurrentUserId } from '@/server/services';
import { isValidWorkoutType } from '@/utils/helpers';

export async function GET(request: NextRequest) {
    const userId = await getCurrentUserId();
    const workoutType = request.nextUrl.searchParams.get('workoutType');

    if (!isValidWorkoutType(workoutType)) {
        return Response.json(null);
    }

    return Response.json(await getBestResult(workoutType, userId));
}
