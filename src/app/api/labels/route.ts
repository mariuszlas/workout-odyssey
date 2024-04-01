import { getAllLabels, getCurrentUserId } from '@/server/services';

export async function GET() {
    const userId = await getCurrentUserId();
    return Response.json(await getAllLabels(userId));
}
