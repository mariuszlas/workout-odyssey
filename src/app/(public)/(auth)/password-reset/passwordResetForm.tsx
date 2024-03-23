import type { Dispatch, FC, SetStateAction } from 'react';
import { useFormState } from 'react-dom';

import { Alert, Button, Input, PasswordInput, Text } from '@/components';
import { _t } from '@/constants';
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

    const { passwordError, passwordRepeatError, resetCodeError, otherError } =
        getErrors(formState);

    return (
        <form className="form-control w-full gap-6" action={action}>
            <div className="form-control gap-2">
                {otherError && (
                    <Alert status="error" classes="mb-0">
                        {otherError}
                    </Alert>
                )}

                <Text as="p">{_t.passwordResetBody2}</Text>

                <div>
                    <Input
                        required
                        autoFocus
                        id="passwordResetCode"
                        name="passwordResetCode"
                        type="text"
                        label={_t.labelPasswordResetCode}
                        error={resetCodeError}
                        aria-invalid={Boolean(resetCodeError)}
                        aria-errormessage={resetCodeError}
                    />
                </div>

                <div>
                    <PasswordInput
                        id="password"
                        name="password"
                        label={_t.labelNewPass}
                        placeholder={_t.plcdPassword}
                        error={passwordError}
                        aria-invalid={Boolean(passwordError)}
                        aria-errormessage={passwordError}
                        iconAriaLabel="toggle password visibility"
                    />
                </div>

                <div>
                    <PasswordInput
                        id="passwordRepeat"
                        name="passwordRepeat"
                        label={_t.labelNewPassRep}
                        placeholder={_t.plcdPassword}
                        error={passwordRepeatError}
                        aria-invalid={Boolean(passwordRepeatError)}
                        aria-errormessage={passwordRepeatError}
                        iconAriaLabel="toggle password repeat visibility"
                    />
                </div>
            </div>

            <Button type="submit" className="btn-primary btn-block">
                {_t.passwordResetBtn}
            </Button>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => setShouldDisplayPasswordResetForm(false)}
                    className="link link-primary font-medium"
                >
                    {_t.passwordResetNoCode}
                </button>
            </div>
        </form>
    );
};
