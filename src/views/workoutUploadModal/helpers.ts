import { _t } from '@/constants';
import type { NewWorkout, UploadWorkout, Workout } from '@/interfaces';
import { WorkoutTypes } from '@/interfaces';
import dayjs from '@/utils/extended-dayjs';
import { isValidWorkoutType } from '@/utils/helpers';

import { formatDuration, getDateTimeTZ } from '../helpers';

export const formatAndValidateData = (
    workout: NewWorkout,
    id?: number
): UploadWorkout => {
    if (!workout.duration) throw new Error(_t.errorDataInput);

    let distance = workout.distance;
    if (typeof distance === 'string') distance = parseFloat(distance);

    if (distance < 0.5) throw new Error(_t.errorMinDistance);

    const type = workout.type;
    if (!isValidWorkoutType(type)) {
        throw new Error(_t.errorDataInput);
    }

    return {
        ...(id && { id }),
        type,
        distance,
        timestamp: workout.timestamp,
        timezone: workout.timezone,
        duration: workout.duration,
        label: workout.label,
        notes: workout.notes,
        geolocation: workout.coordinates?.length ? workout.coordinates : null,
    };
};

export const formatPreviewMessage = (
    existingData: Workout[] | undefined,
    workout: UploadWorkout
) => {
    const dataRecords = existingData?.length || 'no';
    const isSingular = dataRecords === 1;
    const date = getDateTimeTZ(workout.timestamp, workout.timezone, false);

    return `${isSingular ? _t.previewMsgIs : _t.previewMsgAre} ${dataRecords} ${
        isSingular ? _t.previewMsgRecord : _t.previewMsgRecordPlural
    } for ${workout.type} ${_t.previewMsgOn} ${date}`;
};

export const formatPreviewItem = (workout: UploadWorkout | Workout) =>
    `${_t.distance}: ${workout.distance.toFixed(1)} ${_t.km}, ${
        _t.duration
    }: ${formatDuration(workout.duration)}`;

export const defaultNewWorkout = {
    type: WorkoutTypes.RUNNING,
    timestamp: '',
    timezone: dayjs.tz.guess(),
    distance: 0,
    duration: 0,
    coordinates: [],
    label: null,
    notes: null,
};
