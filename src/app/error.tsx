'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Button, H1, TextP } from '@/components';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: Props) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-[50vh] flex-col items-center justify-center gap-4 p-4">
            <H1 value="Something went wrong!" />
            <TextP value="Something went wrong on our side and we could not load the page" />
            <Button onClick={() => reset()}>Try Again</Button>
            <Button asChild variant="link">
                <Link href="/" replace>
                    Back to Home
                </Link>
            </Button>
        </main>
    );
}
