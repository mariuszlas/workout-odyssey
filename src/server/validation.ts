import { ZodError } from 'zod';

interface FormState {
    other: string | null;
    fieldErrors: Record<string, string[] | undefined>;
    ok?: boolean;
}

export const formatZodError = (e: ZodError): FormState => ({
    fieldErrors: e.flatten().fieldErrors,
    other: null,
});

export const formatOtherError = (message: string): FormState => ({
    fieldErrors: {},
    other: message,
});
