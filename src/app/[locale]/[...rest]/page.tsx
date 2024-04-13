import { notFound } from 'next/navigation';

/**
 * Catches all unkown pages and calls notFound so that the
 * app/[locale]/not-found.tsx is used to display localised 404 Not Found page
 * https://next-intl-docs.vercel.app/docs/environments/error-files
 */
export default function CatchAllUnknownPages() {
    notFound();
}
