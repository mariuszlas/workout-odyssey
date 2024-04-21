'use client';

import type { FC } from 'react';
import { useState } from 'react';
import {} from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
    BurgerMenuIcon,
    Button,
    Logo,
    PlusIcon,
    Text,
    ThemeSwitch,
} from '@/components';
import { Link, usePathname } from '@/navigation';

import { WorkoutUploadModal } from '../workoutUploadModal';

import { DrawerMenu } from './drawerMenu';
import { FloatingNewWorkoutBtn } from './floatingButton';
import { UserMenu } from './userMenu';
import { WorkoutSelector } from './workoutSelector';

export const NavBar: FC<{ isProtected?: boolean }> = ({
    isProtected = false,
}) => {
    const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
    const [isWorkoutUploadModalOpen, setIsWorkoutUploadModalOpen] =
        useState(false);
    const t = useTranslations('Navbar');

    const pathname = usePathname();
    const isLoginPage = pathname.startsWith('/login');
    const isSignupPage = pathname.startsWith('/signup');
    const isEmailVerificationPage = pathname.startsWith('/verify');
    const isDashboardPage = pathname.startsWith('/dashboard');
    const isAccountSettingsPage = pathname.startsWith('/user');

    const showLoginBtn = !(isLoginPage || isEmailVerificationPage);
    const showSignupBtn = !isSignupPage;

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-b-base-content border-opacity-20 bg-base-100 bg-opacity-30 py-2 shadow-sm backdrop-blur-lg">
                <nav className="mx-auto flex w-full max-w-8xl items-center px-4 sm:px-8">
                    <div className="navbar-start">
                        <div className="hidden md:block">
                            <Logo isProtected={isProtected} />
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsDrawerMenuOpen(true)}
                                className="btn btn-ghost h-10 min-h-min"
                                type="button"
                                aria-label={t('mainMenu')}
                            >
                                <BurgerMenuIcon />
                            </button>
                        </div>
                    </div>

                    <div className="navbar-center">
                        <div className="md:hidden">
                            <Logo isProtected={isProtected} />
                        </div>

                        {isProtected && (
                            <div className="hidden gap-4 md:flex">
                                {isDashboardPage && <WorkoutSelector />}

                                {isAccountSettingsPage && (
                                    <Link
                                        href="/dashboard/running"
                                        className="btn btn-outline btn-primary h-10 min-h-min text-base"
                                    >
                                        {t('dashboardLink')}
                                    </Link>
                                )}

                                <Button
                                    className="btn btn-outline btn-primary h-10 min-h-min text-base"
                                    onClick={() =>
                                        setIsWorkoutUploadModalOpen(true)
                                    }
                                >
                                    <Text value={t('newWorkoutCta')} />
                                    <PlusIcon />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="navbar-end flex items-center gap-4">
                        <ThemeSwitch />

                        {isProtected ? (
                            <UserMenu />
                        ) : (
                            <>
                                {showLoginBtn && (
                                    <Link
                                        className="btn btn-outline btn-primary hidden h-10 min-h-min text-base md:inline-flex"
                                        href="/login"
                                        color="primary"
                                    >
                                        {t('loginCta')}
                                    </Link>
                                )}

                                {showSignupBtn && (
                                    <Link
                                        className="btn btn-primary hidden h-10 min-h-min text-base md:inline-flex"
                                        href="/signup"
                                        color="primary"
                                    >
                                        {t('signupCta')}
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <DrawerMenu
                isOpen={isDrawerMenuOpen}
                onClose={() => setIsDrawerMenuOpen(false)}
                isProtected={isProtected}
                showLoginBtn={showLoginBtn}
                showSignupBtn={showSignupBtn}
                openWorkoutUploadModal={() => setIsWorkoutUploadModalOpen(true)}
                isAccountSettingsPage={isAccountSettingsPage}
            />

            <WorkoutUploadModal
                isOpen={isWorkoutUploadModalOpen}
                onClose={() => setIsWorkoutUploadModalOpen(false)}
            />

            {isProtected && (
                <FloatingNewWorkoutBtn
                    onClick={() => setIsWorkoutUploadModalOpen(true)}
                />
            )}
        </>
    );
};
