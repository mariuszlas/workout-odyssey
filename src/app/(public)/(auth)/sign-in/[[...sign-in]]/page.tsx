import { SignIn } from '@clerk/nextjs';

export async function generateMetadata() {
    return { title: 'Sign In', description: 'Log in to access your data' };
}

export default function SigninPage() {
    return <SignIn forceRedirectUrl={'/dashboard/running'} />;
}
