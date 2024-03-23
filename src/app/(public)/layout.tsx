import { Children } from '@/interfaces';
import { Footer, NavBar } from '@/views';

export default async function PublicLayout({ children }: Children) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}
