import { ReactNode } from 'react';
import type { Feature, LineString, Position } from 'geojson';

export enum WorkoutTypes {
    RUNNING = 'running',
    WALKING = 'walking',
    CYCLING = 'cycling',
}

interface BaseWorkout {
    timestamp: string;
    distance: number;
    duration: number;
    type: WorkoutTypes;
    label: TLabel | null;
    notes: string | null;
    utcOffset: number;
}

export interface Workout extends BaseWorkout {
    id: number;
    pace: number;
    speed: number;
    hasTrajectory: boolean;
    trajectory: Trajectory | null;
}

export interface UploadWorkout extends BaseWorkout {
    geolocation: number[][] | null;
    id?: number | undefined;
}

export interface NewWorkout extends BaseWorkout {
    coordinates: Position[];
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

export interface WorkoutPreview {
    data: UploadWorkout;
    foundData: Workout[];
}

export interface User {
    username: string;
    email: string;
    lastLogin: string;
    loginCount: number;
    totalNoOfWorkouts: number;
}

export interface UserData extends User {
    name: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    emailVerified: boolean;
    isDemo: boolean;
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
    SESSION = 'session',
    REFRESH_SESSION = 'refreshSession',
    THEME = 'theme',
}

export interface ToggleState {
    acceptNewUsers?: boolean;
}
