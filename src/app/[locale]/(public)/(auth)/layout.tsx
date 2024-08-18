'use client';

import { Children } from '@/interfaces';
import { usePathname } from '@/navigation';

export default function PublicAuthLayout({ children }: Children) {
    const pathname = usePathname();

    return (
        <main className="sm:bg-base-200 flex grow p-4 sm:p-6">
            <section
                className="m-auto"
                data-testid={`${pathname.slice(1)}-form`}
            >
                {children}
            </section>
        </main>
    );
}
