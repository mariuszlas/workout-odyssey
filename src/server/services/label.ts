'use server';

import { Label } from '@/db/models';
import { TLabel } from '@/interfaces';

export const getAllLabels = async (user: string) =>
    await Label.findAll({
        where: { userId: user },
        attributes: {
            exclude: ['id', 'userId', 'labelId', 'createdAt', 'updatedAt'],
        },
    });

export const findOrCreateLabel = async (
    userId: string | undefined,
    labelDto: TLabel | null
) => {
    if (!labelDto || !labelDto?.value || !labelDto?.color) {
        return;
    }

    const [label] = await Label.findOrCreate({
        where: {
            userId: userId,
            value: labelDto.value,
            color: labelDto.color,
        },
    });

    return label.id;
};

export const deleteUserLabels = async (user: string | undefined) =>
    await Label.destroy({ where: { userId: user } });
