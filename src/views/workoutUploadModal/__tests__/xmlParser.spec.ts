import { describe, expect, it } from 'vitest';

import {
    getDistance,
    getDuration,
    getRoot,
    readFileAsync,
    ROOT_TAG,
} from '../xmlParser';

const xmlString = `
    <workout>
        <Activity>
        <distance>12345</distance>
        <coordinates>
            <latitude>12.345</latitude>
            <longitude>45.678</longitude>
        </coordinates>
        </Activity>
    </workout>
`;

describe('readFileAsync', () => {
    it('should return the file content as a string', async () => {
        const fileContent = 'This is some file content.';
        const file = new File([fileContent], 'test.txt');
        const actual = await readFileAsync(file);

        expect(actual).toEqual(fileContent);
    });
});

describe('getRoot', () => {
    it('should return the root element if the input is valid XML', () => {
        const actual = getRoot(xmlString);

        expect(actual).toBeDefined();
        expect(actual?.tagName).toEqual(ROOT_TAG);
    });
});

describe('getDuration', () => {
    it('should return the total duration of all elements in the array', () => {
        const arr = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
        ] as unknown as NodeListOf<Element>;
        arr[0].innerHTML = '10';
        arr[1].innerHTML = '20';
        arr[2].innerHTML = '30';

        const actual = getDuration(arr, 0, 0);

        expect(actual).toEqual(60);
    });

    it('should return 0 if the array is empty', () => {
        const arr = [] as unknown as NodeListOf<Element>;
        const actual = getDuration(arr, 0, 0);

        expect(actual).toEqual(0);
    });
});

describe('getDistance', () => {
    it('should return 0 if there are no distance tags', () => {
        const distanceTags = [] as unknown as NodeListOf<Element>;
        const actual = getDistance(distanceTags);

        expect(actual).toEqual(0);
    });

    it('should return the distance in kilometers if there are distance tags', () => {
        const distanceTags = [
            document.createElement('div'),
            document.createElement('div'),
        ] as unknown as NodeListOf<Element>;

        distanceTags[1].innerHTML = '12345';
        const actual = getDistance(distanceTags);

        expect(actual).toEqual(12.345);
    });

    it('should return 0 if tags do not have distance value', () => {
        const distanceTags = [
            document.createElement('div'),
        ] as unknown as NodeListOf<Element>;

        const actual = getDistance(distanceTags);

        expect(actual).toEqual(0);
    });
});
