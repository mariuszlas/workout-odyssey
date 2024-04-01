'use client';

import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';

import { Button, Input, notify } from '@/components';
import { getErrors } from '@/server/validation';

import { ID, Props } from '../interfaces';

import { updateDisplayName } from './action';
import { Body, Container, Footer } from './shared';

export const DisplayName: FC<Props> = ({ data, isLoading }) => {
    const [formState, action] = useFormState(updateDisplayName, undefined);
    const { nameError } = getErrors(formState);

    useEffect(() => {
        if ((formState as any)?.ok) {
            notify.success('Display Name was successfully updated');
        }
        if (formState?.other) {
            notify.error(formState.other);
        }
    }, [formState]);

    return (
        <Container id={ID.DISPLAY_NAME} isLoading={isLoading}>
            <form action={action}>
                <Body
                    title="Display Name"
                    description="Your full name, or a display name you are comfortable with."
                >
                    <div>
                        <Input
                            required
                            id="name"
                            name="name"
                            type="text"
                            className="max-w-72"
                            defaultValue={data?.name}
                            error={nameError}
                            aria-invalid={Boolean(nameError)}
                            aria-errormessage={nameError}
                        />
                    </div>
                </Body>

                <Footer info="Please use 32 characters at maximum.">
                    <Button className="btn btn-primary" type="submit">
                        Save
                    </Button>
                </Footer>
            </form>
        </Container>
    );
};
