import Geolocation from './geolocation';
import Label from './label';
import User from './user';
import Workout from './workout';

// User.hasMany(Label, { onDelete: 'cascade' });
// User.hasMany(Workout, { onDelete: 'cascade' });

Label.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'cascade',
});

Workout.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'cascade',
});

Workout.belongsTo(Label, { foreignKey: 'labelId', as: 'label' });

Workout.belongsTo(Geolocation, {
    foreignKey: 'geolocationId',
    as: 'trajectory',
    onDelete: 'cascade',
});

export { Geolocation, Label, User, Workout };
