import { FC } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';

import { TLabel } from '@/interfaces';
import { cn } from '@/utils/helpers';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {
    onRemoveLabel?: () => void;
    label?: TLabel;
}

const Badge: FC<BadgeProps> = ({
    className,
    variant,
    onRemoveLabel,
    label,
    children,
    ...props
}) => (
    <div
        className={cn(badgeVariants({ variant }), className)}
        style={
            label && {
                background: `${label.background}`,
                color: `${label.foreground}`,
            }
        }
        {...props}
    >
        {children}
        {label && label.value}
        {onRemoveLabel && (
            <button
                className="ml-1 rounded-sm p-0.5 opacity-70 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={onRemoveLabel}
                aria-label="remove badge"
            >
                <TrashIcon className="h-4 w-4 rounded-full" />
            </button>
        )}
    </div>
);

export { Badge, badgeVariants };
