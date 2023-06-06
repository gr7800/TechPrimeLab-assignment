import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const Paginations = ({ handlePrevious, handleNext, page, pageCount, setPage }) => {
    const renderPageButtons = () => {
        const buttons = [];

        // First Page Button
        buttons.push(
            <Button
                key={1}
                onClick={() => setPage(1)}
                isActive={page === 1}
                colorScheme="teal"
                variant="outline"
                ml={2}
                borderRadius={'50%'}
                border={page===1?"1px solid aqua":"none"}
            >
                1
            </Button>
        );

        // Left Ellipsis Button
        if (page > 3) {
            buttons.push(
                <Button
                    key="left-ellipsis"
                    isDisabled
                    colorScheme="teal"
                    variant="outline"
                    ml={2}
                    borderRadius={'50%'}
                    border={"none"}
                >
                    ...
                </Button>
            );
        }

        // Middle Page Buttons
        for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) {
            buttons.push(
                <Button
                    key={i}
                    onClick={() => setPage(i)}
                    isActive={page === i}
                    colorScheme="teal"
                    variant="outline"
                    ml={2}
                    borderRadius={'50%'}
                    border={page===i?"1px solid aqua":"none"}
                >
                    {i}
                </Button>
            );
        }

        // Right Ellipsis Button
        if (page < pageCount - 2) {
            buttons.push(
                <Button
                    key="right-ellipsis"
                    isDisabled
                    colorScheme="teal"
                    variant="outline"
                    ml={2}
                    borderRadius={'50%'}
                    border={"none"}
                >
                    .....
                </Button>
            );
        }

        // Last Page Button
        if (pageCount > 1) {
            buttons.push(
                <Button
                    key={pageCount}
                    onClick={() => setPage(pageCount)}
                    isActive={page === pageCount}
                    colorScheme="teal"
                    variant="outline"
                    ml={2}
                    borderRadius={'50%'}
                    border={page===pageCount?"1px solid aqua":"none"}
                >
                    {pageCount}
                </Button>
            );
        }
        return buttons;
    };

    return (
        <Box margin={'auto'}>
            {pageCount > 0 && (
                <Box className="pagination_div d-flex justify-content-end mx-5">
                    <Button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        colorScheme="teal"
                        variant="outline"
                        border={'none'}
                        cursor={'pointer'}
                    >
                        {'<< <'}
                    </Button>
                    {renderPageButtons()}
                    <Button
                        onClick={handleNext}
                        disabled={page === pageCount}
                        colorScheme="teal"
                        variant="outline"
                        ml={2}
                        border={'none'}
                        cursor={'pointer'}
                    >
                        {'> >>'}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Paginations;
