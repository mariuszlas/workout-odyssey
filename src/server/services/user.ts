'use server';

import { cookies } from 'next/headers';

import { User } from '@/db/models';
import { Cookie } from '@/interfaces';

import { getUserWorkoutCount } from './workout';

const getUser = (email: string | undefined) =>
    User.findOne({ where: { email } });

export const getUserId = async (email: string | undefined) => {
    return (await getUser(email))?.id;
};

export const getSessionUserId = async () => {
    const email = cookies().get(Cookie.SESSION)?.value;

    if (!email) return;

    return await getUserId(email);
};

export const reportUserLogin = async (email: string | undefined) => {
    const user = await getUser(email);

    if (user) {
        user.reportLoginDate();
        await user.increment('loginCount');
        await user.save();
    }
};

export const getUserData = async (email: string | undefined) => {
    const user = await getUser(email);

    if (!user) return null;

    const count = await getUserWorkoutCount(user.id);

    return { ...user.toJSON(), totalNoOfWorkouts: count };
};

export const createUser = async (
    username: string,
    email: string,
    name: string,
    isDemo = true
) => {
    const user = await User.create({
        username: username,
        email: email,
        name: name,
        isDemo: isDemo,
    });
    return user.toJSON();
};
