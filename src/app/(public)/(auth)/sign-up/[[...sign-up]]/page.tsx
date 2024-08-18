import { SignUp } from '@clerk/nextjs';

export async function generateMetadata() {
    return {
        title: 'Sign Up',
        description:
            'Sign up to Workout Odyssey and start your fitness journey today!',
    };
}

export default function SignupPage() {
    return <SignUp />;
}
