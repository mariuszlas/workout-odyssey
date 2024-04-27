import { Position } from 'geojson';

import { WorkoutTypes } from '@/interfaces';
import { isValidWorkoutType } from '@/utils/helpers';

export const ROOT_TAG = 'Activity';
const ACTIVITY = 'Sport';
const LAP_TAG = 'Lap';
const TIMESTAMP = 'StartTime';
const DISTANCE_TAG = 'DistanceMeters';
const TIME_TAG = 'TotalTimeSeconds';
const POSITION_TAG = 'Position';
const LATITUDE_ATG = 'LatitudeDegrees';
const LONGITUDE_ATG = 'LongitudeDegrees';

export class FileSizeError extends Error {
    constructor() {
        super('File size limit exceeded');
    }
}

class InvalidActivityError extends Error {
    constructor() {
        super('Invalid activity type');
    }
}

class GenericError extends Error {
    constructor() {
        super('Could not parse the file');
    }
}

export const readFileAsync = (file: File) => {
    return new Promise<FileReader['result']>((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            reject(new Error());
        };
        fileReader.onabort = () => {
            reject(new Error());
        };

        fileReader.readAsText(file);
    });
};

export const readFilesAsync = (files: File[]) => {
    return Promise.all(
        files.map(async file => {
            const xmlString = await readFileAsync(file);

            if (typeof xmlString !== 'string') throw new Error('Not an XML');

            return parseXML(xmlString, file.name);
        })
    );
};

export const getRoot = (xmlString: string) => {
    const document = new DOMParser().parseFromString(xmlString, 'text/xml');
    return document.querySelector(ROOT_TAG);
};

const getCoordinates = (positionTags: NodeListOf<Element>): Position[] => {
    const coordinates: Position[] = [];

    positionTags.forEach(positionTag => {
        const lat = positionTag.querySelector(LATITUDE_ATG)?.innerHTML;
        const lng = positionTag.querySelector(LONGITUDE_ATG)?.innerHTML;

        if (lat && lng) {
            coordinates.push([parseFloat(lng), parseFloat(lat)]);
        }
    });
    return coordinates;
};

export const formatDurationXML = (
    arr: NodeListOf<Element>,
    idx: number,
    total: number
): number => {
    if (arr.length === idx) return total;

    total += parseInt(arr[idx].innerHTML);
    idx += 1;
    return formatDurationXML(arr, idx, total);
};

export const getDistance = (distanceTags: NodeListOf<Element>): number =>
    parseFloat(distanceTags[distanceTags.length - 1]?.innerHTML) / 1000 || 0;

const getTypeFromFilename = (fileName: string | undefined) => {
    if (!fileName) throw new GenericError();

    if (/Walk/.test(fileName)) return WorkoutTypes.WALKING;
    throw new InvalidActivityError();
};

export const parseXML = (xmlString: string, fileName: string) => {
    const root = getRoot(xmlString);

    const activityType = root?.getAttribute(ACTIVITY)?.toLowerCase();
    const timestamp = root?.querySelector(LAP_TAG)?.getAttribute(TIMESTAMP);
    const distanceTags = root?.querySelectorAll(DISTANCE_TAG);
    const timesTags = root?.querySelectorAll(TIME_TAG);
    const positionTags = root?.querySelectorAll(POSITION_TAG);

    if (!distanceTags || !timesTags || !positionTags) throw new GenericError();

    const distance = getDistance(distanceTags);
    const duration = formatDurationXML(timesTags, 0, 0);
    const coordinates = getCoordinates(positionTags);

    const type = isValidWorkoutType(activityType)
        ? activityType
        : getTypeFromFilename(fileName);

    if (!isValidWorkoutType(type) || !timestamp || !distance || !duration)
        throw new GenericError();

    return { type, timestamp, distance, duration, coordinates };
};
