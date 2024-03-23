import { cookies } from 'next/headers';

import { Cookie } from '@/interfaces';
import { getUserData } from '@/server/services';

export async function GET() {
    const email = cookies().get(Cookie.SESSION)?.value;
    return Response.json(await getUserData(email));
}
