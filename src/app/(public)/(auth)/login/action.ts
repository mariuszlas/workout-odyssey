'use server';

import {
    NotAuthorizedException,
    UserNotConfirmedException,
    UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { redirect, RedirectType } from 'next/navigation';
import { ZodError } from 'zod';

import { Cookie } from '@/interfaces';
import { CognitoApi } from '@/server/cognitoAuth';
import { decodeJwt, setCookie } from '@/server/helpers';
import { getUserId, reportUserLogin } from '@/server/services';
import {
    formatOtherError,
    formatZodError,
    userLoginSchema,
} from '@/server/validation';
import { getGenericErrorMessage } from '@/utils/helpers';

export const loginUser = async (_: unknown, formData: FormData) => {
    const formObj = Object.fromEntries(formData);

    try {
        const { email, password } = userLoginSchema.parse(formObj);

        const response = await new CognitoApi().login(email, password);
        const accessToken = response.AuthenticationResult?.AccessToken;
        const refreshToken = response.AuthenticationResult?.RefreshToken;
        const exp = response.AuthenticationResult?.ExpiresIn;

        if (
            response.$metadata.httpStatusCode !== 200 ||
            !accessToken ||
            !refreshToken ||
            !exp
        ) {
            throw new Error();
        }

        const jwt = await decodeJwt(accessToken);
        const username = jwt?.username;

        const userId = await getUserId(username);
        if (!userId) throw new Error();

        await reportUserLogin(username as string);
        await setCookie(Cookie.ACCESS_TOKEN, accessToken, exp);
        await setCookie(
            Cookie.REFRESH_SESSION,
            JSON.stringify({ refreshToken, username }),
            60 * 60 * 24 * 90
        );
    } catch (e) {
        if (e instanceof ZodError) {
            return formatZodError(e);
        }

        if (e instanceof UserNotConfirmedException) {
            const user = Buffer.from(formObj['email'].toString()).toString(
                'base64url'
            );
            redirect(`/verify?user=${user}`);
        }

        if (
            e instanceof UserNotFoundException ||
            e instanceof NotAuthorizedException
        ) {
            return formatOtherError('Incorrect login credentials');
        }

        console.error('Error: ' + getGenericErrorMessage(e, 'Login failed'));
        return formatOtherError('Login failed');
    }

    redirect('/dashboard/running', RedirectType.replace);
};
