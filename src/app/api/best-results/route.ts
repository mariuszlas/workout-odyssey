import { NextRequest, NextResponse } from 'next/server';

import { handleApiError } from '@/server/helpers';
import { getBestResult } from '@/server/services';
import { isValidWorkoutType } from '@/utils/helpers';

export async function GET(request: NextRequest) {
    const workoutType = request.nextUrl.searchParams.get('workoutType');
    const userId = request.nextUrl.searchParams.get('user');

    if (!isValidWorkoutType(workoutType))
        return handleApiError('Invalid workout type', 400);

    try {
        const response = userId
            ? await getBestResult(workoutType, userId)
            : null;
        return NextResponse.json(response);
    } catch (_) {
        return handleApiError();
    }
}
