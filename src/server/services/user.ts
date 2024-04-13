'use server';

import { redirect } from 'next/navigation';

import { User } from '@/db/models';

import { CognitoApi } from '../cognitoAuth';
import { validateSession } from '../helpers';

import { getUserWorkoutCount } from './workout';

const getUserByUsername = (username: string | undefined) =>
    User.findOne({ where: { username } });

export const getUserId = async (username: string | undefined) =>
    (await getUserByUsername(username))?.id;

export const getCurrentUserId = async () => {
    const username = validateSession();
    const userId = await getUserId(username);

    if (!userId) redirect('/login');

    return userId;
};

export const reportUserLogin = async (username: string) => {
    const user = await getUserByUsername(username);

    if (user) {
        user.reportLoginDate();
        await user.increment('loginCount');
        await user.save();
    }
};

const getUserData = async (username: string | undefined) => {
    const user = await getUserByUsername(username);
    if (!user) throw new Error();

    const count = await getUserWorkoutCount(user.id);

    return { ...user.toJSON(), totalNoOfWorkouts: count };
};

export const getAllUserData = async (username: string) => {
    const [user, cognitoUser] = await Promise.all([
        getUserData(username),
        new CognitoApi().getUser(username),
    ]);

    return {
        ...user,
        cognitoAttributes: cognitoUser.UserAttributes,
    };
};

export const createUser = async (
    username: string,
    name: string,
    isDemo = true
) => {
    const user = await User.create({
        username: username,
        name: name,
        isDemo: isDemo,
    });
    if (!user) return;

    return user.toJSON();
};

export const updateUserName = async (
    username: string | undefined,
    name: string
) => {
    const user = await getUserByUsername(username);
    if (!user) return;

    return await user.update({ name });
};

export const destroyUser = async (username: string | undefined) => {
    const user = await getUserByUsername(username);
    if (!user) return;

    return await user.destroy();
};
