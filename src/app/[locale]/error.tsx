'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Button, H1, TextP } from '@/components';
import { Link } from '@/navigation';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: Props) {
    const t = useTranslations('Error');

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-[50vh] flex-col items-center justify-center gap-4 p-4">
            <H1 value={t('header')} />
            <TextP value={t('description')} />
            <Button onClick={() => reset()}>{t('ctaSecondary')}</Button>
            <Button asChild variant="link">
                <Link href="/" replace>
                    {t('cta')}
                </Link>
            </Button>
        </main>
    );
}
