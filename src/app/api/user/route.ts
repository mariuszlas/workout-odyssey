import { NextResponse } from 'next/server';

import { handleApiError, validateSession } from '@/server/helpers';
import { getAllUserData } from '@/server/services';

export async function GET() {
    const username = validateSession();

    try {
        return NextResponse.json(await getAllUserData(username));
    } catch (_) {
        return handleApiError();
    }
}
