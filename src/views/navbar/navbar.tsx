'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    _t,
    BurgerMenuIcon,
    Button,
    Logo,
    PlusIcon,
    Text,
    ThemeSwitch,
} from '@/components';

import { UserMenu } from '../userMenu';
import { WorkoutSelector } from '../workoutSelector';
import { WorkoutUploadModal } from '../workoutUploadModal';

import { DrawerMenu } from './drawerMenu';
import { FloatingNewWorkoutBtn } from './floatingButton';

export const NavBar: FC<{ isProtected?: boolean }> = ({
    isProtected = false,
}) => {
    const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
    const [isWorkoutUploadModalOpen, setIsWorkoutUploadModalOpen] =
        useState(false);

    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const isSignupPage = pathname === '/signup';
    const isEmailVerificationPage = pathname === '/verify';
    const isDashboard = pathname.startsWith('/dashboard');
    const isUser = pathname.startsWith('/user');

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
                                {isDashboard && <WorkoutSelector />}

                                {isUser && (
                                    <Link
                                        href="/dashboard/running"
                                        className="btn btn-outline btn-primary h-10 min-h-min text-base"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                <Button
                                    aria-label="add workout"
                                    className="btn btn-outline btn-primary h-10 min-h-min text-base"
                                    onClick={() =>
                                        setIsWorkoutUploadModalOpen(true)
                                    }
                                >
                                    <Text value={_t.btnAddWorkout} />
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
                                        className="btn btn-outline btn-primary h-10 min-h-min text-base"
                                        href="/login"
                                        color="primary"
                                    >
                                        {_t.btnLogin}
                                    </Link>
                                )}

                                {showSignupBtn && (
                                    <Link
                                        className="btn btn-primary hidden h-10 min-h-min text-base sm:inline-flex"
                                        href="/signup"
                                        color="primary"
                                    >
                                        {_t.btnSignup}
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
                isSignupPage={isSignupPage}
                openWorkoutUploadModal={() => setIsWorkoutUploadModalOpen(true)}
                isUser={isUser}
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
