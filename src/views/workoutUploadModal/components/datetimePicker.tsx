import { type FC, useEffect } from 'react';

import {
    Button,
    Calendar,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components';
import { cn, getDateTimeTZ } from '@/utils/helpers';

import { WorkoutForm } from '../intrefaces';

import { zeroPad } from './helpers';

export const DatetimePicker: FC<WorkoutForm> = ({ workout, setWorkouts }) => {
    const { timestamp } = workout;
    const date = timestamp ? new Date(timestamp) : new Date();

    const setTimestamp = (date: Date | undefined) => {
        if (!date) return;

        setWorkouts(prev =>
            prev.map(wk =>
                wk.id === workout.id
                    ? { ...wk, timestamp: date.toISOString() }
                    : wk
            )
        );
    };

    const getTimeFromDate = (type: 'h' | 'min') => {
        const idx = type === 'h' ? 0 : 1;
        const value = date.toLocaleTimeString().split(':')[idx];
        return value.startsWith('0') ? value.substring(1) : value;
    };

    const renderNumberOptions = (n: number) =>
        [...Array(n).keys()].map((n, idx) => (
            <SelectItem value={n.toString()} key={idx}>
                {zeroPad(n)}
            </SelectItem>
        ));

    const onSelect = (value: string, type: 'h' | 'min') => {
        const newDate = new Date(date);
        type === 'h'
            ? newDate.setHours(Number(value))
            : newDate.setMinutes(Number(value));
        setTimestamp(newDate);
    };

    useEffect(() => {
        if (!timestamp) {
            setTimestamp(date);
        }
    }, []);

    return (
        <Popover>
            <div className="flex flex-col gap-1">
                <Label htmlFor="dateTimeTrigger">Date and Time</Label>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'w-40 justify-start text-left font-normal'
                        )}
                        id="dateTimeTrigger"
                    >
                        {getDateTimeTZ(date, workout?.timezone, false)}
                    </Button>
                </PopoverTrigger>
            </div>

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setTimestamp}
                    className="border"
                />

                <div className="flex items-center justify-center gap-2 p-3">
                    <Label>Time</Label>
                    <div className="flex items-center gap-1">
                        <Select
                            value={getTimeFromDate('h')}
                            onValueChange={value => onSelect(value, 'h')}
                        >
                            <SelectTrigger className="w-16">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {renderNumberOptions(24)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Label>:</Label>
                        <Select
                            value={getTimeFromDate('min')}
                            onValueChange={value => onSelect(value, 'min')}
                        >
                            <SelectTrigger className="w-16">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {renderNumberOptions(60)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
