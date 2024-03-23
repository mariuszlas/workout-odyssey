import { WorkoutTypes } from '@/interfaces';

const key = {
    oneK: 'one_k',
    fiveK: 'five_k',
    tenK: 'ten_k',
    hMarathon: 'half_marathon',
    marathon: 'marathon',
    thirtyK: 'thirty_k',
    fiftyK: 'fifty_k',
    hundredK: 'hundred_k',
    hundredFiftyK: 'hundred_fifty_k',
    twoHundredK: 'two_hundred_k',
};

export const ranges = {
    [WorkoutTypes.RUNNING]: [
        { key: key.oneK, min: 0.9, max: 1.1 },
        { key: key.fiveK, min: 4.9, max: 5.1 },
        { key: key.tenK, min: 9.9, max: 10.1 },
        { key: key.hMarathon, min: 21.0, max: 21.4 },
        { key: key.marathon, min: 42.0, max: 42.5 },
    ],
    [WorkoutTypes.WALKING]: [
        { key: key.tenK, min: 9.0, max: 11.0 },
        { key: key.thirtyK, min: 28.0, max: 32.0 },
        { key: key.fiftyK, min: 48.0, max: 52.0 },
    ],
    [WorkoutTypes.CYCLING]: [
        { key: key.thirtyK, min: 28.0, max: 32.0 },
        { key: key.fiftyK, min: 48.0, max: 52.0 },
        { key: key.hundredK, min: 97.0, max: 103.0 },
        { key: key.hundredFiftyK, min: 147.0, max: 153.0 },
        { key: key.twoHundredK, min: 196.0, max: 204.0 },
    ],
};
