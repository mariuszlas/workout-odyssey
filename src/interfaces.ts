import { ReactNode } from 'react';
import { AttributeType } from '@aws-sdk/client-cognito-identity-provider';
import type { Feature, LineString, Position } from 'geojson';

export enum WorkoutTypes {
    RUNNING = 'running',
    WALKING = 'walking',
    CYCLING = 'cycling',
}

interface BaseWorkout {
    timestamp: string;
    timezone: string;
    dateOnly?: boolean;
    distance: number;
    duration: number;
    type: WorkoutTypes;
    label: TLabel | null;
    notes: string | null;
}

export interface Workout extends BaseWorkout {
    id: string;
    pace: number;
    speed: number;
    geometry: LineString | null;
}

export interface UploadWorkout extends BaseWorkout {
    geolocation: number[][] | null;
    id?: string | undefined;
}

export interface NewWorkout extends BaseWorkout {
    id?: string;
    coordinates?: Position[];
    file?: File;
}

export interface PagedWorkoutList {
    content: Workout[];
    last: boolean;
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

export type Trajectory = Feature<LineString, null>;

export interface TLabel {
    value: string;
    color: string;
}

export interface TotalStats {
    counts: number;
    distance: number;
    duration: number;
    pace: number;
    speed: number;
}

export interface YearStats extends TotalStats {
    year: number;
}

export interface MonthStats extends YearStats {
    month: number;
}

export interface WorkoutsDashboard {
    total: TotalStats;
    months: MonthStats[];
    years: YearStats[];
}

export interface BestMonths {
    [key: string]: MonthStats;
}

export interface BestResults {
    [key: string]: Workout | null;
}

export type WorkoutPreview = {
    data: UploadWorkout;
    foundData: Workout[];
}[];

export interface User {
    username: string;
    lastLogin: Date;
    loginCount: number;
    totalNoOfWorkouts: number;
}

export interface UserData extends User {
    id: string;
    name: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    isDemo: boolean;
    cognitoAttributes: AttributeType[] | undefined;
}

export interface HeaderData {
    year: number;
    secStats: number;
}

export type StatIconType = 'road' | 'clockCircle' | 'speedometer' | 'counter';

export interface Children {
    children: ReactNode;
}

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum Cookie {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_SESSION = 'refreshSession',
    THEME = 'theme',
}

export interface ToggleState {
    acceptNewUsers?: boolean;
}

export interface Units {
    km: string;
    kmh: string;
    h: string;
    min: string;
}

export type LocaleParam = { params: { locale: string } };

export type Dashboarad = { dashboard?: WorkoutsDashboard };

export type Loading = { isLoading?: boolean };
