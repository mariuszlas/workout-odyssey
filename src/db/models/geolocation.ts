import { LineString } from 'geojson';
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../connection';

class Geolocation extends Model<
    InferAttributes<Geolocation>,
    InferCreationAttributes<Geolocation>
> {
    public declare readonly id: CreationOptional<number>;
    public declare geometry: LineString;
}

Geolocation.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        geometry: { type: DataTypes.GEOMETRY, allowNull: false },
    },
    {
        sequelize,
        tableName: 'geolocation',
        underscored: true,
    }
);

export default Geolocation;
