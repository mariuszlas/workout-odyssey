'use server';

import { LineString } from 'geojson';
import { Op, QueryTypes } from 'sequelize';

import sequlize from '@/db/connection';
import { Label, Workout } from '@/db/models';
import {
    BestResults,
    UploadWorkout,
    Workout as TWorkout,
    WorkoutsDashboard,
    WorkoutTypes,
} from '@/interfaces';

import { ranges } from './helpers';
import { findOrCreateLabel } from './label';
import { sqlMonths, sqlTotalBest, sqlYears } from './sql';

const labelOpts = {
    model: Label,
    as: 'label',
    attributes: ['value', 'color'],
    required: false,
};

const workoutExclusionParams = [
    'userId',
    'labelId',
    'UserId',
    'LabelId',
    'createdAt',
    'updatedAt',
    'geometry',
];

export const getWorkoutById = async (id: number) =>
    await Workout.findByPk(id, {
        attributes: { exclude: ['userId', 'labelId', 'UserId', 'LabelId'] },
        include: labelOpts,
        nest: true,
        raw: true,
    });

export const updateWorkout = async (
    workoutDto: UploadWorkout,
    userId: number
) => {
    let labelId = null;

    if (
        workoutDto?.label &&
        workoutDto?.label.value &&
        workoutDto.label.color
    ) {
        labelId = await findOrCreateLabel(userId, workoutDto.label);
    }

    const workout = await Workout.findByPk(workoutDto.id);

    if (!workout) return;

    return await workout.update({
        type: workoutDto.type,
        timestamp: new Date(workoutDto.timestamp),
        timezone: workoutDto.timezone,
        distance: workoutDto.distance,
        duration: workoutDto.duration,
        pace: workoutDto.duration / workoutDto.distance,
        speed: workoutDto.distance / (workoutDto.duration / 3600),
        notes: workoutDto.notes,
        labelId,
    });
};

export const createWorkout = async (workout: UploadWorkout, userId: number) => {
    const labelId = await findOrCreateLabel(userId, workout.label);

    const geometry = workout?.geolocation?.length
        ? ({
              type: 'LineString',
              coordinates: workout.geolocation,
          } as LineString)
        : null;

    return await Workout.create({
        type: workout.type,
        timestamp: new Date(workout.timestamp),
        timezone: workout.timezone,
        distance: workout.distance,
        duration: workout.duration,
        pace: workout.duration / workout.distance,
        speed: workout.distance / (workout.duration / 3600),
        notes: workout.notes,
        geometry,
        userId,
        labelId,
    });
};

export const deleteWorkout = async (id: number) =>
    await Workout.destroy({ where: { id } });

export const getWorkoutPreviewDb = async (
    type: WorkoutTypes,
    user: number,
    timestamp: string
) => {
    const ts = new Date(timestamp);
    const startDate = new Date(ts.getFullYear(), ts.getMonth(), ts.getDate());
    const st = new Date(startDate);
    const endDate = new Date(st.setDate(st.getDate() + 1));

    return await Workout.findAll({
        where: {
            type: type,
            userId: user,
            timestamp: {
                [Op.gte]: startDate,
                [Op.lt]: endDate,
            },
        },
        attributes: { exclude: workoutExclusionParams },
        include: labelOpts,
        nest: true,
        raw: true,
    });
};

export const getAllWorkouts = async (type: WorkoutTypes, user: number) => {
    return JSON.parse(
        JSON.stringify(
            await Workout.findAll({
                where: { type: type, userId: user },
                attributes: { exclude: workoutExclusionParams },
                include: labelOpts,
                nest: true,
            })
        )
    ) as TWorkout[];
};

export const getCurrentMonthWorkouts = async (
    type: WorkoutTypes,
    user: number
) => {
    const now = new Date();
    const result = await Workout.findAll({
        where: {
            timestamp: {
                [Op.gte]: new Date(now.getFullYear(), now.getMonth(), 1),
            },
            type: type,
            userId: user,
        },
        attributes: { exclude: workoutExclusionParams },
        include: labelOpts,

        nest: true,
    });
    return JSON.parse(JSON.stringify(result)) as TWorkout[];
};

export const getBestResult = async (type: WorkoutTypes, user: number) => {
    const queryResult = await Promise.all(
        ranges[type].map(range =>
            Workout.findAll({
                where: {
                    type: type,
                    userId: user,
                    distance: {
                        [Op.gte]: range.min,
                        [Op.lte]: range.max,
                    },
                },
                attributes: { exclude: workoutExclusionParams },
                include: labelOpts,
                nest: true,
            })
        )
    );

    const res: { [key: string]: Workout | null } = {};

    queryResult.forEach((arr, idx) => {
        const key = ranges[type][idx].key;
        res[key] = arr?.length
            ? arr.reduce((prev, current) =>
                  prev && prev?.pace < current?.pace ? prev : current
              )
            : null;
    });

    return res as BestResults;
};

const query = (sql: string, type: WorkoutTypes, user: number) =>
    sequlize.query(sql, {
        type: QueryTypes.SELECT,
        replacements: { type, user },
    });

export const getDashboard = async (type: WorkoutTypes, user: number) => {
    const [total, years, months] = await Promise.all([
        query(sqlTotalBest, type, user),
        query(sqlYears, type, user),
        query(sqlMonths, type, user),
    ]);
    return { total: total.at(0), years, months } as WorkoutsDashboard;
};

export const getUserWorkoutCount = async (user: number) =>
    await Workout.count({ where: { userId: user } });
