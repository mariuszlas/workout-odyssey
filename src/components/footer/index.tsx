import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import { IconButton, TextP } from '@/components';

export const Footer = () => {
    const t = useTranslations('Footer');

    return (
        <footer
            data-testid="footer"
            className="border-t-base-content border-t border-opacity-20 py-3"
        >
            <div className="max-w-8xl mx-auto flex w-full items-center justify-between px-4 sm:px-6">
                <TextP data-testid="copyright-note" value={t('copyright')} />
                <IconButton asChild>
                    <a
                        href="https://github.com/mariuszlas/workout-odyssey"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t('ariaLabel')}
                    >
                        <GitHubLogoIcon className="h-6 w-6" />
                    </a>
                </IconButton>
            </div>
        </footer>
    );
};
