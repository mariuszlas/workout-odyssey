import { RefinementCtx, z, ZodError, ZodIssueCode } from 'zod';

import { _t } from '@/constants';

const issue = (message: string, path: string[], fatal = true) => ({
    code: ZodIssueCode.custom,
    message,
    path,
    fatal,
});

const password = z
    .string()
    .trim()
    .min(8, _t.errorPassword2)
    .max(250, 'Password cannot be longer than 250 characters');

const passwords = z.object({ password, passwordRepeat: password });

type TPasswords = z.infer<typeof passwords>;

const refinePassword = (
    { password, passwordRepeat }: TPasswords,
    ctx: RefinementCtx
) => {
    if (password === 'Password') {
        ctx.addIssue(issue(_t.errorPassword3, ['password']));
        return z.NEVER;
    }

    if (password === 'password') {
        ctx.addIssue(issue(_t.errorPassword4, ['password']));
        return z.NEVER;
    }

    if (!/[A-Z]/g.test(password)) {
        ctx.addIssue(issue(_t.errorPassword5, ['password']));
        return z.NEVER;
    }

    if (!/[0-9]/g.test(password)) {
        ctx.addIssue(issue(_t.errorPassword6, ['password']));
        return z.NEVER;
    }

    if (password !== passwordRepeat) {
        ctx.addIssue(issue(_t.errorPassword1, ['password'], false));
        ctx.addIssue(issue(_t.errorPassword1, ['passwordRepeat'], false));
    }
};

const email = z.string().email().min(5).max(250);

export const userSignupSchema = passwords
    .extend({ email, name: z.string().trim().min(1).max(250) })
    .superRefine(refinePassword);

export const userLoginSchema = z.object({ email, password: z.string() });

export const requestPasswordResetSchema = z.object({ email });

export const resetPasswordSchema = passwords
    .extend({ passwordResetCode: z.string().trim() })
    .superRefine(refinePassword);

interface FormState {
    other: string | null;
    fieldErrors: Record<string, string[] | undefined>;
}

export const formatZodError = (e: ZodError): FormState => ({
    fieldErrors: e.flatten().fieldErrors,
    other: null,
});

export const formatOtherError = (message: string): FormState => ({
    fieldErrors: {},
    other: message,
});

export const formatResponse = (
    ok: boolean,
    errors: FormState,
    email?: string
) => ({
    ok,
    email,
    ...errors,
});

export const getErrors = (formState: FormState | undefined) => {
    const emailError = formState?.fieldErrors['email']?.[0];
    const nameError = formState?.fieldErrors['name']?.[0];
    const passwordError = formState?.fieldErrors['password']?.[0];
    const passwordRepeatError = formState?.fieldErrors['passwordRepeat']?.[0];
    const resetCodeError = formState?.fieldErrors['passwordResetCode']?.[0];
    const otherError = formState?.other;

    return {
        emailError,
        nameError,
        passwordError,
        passwordRepeatError,
        otherError,
        resetCodeError,
    };
};
