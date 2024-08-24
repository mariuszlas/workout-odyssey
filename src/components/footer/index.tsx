import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { IconButton, TextP } from '@/components';

export const Footer = () => (
    <footer
        data-testid="footer"
        className="border-t-base-content border-t border-opacity-20 py-3"
    >
        <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 sm:px-6">
            <TextP data-testid="copyright-note">© 2024 Mariusz Las</TextP>
            <IconButton asChild>
                <a
                    href="https://github.com/mariuszlas/workout-odyssey"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit the project's GitLab page"
                >
                    <GitHubLogoIcon className="h-6 w-6" />
                </a>
            </IconButton>
        </div>
    </footer>
);
