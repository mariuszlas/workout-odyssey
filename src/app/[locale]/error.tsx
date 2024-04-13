'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Heading, Text } from '@/components';
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
        <main className="flex h-[50vh] flex-col items-center justify-center gap-6 p-4">
            <Heading value={t('header')} />
            <Text as="p" value={t('description')} />

            <Button onClick={() => reset()}>{t('ctaSecondary')}</Button>

            <Text as="p">
                <Link className="btn btn-primary" href="/" replace>
                    {t('cta')}
                </Link>
            </Text>
        </main>
    );
}
