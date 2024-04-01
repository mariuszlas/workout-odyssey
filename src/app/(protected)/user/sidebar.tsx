'use client';

import { FC, MouseEvent } from 'react';

import { _t, MenuLink } from '@/components';
import { ID } from '@/views';

export const Sidebar: FC = () => {
    const handleScroll = (
        e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
    ) => {
        const href = e?.currentTarget?.href;
        const targetId = href?.replace(/.*#/, '');

        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: 'smooth' });
    };

    const links = [
        { name: 'Display Name', href: `#${ID.DISPLAY_NAME}` },
        { name: 'Email', href: `#${ID.EMAIL}` },
        { name: 'Details', href: `#${ID.BASIC_INFO}` },
        { name: 'Password', href: `#${ID.PASSWORD}` },
        { name: 'Account Deletion', href: `#${ID.ACCOUNT_DELETION}` },
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
