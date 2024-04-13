'use client';

import Error from 'next/error';

/**
 * A 404 Not Found page displayed when the user requests a route that is not
 * matched by the middleware and so there's no locale associated with the it
 */
export default function NotFound() {
    return (
        <html lang="en">
            <body>
                <Error statusCode={404} />
            </body>
        </html>
    );
}
