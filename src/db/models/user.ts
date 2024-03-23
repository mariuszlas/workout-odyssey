import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../connection';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    public declare readonly id: CreationOptional<number>;
    public declare username: string;
    public declare email: string;
    public declare name: string;
    public declare isDemo: boolean;
    public declare lastLogin: CreationOptional<Date>;
    public declare loginCount: CreationOptional<number>;

    public reportLoginDate(): void {
        this.lastLogin = new Date();
    }
}

User.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        isDemo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        lastLogin: { type: DataTypes.DATE, allowNull: true },
        loginCount: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'users',
        underscored: true,
    }
);

export default User;
