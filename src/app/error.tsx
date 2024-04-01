'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Button, Heading, Text } from '@/components';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-[50vh] flex-col items-center justify-center gap-6 p-4">
            <Heading value="Something went wrong!" />
            <Text
                as="p"
                value="Something went wrong on our side and we could not load the page"
            />
            <Button onClick={() => reset()}>Try again</Button>

            <Text as="p">
                <Link className="btn btn-primary" href="/">
                    Back to Home
                </Link>
            </Text>
        </main>
    );
}
