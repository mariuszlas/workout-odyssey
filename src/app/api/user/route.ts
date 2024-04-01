import { getAllUserData } from '@/server/services';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        return Response.json(await getAllUserData());
    } catch (_) {
        return Response.json({});
    }
}
