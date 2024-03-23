import { getAllLabels, getSessionUserId } from '@/server/services';

export async function GET() {
    const userId = await getSessionUserId();

    if (!userId) {
        return Response.json([]);
    }

    return Response.json(await getAllLabels(userId));
}
