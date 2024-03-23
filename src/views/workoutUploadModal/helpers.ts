import { _t } from '@/constants';
import type { NewWorkout, TLabel, UploadWorkout, Workout } from '@/interfaces';
import { WorkoutTypes } from '@/interfaces';

import { getDateTimeTZ, getDuration } from '../helpers';

export const getTypeFromFilename = (fileName: string | undefined) => {
    if (!fileName) throw new Error(_t.errorParsingFile);

    if (/Walk/.test(fileName)) return WorkoutTypes.WALKING;
    throw new Error(_t.errorInvActivType);
};

export const validateType = (
    sportType: string | undefined,
    fileName?: string
) => {
    if (!sportType) throw new Error(_t.errorParsingFile);
    const allTypes = Object.values(WorkoutTypes);

    if (allTypes.includes(sportType as WorkoutTypes)) {
        return sportType as WorkoutTypes;
    }
    return getTypeFromFilename(fileName);
};

export const formatAndValidateData2 = (
    activity_type: string,
    timestamp: string,
    utcOffset: number,
    distance: string | number,
    duration: number | undefined,
    label: TLabel | null,
    notes: string | null,
    coordinates: number[][],
    id: number | undefined
): UploadWorkout => {
    if (!duration) throw new Error(_t.errorDataInput);

    if (typeof distance === 'string') distance = parseFloat(distance);

    if (distance < 0.5) throw new Error(_t.errorMinDistance);

    const type = validateType(activity_type);

    return {
        ...(id && { id }),
        type,
        distance,
        timestamp,
        duration,
        label: label,
        notes: notes,
        geolocation: coordinates?.length ? coordinates : null,
        utcOffset: utcOffset,
    };
};

export const formatAndValidateData = (
    workout: NewWorkout,
    id?: number
): UploadWorkout => {
    if (!workout.duration) throw new Error(_t.errorDataInput);

    let distance = workout.distance;
    if (typeof distance === 'string') distance = parseFloat(distance);

    if (distance < 0.5) throw new Error(_t.errorMinDistance);

    const type = validateType(workout.type);

    return {
        ...(id && { id }),
        type,
        distance,
        timestamp: workout.timestamp,
        duration: workout.duration,
        label: workout.label,
        notes: workout.notes,
        geolocation: workout.coordinates?.length ? workout.coordinates : null,
        utcOffset: workout.utcOffset,
    };
};

export const formatPreviewMessage = (
    existingData: Workout[] | undefined,
    workout: UploadWorkout
) => {
    const dataRecords = existingData?.length || 'no';
    const isSingular = dataRecords === 1;
    const date = getDateTimeTZ(workout.timestamp, workout.utcOffset);

    return `${isSingular ? _t.previewMsgIs : _t.previewMsgAre} ${dataRecords} ${
        isSingular ? _t.previewMsgRecord : _t.previewMsgRecordPlural
    } for ${workout.type} ${_t.previewMsgOn} ${date}`;
};

export const formatPreviewItem = (workout: UploadWorkout | Workout) =>
    `${_t.distance}: ${workout.distance.toFixed(1)} ${_t.km}, ${
        _t.duration
    }: ${getDuration(Number(workout.duration))}`;
