import { Position } from 'geojson';

import { _t } from '@/constants';

import { validateType } from './helpers';

export const ROOT_TAG = 'Activity';
const ACTIVITY = 'Sport';
const LAP_TAG = 'Lap';
const TIMESTAMP = 'StartTime';
const DISTANCE_TAG = 'DistanceMeters';
const TIME_TAG = 'TotalTimeSeconds';
const POSITION_TAG = 'Position';
const LATITUDE_ATG = 'LatitudeDegrees';
const LONGITUDE_ATG = 'LongitudeDegrees';

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

export const getDuration = (
    arr: NodeListOf<Element>,
    idx: number,
    total: number
): number => {
    if (arr.length === idx) return total;

    total += parseInt(arr[idx].innerHTML);
    idx += 1;
    return getDuration(arr, idx, total);
};

export const getDistance = (distanceTags: NodeListOf<Element>): number =>
    parseFloat(distanceTags[distanceTags.length - 1]?.innerHTML) / 1000 || 0;

export const parseXML = (xmlString: string, fileName: string) => {
    const root = getRoot(xmlString);

    const activityType = root?.getAttribute(ACTIVITY)?.toLowerCase();
    const timestamp = root?.querySelector(LAP_TAG)?.getAttribute(TIMESTAMP);
    const distanceTags = root?.querySelectorAll(DISTANCE_TAG);
    const timesTags = root?.querySelectorAll(TIME_TAG);
    const positionTags = root?.querySelectorAll(POSITION_TAG);

    if (!distanceTags || !timesTags || !positionTags)
        throw new Error(_t.errorParsingFile);

    const distance = getDistance(distanceTags);
    const duration = getDuration(timesTags, 0, 0);
    const coordinates = getCoordinates(positionTags);

    const type = validateType(activityType, fileName);

    if (!type || !timestamp || !distance || !duration)
        throw new Error(_t.errorParsingFile);

    return { type, timestamp, distance, duration, coordinates };
};
