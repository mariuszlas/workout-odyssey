import { type FC, useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';

import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollArea,
} from '@/components';
import { useIsBreakpoint } from '@/hooks';
import { cn } from '@/utils/helpers';

import { WorkoutForm } from '../intrefaces';

export const TimezoneSelector: FC<WorkoutForm> = ({ workout, setWorkouts }) => {
    const isMobile = useIsBreakpoint('sm');
    const [open, setOpen] = useState(false);

    const timezones = Intl.supportedValuesOf('timeZone').map(tz => ({
        value: tz,
        label: tz,
    }));

    const onTimezoneSelect = (tz: string) => {
        setWorkouts(prev =>
            prev.map(wk =>
                wk.id === workout.id ? { ...wk, timezone: tz } : wk
            )
        );
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <div className="flex flex-col gap-1">
                <Label htmlFor="timezone">Timezone</Label>
                <PopoverTrigger
                    asChild
                    className="min-w-64 justify-start text-left font-normal"
                >
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        id="timezone"
                    >
                        {workout.timezone}
                    </Button>
                </PopoverTrigger>
            </div>

            <PopoverContent>
                <Command>
                    <ScrollArea>
                        <CommandInput placeholder="Search timezones..." />
                        <CommandList className={cn(isMobile && 'max-h-32')}>
                            <CommandEmpty>No timezone found.</CommandEmpty>
                            <CommandGroup>
                                {timezones.map(tz => (
                                    <CommandItem
                                        key={tz.value}
                                        value={tz.value}
                                        onSelect={onTimezoneSelect}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                workout.timezone === tz.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {tz.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
