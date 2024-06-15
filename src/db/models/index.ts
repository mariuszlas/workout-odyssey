import Label from './label';
import Workout from './workout';

Label.hasMany(Workout);

Workout.belongsTo(Label, { foreignKey: 'labelId', as: 'label' });

export { Label, Workout };
