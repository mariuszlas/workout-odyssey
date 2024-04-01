import { _t, GitlabIcon, Text } from '@/components';

export const Footer = () => (
    <footer className="border-t border-t-base-content border-opacity-20 py-3">
        <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-8">
            <Text aria-label="copyright note" value={_t.copyright} />
            <a
                className="btn btn-square btn-ghost btn-sm text-primary"
                href="https://gitlab.com/mariuszlas/workout-odyssey"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit the project's GitLab page"
            >
                <GitlabIcon className="h-8 w-8" />
            </a>
        </div>
    </footer>
);
