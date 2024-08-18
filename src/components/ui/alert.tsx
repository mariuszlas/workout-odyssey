import { forwardRef, HTMLAttributes } from 'react';
import {
    CheckIcon,
    ExclamationTriangleIcon,
    InfoCircledIcon,
} from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/helpers';

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                info: 'bg-blue-50 border-blue-500 border-l-4 border-l-blue-500',
                error: 'bg-red-50 border-red-500 border-l-4 border-l-red-500',
                warning:
                    'bg-yellow-50 border-yellow-500 border-l-4 border-l-yellow-500',
                success:
                    'bg-green-50 border-green-500 border-l-4 border-l-green-500',
                // destructive:
                //     'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const getAlertIcon = (
    iconType: VariantProps<typeof alertVariants>['variant']
) => {
    switch (iconType) {
        case 'error':
            return <ExclamationTriangleIcon />;
        case 'warning':
            return <ExclamationTriangleIcon />;
        case 'success':
            return <CheckIcon />;
        case 'info':
            return <InfoCircledIcon className="h-5 w-5" />;
        default:
            return null;
    }
};

const Alert = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    >
        {getAlertIcon(variant)}
        {children}
    </div>
));
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            'mb-1 font-medium leading-none tracking-tight',
            className
        )}
        {...props}
    />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
    />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
