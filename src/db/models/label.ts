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
    public declare value: string;
    public declare foreground: string;
    public declare background: string;
    public declare userId: CreationOptional<string>;
}

Label.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        value: { type: DataTypes.STRING, allowNull: false },
        foreground: { type: DataTypes.STRING, allowNull: false },
        background: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        tableName: 'labels',
        underscored: true,
    }
);

export default Label;
