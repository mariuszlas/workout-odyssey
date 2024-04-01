import { FC, HTMLAttributes, ReactNode } from 'react';

import { Heading, Skeleton, Text } from '@/components';
import { Children } from '@/interfaces';
import { cn } from '@/utils/helpers';

interface FooterProps extends Children {
    info?: string;
}

export const Footer: FC<FooterProps> = ({ info, children }) => (
    <footer
        className={cn(
            'flex items-center rounded-b-md bg-base-200 px-4 py-2 sm:px-6',
            info ? 'justify-between' : 'justify-end'
        )}
    >
        {info && <Text value={info} />}
        {children}
    </footer>
);

interface BodyProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

export const Body: FC<BodyProps> = ({ title, description, children }) => (
    <div className="p-4 sm:p-6">
        <Heading as="h3" className="text-lg" value={title} />
        {description && <Text as="p" className="my-3" value={description} />}
        {children}
    </div>
);

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    danger?: boolean;
    isLoading?: boolean;
    loadingClass?: string;
}

export const Container: FC<ContainerProps> = ({
    danger,
    children,
    className,
    isLoading,
    loadingClass = 'h-56',
    ...props
}) => (
    <>
        {isLoading ? (
            <Skeleton className={loadingClass} />
        ) : (
            <div
                className={cn(
                    'scroll-mt-20 rounded-md border-opacity-20 bg-base-100 sm:shadow-lg',
                    danger
                        ? 'border-2 border-error'
                        : 'border border-base-content',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )}
    </>
);
