import Label from './label';
import User from './user';
import Workout from './workout';

User.hasMany(Workout, { onDelete: 'CASCADE' });
User.hasMany(Label, { onDelete: 'CASCADE' });

Label.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Label.hasMany(Workout);

Workout.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Workout.belongsTo(Label, { foreignKey: 'labelId', as: 'label' });

export { Label, User, Workout };
