import { Children } from '@/interfaces';
import { SWRProvider, UIProvider } from '@/providers';
import { NavBar } from '@/views';

export default async function ProtectedLayout({ children }: Children) {
    return (
        <UIProvider>
            <SWRProvider>
                <NavBar isProtected />
                {children}
            </SWRProvider>
        </UIProvider>
    );
}
