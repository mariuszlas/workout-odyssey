import { useTranslations } from 'next-intl';

import { Heading, Text } from '@/components';
import { Link } from '@/navigation';

export default function NotFoundPage() {
    const t = useTranslations('NotFound');

    return (
        <main className="flex h-[50vh] flex-col items-center justify-center gap-6 p-4">
            <div className="flex flex-col items-center gap-2">
                <Text className="text-xl font-bold text-primary" value="404" />
                <Heading value={t('header')} />
            </div>
            <Text as="p" value={t('description')} />
            <Link className="btn btn-primary" href="/" replace>
                {t('cta')}
            </Link>
        </main>
    );
}
