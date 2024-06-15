import { NextRequest, NextResponse } from 'next/server';

import { handleApiError } from '@/server/helpers';
import { getAllLabels } from '@/server/services';

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('user');

    try {
        const response = userId ? await getAllLabels(userId) : [];
        return NextResponse.json(response);
    } catch (_) {
        return handleApiError();
    }
}
