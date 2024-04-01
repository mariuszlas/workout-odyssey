import type { FC, LabelHTMLAttributes } from 'react';

import { cn } from '@/utils/helpers';

import { Text } from '..';

type HTMLLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

interface FormLabelProps extends HTMLLabelProps {
    text: string;
    isRequired?: boolean;
}

export const FormLabel: FC<FormLabelProps> = ({
    text,
    htmlFor,
    isRequired,
}) => (
    <label className="label" htmlFor={htmlFor}>
        <Text
            value={text}
            className={cn('label-text text-base', {
                "after:ml-0.5 after:text-red-500 after:content-['*']":
                    isRequired,
            })}
        />
    </label>
);
