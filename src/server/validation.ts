import { getTranslations } from 'next-intl/server';
import { RefinementCtx, z, ZodError, ZodErrorMap, ZodIssueCode } from 'zod';

type ZodI18nTranslation = Awaited<ReturnType<typeof getTranslations<'zod'>>>;

type MakeZodI18nErrorMap = (t: ZodI18nTranslation) => ZodErrorMap;

enum PasswordError {
    COMMON_1,
    COMMON_2,
    UPPERCASE,
    NUMBER,
    NO_MATCH,
}

const customZodErrorMap: MakeZodI18nErrorMap = t => (error, ctx) => {
    switch (error.code) {
        case z.ZodIssueCode.invalid_type:
            if (error.expected === 'string') {
                return { message: t('invalidTypeString') };
            }
            break;
        case z.ZodIssueCode.invalid_string:
            if (error.validation === 'email') {
                return { message: t('invalidEmail') };
            }
            break;
        case z.ZodIssueCode.too_small:
            return {
                message: t('tooShort', { count: error.minimum.toString() }),
            };
        case z.ZodIssueCode.too_big:
            return {
                message: t('tooLong', { count: error.maximum.toString() }),
            };
        case z.ZodIssueCode.custom:
            switch (error?.params?.type) {
                case PasswordError.COMMON_1:
                    return { message: t('password.common1') };
                case PasswordError.COMMON_2:
                    return { message: t('password.common2') };
                case PasswordError.UPPERCASE:
                    return { message: t('password.uppercaseLetter') };
                case PasswordError.NUMBER:
                    return { message: t('password.number') };
                case PasswordError.NO_MATCH:
                    return { message: t('password.noMatch') };
            }
            break;
    }

    return { message: ctx.defaultError };
};

export const setZodErrorMap = async () => {
    const t = await getTranslations('zod');
    z.setErrorMap(customZodErrorMap(t));
};

const issue = (type: PasswordError, path: string[], fatal = true) => ({
    code: ZodIssueCode.custom,
    path,
    fatal,
    params: { type },
});

const refinePassword = (
    { password, passwordRepeat }: z.infer<typeof passwords>,
    ctx: RefinementCtx
) => {
    if (password === 'Password') {
        ctx.addIssue(issue(PasswordError.COMMON_1, ['password']));
        return z.NEVER;
    }

    if (password === 'password') {
        ctx.addIssue(issue(PasswordError.COMMON_2, ['password']));
        return z.NEVER;
    }

    if (!/[A-Z]/g.test(password)) {
        ctx.addIssue(issue(PasswordError.UPPERCASE, ['password']));
        return z.NEVER;
    }

    if (!/[0-9]/g.test(password)) {
        ctx.addIssue(issue(PasswordError.NUMBER, ['password']));
        return z.NEVER;
    }

    if (password !== passwordRepeat) {
        ctx.addIssue(issue(PasswordError.NO_MATCH, ['password'], false));
        ctx.addIssue(issue(PasswordError.NO_MATCH, ['passwordRepeat'], false));
    }
};

const password = z.string().trim().min(8).max(250);
const passwords = z.object({ password, passwordRepeat: password });
const email = z.string().email().min(5).max(250);
const name = z.string().trim().min(1).max(32);
const code = z.string().trim().min(1);

export const nameSchema = z.object({ name });

export const emailSchema = z.object({ email });

export const loginSchema = z.object({ email, password: z.string() });

export const signupSchema = passwords
    .extend({ email, name })
    .superRefine(refinePassword);

export const changePasswordSchema = passwords
    .extend({ currentPassword: z.string() })
    .superRefine(refinePassword);

export const resetPasswordSchema = passwords
    .extend({ passwordResetCode: code })
    .superRefine(refinePassword);

export const emailVerificationSchema = z.object({
    emailVerificationCode: code,
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
) => ({ ok, email, ...errors });

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
