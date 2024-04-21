import type { Dispatch, FC, SetStateAction } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Alert, Button, Input, PasswordInput, Text } from '@/components';
import { getErrors } from '@/server/validation';

import { resetPassword } from './action';

interface Props {
    email: string | undefined;
    setShouldDisplayPasswordResetForm: Dispatch<SetStateAction<boolean>>;
}

export const PasswordResetForm: FC<Props> = ({
    email,
    setShouldDisplayPasswordResetForm,
}) => {
    const [formState, action] = useFormState(
        resetPassword.bind(null, email),
        undefined
    );
    const t = useTranslations('Auth');

    const {
        passwordError,
        passwordRepeatError,
        passwordResetCodeError,
        otherError,
    } = getErrors(formState);

    return (
        <form className="form-control w-full gap-6" action={action}>
            <div className="form-control gap-2">
                {otherError && (
                    <Alert status="error" classes="mb-0">
                        {otherError}
                    </Alert>
                )}

                <Text as="p" value={t('ResetPassword.description')} />

                <div>
                    <Input
                        required
                        autoFocus
                        id="passwordResetCode"
                        name="passwordResetCode"
                        type="text"
                        label={t('form.passwordResetCode.label')}
                        error={passwordResetCodeError}
                        aria-invalid={Boolean(passwordResetCodeError)}
                        aria-errormessage={passwordResetCodeError}
                    />
                </div>

                <div>
                    <PasswordInput
                        id="password"
                        name="password"
                        label={t('form.newPassword.label')}
                        placeholder={t('form.passwordPlaceholder')}
                        error={passwordError}
                        aria-invalid={Boolean(passwordError)}
                        aria-errormessage={passwordError}
                        iconAriaLabel={t('form.newPassword.aria')}
                    />
                </div>

                <div>
                    <PasswordInput
                        id="passwordRepeat"
                        name="passwordRepeat"
                        label={t('form.newPasswordRepeat.label')}
                        placeholder={t('form.passwordPlaceholder')}
                        error={passwordRepeatError}
                        aria-invalid={Boolean(passwordRepeatError)}
                        aria-errormessage={passwordRepeatError}
                        iconAriaLabel={t('form.newPasswordRepeat.aria')}
                    />
                </div>
            </div>

            <Button type="submit" className="btn-primary btn-block">
                {t('ResetPassword.cta')}
            </Button>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => setShouldDisplayPasswordResetForm(false)}
                    className="link link-primary font-medium"
                >
                    {t('ResetPassword.requestPasswordResetLink')}
                </button>
            </div>
        </form>
    );
};
