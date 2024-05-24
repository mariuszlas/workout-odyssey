import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../connection';

class Label extends Model<
    InferAttributes<Label>,
    InferCreationAttributes<Label>
> {
    public declare readonly id: CreationOptional<string>;
    public declare color: string;
    public declare value: string;
    public declare userId: CreationOptional<string>;
}

Label.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        color: { type: DataTypes.STRING, allowNull: false },
        value: { type: DataTypes.STRING, allowNull: false },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: 'User', key: 'id' },
        },
    },
    {
        sequelize,
        tableName: 'labels',
        underscored: true,
    }
);

export default Label;
