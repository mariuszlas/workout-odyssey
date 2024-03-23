'use client';

import { usePathname } from 'next/navigation';

import { Heading } from '@/components';
import { _t } from '@/constants';
import { Children } from '@/interfaces';

export default function PublicAuthLayout({ children }: Children) {
    const pathname = usePathname();

    const headers: Record<string, string> = {
        '/login': _t.loginHeader,
        '/signup': _t.signupHeader,
        '/verify': _t.emailConfirmationHeader,
        '/password-reset': _t.passwordResetHeader,
    };

    return (
        <main className="flex grow sm:bg-base-200">
            <section
                className="sm:border-1 m-auto w-full max-w-md bg-base-100 p-8 sm:rounded-xl sm:shadow-lg"
                data-testid={`${pathname.slice(1)}-form`}
            >
                <header className="pb-4">
                    <Heading>{headers[pathname]}</Heading>
                </header>

                {children}
            </section>
        </main>
    );
}
