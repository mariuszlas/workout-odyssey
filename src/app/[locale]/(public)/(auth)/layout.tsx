'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components';
import { Children } from '@/interfaces';
import { usePathname } from '@/navigation';

export default function PublicAuthLayout({ children }: Children) {
    const pathname = usePathname();
    const t = useTranslations('Auth');

    const headers: Record<string, string> = {
        '/login': t('Login.header'),
        '/signup': t('Signup.header'),
        '/verify': t('Verify.header'),
        '/password-reset': t('ResetPassword.header'),
    };

    return (
        <main className="flex grow sm:bg-base-200">
            <section
                className="sm:border-1 m-auto w-full max-w-md bg-base-100 p-8 sm:rounded-xl sm:shadow-lg"
                data-testid={`${pathname.slice(1)}-form`}
            >
                <header className="pb-4">
                    <Heading value={headers[pathname]} />
                </header>

                {children}
            </section>
        </main>
    );
}
