import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Cookie } from '@/interfaces';
import { CognitoApi } from '@/server/cognitoAuth';
import { getRefreshTokenFromCookie, setCookie } from '@/server/helpers';
import { getUserId } from '@/server/services';

export async function GET() {
    try {
        const refreshSession = getRefreshTokenFromCookie();
        const cookieObj = refreshSession ? JSON.parse(refreshSession) : null;

        const token = cookieObj?.refreshToken;
        const username = cookieObj?.username;
        if (!token || !username) throw new Error();

        const userId = username ? await getUserId(username) : null;
        if (!userId) throw new Error();

        const response = await new CognitoApi().refeshToken(token, username);
        const accessToken = response.AuthenticationResult?.AccessToken;
        const exp = response.AuthenticationResult?.ExpiresIn;

        if (response.$metadata.httpStatusCode !== 200 || !accessToken || !exp) {
            throw new Error();
        }

        await setCookie(Cookie.ACCESS_TOKEN, accessToken, exp);
    } catch (e) {
        cookies().delete(Cookie.REFRESH_SESSION);
        redirect('/login');
    }

    redirect('/dashboard/running');
}
