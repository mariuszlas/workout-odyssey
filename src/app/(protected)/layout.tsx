import { auth } from '@clerk/nextjs/server';

import { Children } from '@/interfaces';
import { SWRProvider, UIProvider } from '@/providers';
import { NavBar } from '@/views';

export default async function ProtectedLayout({ children }: Children) {
    const { userId } = auth();

    return (
        <UIProvider userId={userId}>
            <SWRProvider>
                <NavBar isProtected />
                {children}
            </SWRProvider>
        </UIProvider>
    );
}
