import { LineString } from 'geojson';
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { WorkoutTypes } from '@/interfaces';

import sequelize from '../connection';

class Workout extends Model<
    InferAttributes<Workout>,
    InferCreationAttributes<Workout>
> {
    public declare readonly id: CreationOptional<number>;
    public declare type: WorkoutTypes;
    public declare timestamp: Date;
    public declare utcOffset: number;
    public declare distance: number;
    public declare duration: number;
    public declare pace: number;
    public declare speed: number;
    public declare notes: string | null;
    public declare geometry: CreationOptional<LineString | null>;
    public declare userId: number;
    public declare labelId: CreationOptional<number | null>;
}

Workout.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING, allowNull: false },
        timestamp: { type: DataTypes.DATE, allowNull: false },
        utcOffset: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        distance: { type: DataTypes.FLOAT, allowNull: false },
        duration: { type: DataTypes.FLOAT, allowNull: false },
        pace: { type: DataTypes.FLOAT, allowNull: false },
        speed: { type: DataTypes.FLOAT, allowNull: false },
        notes: { type: DataTypes.STRING },
        geometry: { type: DataTypes.GEOMETRY('LINESTRING'), allowNull: true },
        userId: {
            type: DataTypes.BIGINT,
            references: { model: 'User', key: 'id' },
        },
        labelId: {
            type: DataTypes.BIGINT,
            references: { model: 'Label', key: 'id' },
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'workouts',
        underscored: true,
    }
);

export default Workout;
