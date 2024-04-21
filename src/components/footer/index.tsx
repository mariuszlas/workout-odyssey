import { useTranslations } from 'next-intl';

import { GitlabIcon, Text } from '@/components';

export const Footer = () => {
    const t = useTranslations('Footer');

    return (
        <footer className="border-t border-t-base-content border-opacity-20 py-3">
            <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-8">
                <Text data-testid="copyright-note" value={t('copyright')} />
                <a
                    className="btn btn-square btn-ghost btn-sm text-primary"
                    href="https://gitlab.com/mariuszlas/workout-odyssey"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t('ariaLabel')}
                >
                    <GitlabIcon className="h-8 w-8" />
                </a>
            </div>
        </footer>
    );
};
