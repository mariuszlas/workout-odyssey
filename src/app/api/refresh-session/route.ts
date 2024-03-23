import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Cookie } from '@/interfaces';
import { CognitoApi } from '@/server/cognitoAuth';
import { decodeJwt, setCookie } from '@/server/helpers';
import { getUserId } from '@/server/services';

export async function GET() {
    try {
        const refreshSession = cookies().get(Cookie.REFRESH_SESSION)?.value;
        const cookieObj = JSON.parse(refreshSession ?? '');
        const token = cookieObj?.refreshToken;
        const username = cookieObj?.username;

        if (!token || !username) return;

        const response = await new CognitoApi().refeshToken(token, username);
        const accessToken = response.AuthenticationResult?.AccessToken;
        const idToken = response.AuthenticationResult?.IdToken;
        const exp = response.AuthenticationResult?.ExpiresIn;

        if (
            response.$metadata.httpStatusCode !== 200 ||
            !accessToken ||
            !idToken ||
            !exp
        ) {
            throw new Error();
        }

        const jwt = await decodeJwt(idToken);
        const email = jwt.email;

        const userId = await getUserId(email);
        if (!userId) throw new Error();

        await setCookie(Cookie.SESSION, email, exp);
    } catch (e) {
        cookies().delete(Cookie.REFRESH_SESSION);
        redirect('/login');
    }

    redirect('/dashboard/running');
}
