'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import {
    BurgerMenuIcon,
    Button,
    IconButton,
    Logo,
    PlusIcon,
    Text,
    ThemeSwitch,
    UserIcon,
} from '@/components';
import { useIsBreakpoint } from '@/hooks';
import { usePathname } from '@/navigation';

import { BestResultsModal } from '../bestResultsModal';
import { WorkoutUploadModal } from '../workoutUploadModal';

import { DrawerMenu } from './drawerMenu';
import { FloatingNewWorkoutBtn } from './floatingButton';
import { WorkoutSelector } from './workoutSelector';

export const NavBar: FC<{ isProtected?: boolean }> = ({
    isProtected = false,
}) => {
    const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
    const [isWorkoutUploadModalOpen, setIsWorkoutUploadModalOpen] =
        useState(false);
    const [isBestResultsModalOpen, setIsBestResultsModalOpen] = useState(false);
    const t = useTranslations('Navbar');
    const isMobile = useIsBreakpoint('md');

    const pathname = usePathname();
    const isLoginPage = pathname.startsWith('/login');
    const isSignupPage = pathname.startsWith('/signup');
    const isEmailVerificationPage = pathname.startsWith('/verify');
    const isDashboardPage = pathname.startsWith('/dashboard');

    const showLoginBtn = !(isLoginPage || isEmailVerificationPage);
    const showSignupBtn = !isSignupPage;

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-b-base-content border-opacity-20 bg-base-100 bg-opacity-30 py-2 shadow-sm backdrop-blur-lg">
                <nav className="mx-auto flex w-full max-w-8xl items-center px-4 sm:px-6">
                    <div className="navbar-start">
                        {!isMobile && <Logo isProtected={isProtected} />}
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
                        {isMobile && <Logo isProtected={isProtected} />}
                        {isProtected && (
                            <div className="hidden gap-4 md:flex">
                                {isDashboardPage && <WorkoutSelector />}

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
                            <>
                                <IconButton
                                    aria-label={t('bestResults')}
                                    onClick={() =>
                                        setIsBestResultsModalOpen(true)
                                    }
                                >
                                    <UserIcon />
                                </IconButton>
                                <UserButton />
                            </>
                        ) : (
                            <>
                                {showLoginBtn && (
                                    <SignInButton
                                        forceRedirectUrl={'/dashboard/running'}
                                    >
                                        <a className="btn btn-outline btn-primary hidden h-10 min-h-min text-base md:inline-flex">
                                            {t('loginCta')}
                                        </a>
                                    </SignInButton>
                                )}

                                {showSignupBtn && (
                                    <SignUpButton>
                                        <a className="btn btn-primary hidden h-10 min-h-min text-base md:inline-flex">
                                            {t('signupCta')}
                                        </a>
                                    </SignUpButton>
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
            />

            <WorkoutUploadModal
                isOpen={isWorkoutUploadModalOpen}
                onClose={() => setIsWorkoutUploadModalOpen(false)}
            />

            {isProtected && (
                <>
                    <BestResultsModal
                        isOpen={isBestResultsModalOpen}
                        onClose={() => setIsBestResultsModalOpen(false)}
                    />

                    <FloatingNewWorkoutBtn
                        onClick={() => setIsWorkoutUploadModalOpen(true)}
                    />
                </>
            )}
        </>
    );
};
