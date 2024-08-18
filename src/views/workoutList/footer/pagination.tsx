import type { FC } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { Button, TextS } from '@/components';

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

    const Ellipsis = () => <TextS className="p-1" value="..." />;

    const renderButtons = (totalPages: number) =>
        [...Array(totalPages).keys()].map(num => (
            <Button
                size="xs"
                variant={num + 1 !== pageNo ? 'outline' : 'default'}
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
                        <Button
                            aria-label={t.previousPage}
                            size="xs"
                            variant="outline"
                            onClick={() =>
                                setPageNo(pageNo === 1 ? 1 : pageNo - 1)
                            }
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </Button>

                        {pageNo <= 4 && (
                            <>
                                {renderButtons(5)}
                                <Ellipsis />
                            </>
                        )}

                        {pageNo > 4 && pageNo <= totalPages - 4 && (
                            <>
                                <Button
                                    size="xs"
                                    variant="outline"
                                    onClick={() => setPageNo(1)}
                                >
                                    {1}
                                </Button>
                                <Ellipsis />

                                <Button
                                    variant="outline"
                                    size="xs"
                                    onClick={() => setPageNo(pageNo - 1)}
                                >
                                    {pageNo - 1}
                                </Button>
                                <Button
                                    size="xs"
                                    onClick={() => setPageNo(pageNo)}
                                >
                                    {pageNo}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xs"
                                    onClick={() => setPageNo(pageNo + 1)}
                                >
                                    {pageNo + 1}
                                </Button>

                                <Ellipsis />
                                <Button
                                    size="xs"
                                    variant={
                                        totalPages !== pageNo
                                            ? 'outline'
                                            : 'default'
                                    }
                                    onClick={() => setPageNo(totalPages)}
                                >
                                    {totalPages}
                                </Button>
                            </>
                        )}

                        {pageNo > totalPages - 4 && (
                            <>
                                <Ellipsis />
                                {renderButtons(totalPages).slice(
                                    totalPages - 5
                                )}
                            </>
                        )}

                        <Button
                            aria-label={t.nextPage}
                            size="xs"
                            variant="outline"
                            onClick={() =>
                                setPageNo(
                                    pageNo === totalPages
                                        ? totalPages
                                        : pageNo + 1
                                )
                            }
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </Button>
                    </>
                )}
            </div>
        </footer>
    );
};
