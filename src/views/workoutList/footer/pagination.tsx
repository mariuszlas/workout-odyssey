import type { FC } from 'react';

import {
    Button,
    ChevronLeftIcon,
    ChevronRightIcon,
    IconButton,
    Text,
} from '@/components';
import { cn } from '@/utils/helpers';

export interface PageProps {
    pageNo: number;
    setPageNo: (pageNo: number) => void;
}

interface OwnProps {
    totalPages: number | undefined;
    t: { nextPage: string; previousPage: string };
}

export const Pagination: FC<OwnProps & PageProps> = ({
    pageNo,
    setPageNo,
    totalPages,
    t,
}) => {
    if (!totalPages || totalPages === 1) {
        return null;
    }

    const Empty = () => <Text className="p-1" value="..." />;

    const renderButtons = (totalPages: number) =>
        [...Array(totalPages).keys()].map(num => (
            <Button
                className={cn('btn-primary h-8 w-8 ', {
                    'btn-outline': num + 1 !== pageNo,
                })}
                key={num}
                onClick={() => setPageNo(num + 1)}
            >
                {num + 1}
            </Button>
        ));

    return (
        <footer className="flex w-full flex-wrap justify-center pt-2 sm:pb-0">
            <div className="flex flex-wrap gap-2">
                {totalPages <= 7 ? (
                    renderButtons(totalPages)
                ) : (
                    <>
                        <IconButton
                            aria-label={t.previousPage}
                            className="btn-outline btn-primary h-8 w-8"
                            onClick={() =>
                                setPageNo(pageNo === 1 ? 1 : pageNo - 1)
                            }
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        {pageNo <= 4 && (
                            <>
                                {renderButtons(5)}
                                <Empty />
                            </>
                        )}

                        {pageNo > 4 && pageNo <= totalPages - 4 && (
                            <>
                                <Button
                                    className="btn-primary h-8 w-8"
                                    onClick={() => setPageNo(1)}
                                >
                                    {1}
                                </Button>
                                <Empty />

                                <Button
                                    className="btn-outline btn-primary h-8 w-8"
                                    onClick={() => setPageNo(pageNo - 1)}
                                >
                                    {pageNo - 1}
                                </Button>
                                <Button
                                    className="btn-primary h-8 w-8"
                                    onClick={() => setPageNo(pageNo)}
                                >
                                    {pageNo}
                                </Button>
                                <Button
                                    className="btn-outline btn-primary h-8 w-8"
                                    onClick={() => setPageNo(pageNo + 1)}
                                >
                                    {pageNo + 1}
                                </Button>

                                <Empty />
                                <Button
                                    className={cn('btn-primary h-8 w-8', {
                                        'btn-outline': totalPages !== pageNo,
                                    })}
                                    onClick={() => setPageNo(totalPages)}
                                >
                                    {totalPages}
                                </Button>
                            </>
                        )}

                        {pageNo > totalPages - 4 && (
                            <>
                                <Empty />
                                {renderButtons(totalPages).slice(
                                    totalPages - 5
                                )}
                            </>
                        )}

                        <IconButton
                            aria-label={t.nextPage}
                            className="btn-outline btn-primary h-8 w-8"
                            onClick={() =>
                                setPageNo(
                                    pageNo === totalPages
                                        ? totalPages
                                        : pageNo + 1
                                )
                            }
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </footer>
    );
};
