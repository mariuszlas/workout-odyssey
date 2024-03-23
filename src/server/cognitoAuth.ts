import {
    AdminGetUserCommand,
    AdminInitiateAuthCommand,
    AuthFlowType,
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    ConfirmForgotPasswordCommand,
    ForgotPasswordCommand,
    ResendConfirmationCodeCommand,
    SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { createHmac } from 'crypto';

export class CognitoApi {
    #provider: CognitoIdentityProviderClient;
    #clientId: string;
    #userPoolId: string;
    #clientSecret: string;

    constructor() {
        const clientId = process.env.COGNITO_CLIENT_ID;
        const userPoolId = process.env.COGNITO_USER_POOL_ID;
        const clientSecret = process.env.COGNITO_CLIENT_SECRET;
        const region = process.env.AWS_REGION;
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

        if (!clientId)
            throw new Error('AWS Cognito client id was not provided');
        if (!userPoolId)
            throw new Error('AWS Cognito user pool id was not provided');
        if (!clientSecret)
            throw new Error('AWS Cognito client secret was not provided');
        if (!region) throw new Error('AWS Region was not provided');
        if (!accessKeyId) throw new Error('AWS access key id was not provided');
        if (!secretAccessKey)
            throw new Error('AWS secret access key was not provided');

        const config: CognitoIdentityProviderClientConfig = {
            region,
            credentials: { accessKeyId, secretAccessKey },
        };

        this.#provider = new CognitoIdentityProviderClient(config);
        this.#clientId = clientId;
        this.#userPoolId = userPoolId;
        this.#clientSecret = clientSecret;
    }

    #getHashSecret = (username: string) =>
        createHmac('SHA256', this.#clientSecret)
            .update(username + this.#clientId)
            .digest('base64');

    signup = (email: string, password: string) =>
        this.#provider.send(
            new SignUpCommand({
                ClientId: this.#clientId,
                Password: password,
                Username: email,
                SecretHash: this.#getHashSecret(email),
            })
        );

    resendConfirmationCode = (email: string) =>
        this.#provider.send(
            new ResendConfirmationCodeCommand({
                ClientId: this.#clientId,
                SecretHash: this.#getHashSecret(email),
                Username: email,
            })
        );

    login = (email: string, password: string) =>
        this.#provider.send(
            new AdminInitiateAuthCommand({
                ClientId: this.#clientId,
                UserPoolId: this.#userPoolId,
                AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                    SECRET_HASH: this.#getHashSecret(email),
                },
            })
        );

    refeshToken = (refreshToken: string, email: string) =>
        this.#provider.send(
            new AdminInitiateAuthCommand({
                ClientId: this.#clientId,
                UserPoolId: this.#userPoolId,
                AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken,
                    SECRET_HASH: this.#getHashSecret(email),
                },
            })
        );

    getUser = (email: string) =>
        this.#provider.send(
            new AdminGetUserCommand({
                UserPoolId: this.#userPoolId,
                Username: email,
            })
        );

    requestPasswordReset = (email: string) =>
        this.#provider.send(
            new ForgotPasswordCommand({
                ClientId: this.#clientId,
                SecretHash: this.#getHashSecret(email),
                Username: email,
            })
        );

    resetPassword = (
        email: string,
        password: string,
        confirmationCode: string
    ) =>
        this.#provider.send(
            new ConfirmForgotPasswordCommand({
                ClientId: this.#clientId,
                SecretHash: this.#getHashSecret(email),
                Username: email,
                Password: password,
                ConfirmationCode: confirmationCode,
            })
        );
}
