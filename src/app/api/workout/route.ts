import { NextRequest, NextResponse } from 'next/server';

import { handleApiError } from '@/server/helpers';
import { getWorkoutById } from '@/server/services';

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return handleApiError('Parameter `id` is required', 400);

    try {
        const workout = await getWorkoutById(id);
        if (!workout) return handleApiError('Workout was not found', 404);

        return NextResponse.json(workout);
    } catch (_) {
        return handleApiError();
    }
}
