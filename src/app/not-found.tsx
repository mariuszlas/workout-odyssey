import Link from 'next/link';

import { _t, Heading, Text } from '@/components';

export default function NotFound() {
    return (
        <main className="flex h-[50vh] flex-col items-center justify-center gap-6 p-4">
            <div className="flex flex-col items-center gap-2">
                <Text className="text-xl font-bold text-primary">404</Text>
                <Heading>{_t.errorPageNotFoundTitle}</Heading>
            </div>
            <Text as="p">{_t.errorPageNotFound}</Text>
            <Text as="p">
                <Link className="btn btn-primary" href="/">
                    Back to Home
                </Link>
            </Text>
        </main>
    );
}
