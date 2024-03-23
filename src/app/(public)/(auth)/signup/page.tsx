import type { Metadata } from 'next';

import { _t } from '@/constants';

import { SignupForm } from './signupForm';

export const metadata: Metadata = {
    title: _t.signupHeader,
    description: _t.signupSubH,
};

export default function Signup() {
    return <SignupForm />;
}
