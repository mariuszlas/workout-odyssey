import type { Metadata } from 'next';

import { _t } from '@/constants';

import { PasswordResetPage } from './passwordResetPage';

export const metadata: Metadata = {
    title: _t.passwordResetHeader,
    description: 'Reset your password',
};

export default function PasswordReset() {
    return <PasswordResetPage />;
}
