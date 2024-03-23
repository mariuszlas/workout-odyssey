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
    public declare userId: number;
    public declare labelId: CreationOptional<number | null>;
    public declare geolocationId: CreationOptional<number>;
}

Workout.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING },
        timestamp: { type: DataTypes.DATE },
        utcOffset: { type: DataTypes.NUMBER },
        distance: { type: DataTypes.NUMBER },
        duration: { type: DataTypes.NUMBER },
        pace: { type: DataTypes.NUMBER },
        speed: { type: DataTypes.NUMBER },
        notes: { type: DataTypes.STRING },
        userId: {
            type: DataTypes.BIGINT,
            references: { model: 'User', key: 'id' },
        },
        labelId: {
            type: DataTypes.BIGINT,
            references: { model: 'Label', key: 'id' },
            allowNull: true,
        },
        geolocationId: {
            type: DataTypes.BIGINT,
            references: { model: 'Geolocation', key: 'id' },
        },
    },
    {
        sequelize,
        tableName: 'workouts',
        underscored: true,
    }
);

export default Workout;
