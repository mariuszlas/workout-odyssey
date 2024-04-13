import { NextRequest, NextResponse } from 'next/server';

import { handleApiError } from '@/server/helpers';
import { getBestResult, getCurrentUserId } from '@/server/services';
import { isValidWorkoutType } from '@/utils/helpers';

export async function GET(request: NextRequest) {
    const userId = await getCurrentUserId();
    const workoutType = request.nextUrl.searchParams.get('workoutType');

    if (!isValidWorkoutType(workoutType))
        return handleApiError('Invalid workout type', 400);

    try {
        return NextResponse.json(await getBestResult(workoutType, userId));
    } catch (_) {
        return handleApiError();
    }
}
