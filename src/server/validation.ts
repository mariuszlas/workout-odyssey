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
const name = z.string().trim().min(1).max(32);
const resetCode = z.string().trim();

export const nameSchema = z.object({ name });
export const emailSchema = z.object({ email });

export const changePasswordSchema = passwords
    .extend({ currentPassword: z.string() })
    .superRefine(refinePassword);

export const userSignupSchema = passwords
    .extend({ email, name })
    .superRefine(refinePassword);

export const userLoginSchema = z.object({ email, password: z.string() });

export const resetPasswordSchema = passwords
    .extend({ passwordResetCode: resetCode })
    .superRefine(refinePassword);

export const emailVerificationSchema = z.object({
    emailVerificationCode: resetCode,
});

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

export const getErrors = (formState: FormState | undefined) => ({
    emailError: formState?.fieldErrors['email']?.[0],
    nameError: formState?.fieldErrors['name']?.[0],
    passwordError: formState?.fieldErrors['password']?.[0],
    passwordRepeatError: formState?.fieldErrors['passwordRepeat']?.[0],
    currentPasswordError: formState?.fieldErrors['currentPassword']?.[0],
    passwordResetCodeError: formState?.fieldErrors['passwordResetCode']?.[0],
    emailVerificationCodeError:
        formState?.fieldErrors['emailVerificationCode']?.[0],
    otherError: formState?.other,
});
