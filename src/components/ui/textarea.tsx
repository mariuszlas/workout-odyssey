import { forwardRef, TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/helpers';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => (
        <textarea
            className={cn(
                'flex min-h-[80px] w-full rounded-md border border-input bg-inherit px-3 py-2 text-sm placeholder:text-muted-foreground hover:border-inputHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            ref={ref}
            {...props}
        />
    )
);
Textarea.displayName = 'Textarea';

export { Textarea };
