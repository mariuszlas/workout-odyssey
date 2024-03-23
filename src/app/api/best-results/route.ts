import { NextRequest } from 'next/server';

import { getBestResult, getSessionUserId } from '@/server/services';
import { isValidWorkoutType } from '@/utils/helpers';

export async function GET(request: NextRequest) {
    const userId = await getSessionUserId();
    const type = request.nextUrl.searchParams.get('type');

    if (!userId || !isValidWorkoutType(type)) {
        return Response.json(null);
    }

    return Response.json(await getBestResult(type, userId));
}
