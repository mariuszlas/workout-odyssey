import Link from 'next/link';

import { Button, H1, TextP } from '@/components';

export default function NotFoundPage() {
    return (
        <main className="flex h-[50vh] flex-col items-center justify-center gap-4 p-4">
            <div className="flex flex-col items-center gap-2">
                <TextP className="text-xl font-bold text-primary" value="404" />
                <H1 value="Page Not Found" />
            </div>
            <TextP value="Sorry, we couldn't find the page you're looking for." />
            <Button asChild variant="link">
                <Link href="/" replace>
                    Back to Home
                </Link>
            </Button>
        </main>
    );
}
