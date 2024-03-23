import type { FC, KeyboardEvent, MutableRefObject } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';

import {
    _t,
    CloseButton,
    FormLabel,
    Heading,
    Input,
    InputButton,
    MenuTransition,
} from '@/components';

import { NewWorkoutProps } from '../intrefaces';

import {
    getHours,
    getMinues,
    getSeconds,
    zeroPad,
    zeroPadDuration,
} from './helpers';

export const DurationPicker: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => {
    const { duration } = workout;
    const [s, setS] = useState(getSeconds(duration) ?? 0);
    const [m, setM] = useState(getMinues(duration) ?? 0);
    const [h, setH] = useState(getHours(duration) ?? 0);

    useEffect(() => {
        if (isNaN(h)) setH(0);
        if (isNaN(m)) setM(0);
        if (isNaN(s)) setS(0);

        setWorkout(prev => ({ ...prev, duration: s + m * 60 + h * 3600 }));
    }, [s, m, h, setWorkout]);

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        close: (
            focusableElement?:
                | HTMLElement
                | MutableRefObject<HTMLElement | null>
                | undefined
        ) => void
    ) => {
        if (e.key === 'Enter') {
            close();
            e.preventDefault();
        }
    };

    return (
        <div className="relative w-fit">
            <FormLabel text={_t.duration} />

            <Popover>
                <Popover.Button as={Fragment}>
                    <InputButton className="w-24">
                        {zeroPadDuration(duration)}
                    </InputButton>
                </Popover.Button>

                <MenuTransition>
                    <Popover.Panel className="absolute right-0 z-10 mt-2 max-w-md rounded-lg border border-base-content border-opacity-20 bg-base-100 bg-opacity-100 p-4 opacity-100 shadow-2xl focus:outline-none">
                        {({ close }) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <Heading className="text-lg font-medium">
                                        {_t.durationFormHeader}
                                    </Heading>

                                    <CloseButton onClick={() => close()} />
                                </div>

                                <hr className="my-2 border-t border-t-base-content border-opacity-20 " />

                                <div className="flex gap-4">
                                    <div className="w-fit">
                                        <FormLabel text={_t.labelHours} />
                                        <Input
                                            placeholder={_t.plcdHours}
                                            value={zeroPad(getHours(duration))}
                                            onChange={e =>
                                                setH(Number(e.target.value))
                                            }
                                            className="w-20"
                                            onKeyDown={e =>
                                                handleKeyDown(e, close)
                                            }
                                        />
                                    </div>

                                    <div className="w-fit">
                                        <FormLabel text={_t.labelMinutes} />
                                        <Input
                                            placeholder={_t.plcdMinutes}
                                            value={zeroPad(getMinues(duration))}
                                            onChange={e =>
                                                setM(Number(e.target.value))
                                            }
                                            className="w-20"
                                            onKeyDown={e =>
                                                handleKeyDown(e, close)
                                            }
                                        />
                                    </div>

                                    <div className="w-fit">
                                        <FormLabel text={_t.labelSeconds} />
                                        <Input
                                            placeholder={_t.plcdSeconds}
                                            value={zeroPad(
                                                getSeconds(duration)
                                            )}
                                            onChange={e =>
                                                setS(Number(e.target.value))
                                            }
                                            className="w-20"
                                            onKeyDown={e =>
                                                handleKeyDown(e, close)
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </Popover.Panel>
                </MenuTransition>
            </Popover>
        </div>
    );
};
