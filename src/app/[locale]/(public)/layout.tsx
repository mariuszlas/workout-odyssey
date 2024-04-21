import { Footer } from '@/components';
import { Children } from '@/interfaces';
import { NavBar } from '@/views';

export default async function PublicLayout({ children }: Children) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}
