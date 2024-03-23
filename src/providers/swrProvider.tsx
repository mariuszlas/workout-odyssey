'use client';

import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig
        value={{ fetcher: (url: string) => fetch(url).then(res => res.json()) }}
    >
        {children}
    </SWRConfig>
);
