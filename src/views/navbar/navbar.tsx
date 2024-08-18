'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { HamburgerMenuIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';

import { Button, IconButton, Logo, ThemeSwitch } from '@/components';
import { useIsBreakpoint } from '@/hooks';

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
            <header className="border-b-base-content bg-base-100 sticky top-0 z-50 w-full border-b border-opacity-20 bg-opacity-30 py-2 shadow-sm backdrop-blur-lg">
                <nav className="max-w-8xl mx-auto flex w-full items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                        {!isMobile && <Logo isProtected={isProtected} />}
                        <div className="md:hidden">
                            <IconButton
                                onClick={() => setIsDrawerMenuOpen(true)}
                                aria-label="Main Menu"
                            >
                                <HamburgerMenuIcon className="h-6 w-6" />
                            </IconButton>
                        </div>
                        {isProtected && isDashboardPage && <WorkoutSelector />}
                    </div>

                    <div>{isMobile && <Logo isProtected={isProtected} />}</div>

                    <div className="flex items-center gap-3">
                        {isProtected && (
                            <IconButton
                                className="hidden md:flex"
                                onClick={() =>
                                    setIsWorkoutUploadModalOpen(true)
                                }
                            >
                                <PlusIcon className="h-6 w-6" />
                            </IconButton>
                        )}

                        <ThemeSwitch />

                        {isProtected ? (
                            <>
                                <IconButton
                                    aria-label="Best Results"
                                    onClick={() =>
                                        setIsBestResultsModalOpen(true)
                                    }
                                >
                                    <StarIcon className="h-6 w-6" />
                                </IconButton>
                                <UserButton />
                            </>
                        ) : (
                            <>
                                {showLoginBtn && (
                                    <SignInButton
                                        forceRedirectUrl={'/dashboard/running'}
                                    >
                                        <Button
                                            asChild
                                            className="hidden cursor-pointer md:inline-flex"
                                        >
                                            <a>Sign In</a>
                                        </Button>
                                    </SignInButton>
                                )}
                                {showSignupBtn && (
                                    <SignUpButton>
                                        <Button
                                            asChild
                                            className="hidden cursor-pointer md:inline-flex"
                                        >
                                            <a>Sign Out</a>
                                        </Button>
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

            {isProtected && (
                <>
                    <WorkoutUploadModal
                        isOpen={isWorkoutUploadModalOpen}
                        onClose={() => setIsWorkoutUploadModalOpen(false)}
                    />
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
