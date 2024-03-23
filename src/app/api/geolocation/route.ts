import { NextRequest } from 'next/server';

import { getGeolocationById } from '@/server/services';

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
        return Response.json(null);
    }

    return Response.json(await getGeolocationById(id));
}
