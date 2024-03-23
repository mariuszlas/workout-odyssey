import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useFormState } from 'react-dom';

import { Alert, Button, Input, Text } from '@/components';
import { _t } from '@/constants';
import { getErrors } from '@/server/validation';

import { requestPasswordReset } from './action';

interface Props {
    setShouldDisplayPasswordResetForm: Dispatch<SetStateAction<boolean>>;
    setEmail: Dispatch<SetStateAction<string | undefined>>;
}

export const RequestResetPasswordForm: FC<Props> = ({
    setEmail,
    setShouldDisplayPasswordResetForm,
}) => {
    const [formState, action] = useFormState(requestPasswordReset, undefined);
    const { emailError, otherError } = getErrors(formState);

    useEffect(() => {
        if (formState?.ok && formState?.email) {
            setEmail(formState.email);
            setShouldDisplayPasswordResetForm(true);
        }
    }, [formState]);

    return (
        <form className="form-control w-full gap-6" action={action}>
            {otherError && (
                <Alert status="error" classes="mb-0">
                    {otherError}
                </Alert>
            )}

            <Text as="p">{_t.passwordResetBody1}</Text>

            <div>
                <Input
                    autoFocus
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder={_t.plcdEmail}
                    error={emailError}
                    aria-invalid={Boolean(emailError)}
                    aria-errormessage={emailError}
                />
            </div>

            <Button type="submit" className="btn-primary btn-block">
                {_t.passwordResetRequestBtn}
            </Button>
        </form>
    );
};
