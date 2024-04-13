import { NextResponse } from 'next/server';

import { handleApiError } from '@/server/helpers';
import { getAllLabels, getCurrentUserId } from '@/server/services';

export async function GET() {
    const userId = await getCurrentUserId();

    try {
        return NextResponse.json(await getAllLabels(userId));
    } catch (_) {
        return handleApiError();
    }
}
