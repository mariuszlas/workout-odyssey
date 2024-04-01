import { NextRequest } from 'next/server';

import { getWorkoutById } from '@/server/services';

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
        return Response.json(null);
    }

    return Response.json(await getWorkoutById(Number(id)));
}
