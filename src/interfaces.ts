import { ReactNode } from 'react';
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

export type Dashboarad = { dashboard?: WorkoutsDashboard };

export type Loading = { isLoading?: boolean };
