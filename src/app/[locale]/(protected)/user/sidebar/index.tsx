'use client';

import { FC, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';

import { MenuLink } from '@/components';

import { ID } from '../interfaces';

export const Sidebar: FC = () => {
    const t = useTranslations('AccountSettings');

    const handleScroll = (
        e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
    ) => {
        const href = e?.currentTarget?.href;
        const targetId = href?.replace(/.*#/, '');

        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: 'smooth' });
    };

    const links = [
        { name: t('sections.name.title'), href: `#${ID.DISPLAY_NAME}` },
        { name: t('sections.email.title'), href: `#${ID.EMAIL}` },
        { name: t('sections.info.title'), href: `#${ID.BASIC_INFO}` },
        { name: t('sections.password.title'), href: `#${ID.PASSWORD}` },
        { name: t('sections.deletion.title'), href: `#${ID.ACCOUNT_DELETION}` },
    ];

    return (
        <ul className="sticky top-20 rounded-md border border-base-content border-opacity-20 p-4 text-base sm:shadow-lg">
            {links.map(({ name, href }, idx) => (
                <li key={idx}>
                    <MenuLink
                        className="active:bg-inherit"
                        href={href}
                        scroll={false}
                        onClick={e => handleScroll(e)}
                        popover
                    >
                        {name}
                    </MenuLink>
                </li>
            ))}
        </ul>
    );
};
