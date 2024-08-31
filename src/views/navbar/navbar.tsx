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
    const isLoginPage = pathname.startsWith('/sign-in');
    const isSignupPage = pathname.startsWith('/sign-up');
    const isDashboardPage = pathname.startsWith('/dashboard');

    const showLoginBtn = !isLoginPage;
    const showSignupBtn = !isSignupPage;

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-opacity-30 py-2 shadow-sm backdrop-blur-lg">
                <nav className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 sm:px-6">
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
                    <div className="flex items-center gap-4">
                        {isProtected ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <IconButton
                                        className="hidden md:flex"
                                        onClick={() =>
                                            setIsWorkoutUploadModalOpen(true)
                                        }
                                    >
                                        <PlusIcon className="h-6 w-6" />
                                    </IconButton>
                                    <IconButton
                                        className="hidden md:flex"
                                        aria-label="Best Results"
                                        onClick={() =>
                                            setIsBestResultsModalOpen(true)
                                        }
                                    >
                                        <StarIcon className="h-6 w-6" />
                                    </IconButton>
                                    <ThemeSwitch />
                                </div>
                                <UserButton />
                            </>
                        ) : (
                            <>
                                <ThemeSwitch />
                                {showLoginBtn && (
                                    <SignInButton forceRedirectUrl="/dashboard/running">
                                        <Button
                                            asChild
                                            className="hidden cursor-pointer border-primary text-primary hover:text-primary md:inline-flex"
                                            variant="outline"
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
                openBestResultsModalOpen={() => setIsBestResultsModalOpen(true)}
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
