'use client';

import { Children } from '@/interfaces';
import { usePathname } from '@/navigation';

// export const dynamic = 'force-static';

export default function PublicAuthLayout({ children }: Children) {
    const pathname = usePathname();
    // console.log('pathname', pathname);

    return (
        <main className="flex grow p-4 sm:bg-base-200 sm:p-6">
            <section
                className="m-auto"
                data-testid={`${pathname.slice(1)}-form`}
            >
                {children}
            </section>
        </main>
    );
}
