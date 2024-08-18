import { useTranslations } from 'next-intl';

import { Button, H1, TextP } from '@/components';
import { Link } from '@/navigation';

export default function NotFoundPage() {
    const t = useTranslations('NotFound');

    return (
        <main className="flex h-[50vh] flex-col items-center justify-center gap-4 p-4">
            <div className="flex flex-col items-center gap-2">
                <TextP className="text-xl font-bold text-primary" value="404" />
                <H1 value={t('header')} />
            </div>
            <TextP value={t('description')} />
            <Button asChild variant="link">
                <Link href="/" replace>
                    {t('cta')}
                </Link>
            </Button>
        </main>
    );
}
