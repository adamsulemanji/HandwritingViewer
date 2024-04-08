import React from 'react';
import { Image, Box, Button, Text, useColorModeValue } from '@chakra-ui/react';

function HandwritingViewer({ imageUrl, caption, goToPreviousLetter, goToNextLetter }) {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    
    return (
        <Box
            boxShadow="base"
            p="5"
            bg={bgColor}
            color={textColor}
            borderRadius="lg"
            m="4"
            textAlign="center"
        >
            <Box className="m-10 p-10 border-2 border-gray-300 rounded-xl">
                <Image src={imageUrl} alt="Handwriting" />
            </Box>
            <Text mb="4">{caption}</Text>
            <div className="m-4 flex justify-center">
                <div className="flex justify-center">
                    <Button className="mr-8 px-4 py-2 bg-teal-200 text-white rounded-md hover:bg-teal-400" onClick={goToPreviousLetter}>
                        Previous
                    </Button>
                    <Button className="ml-8 px-4 py-2 bg-teal-200 text-white rounded-md hover:bg-teal-400" onClick={goToNextLetter}>
                        Next
                    </Button>
                </div>
            </div>
        </Box>
    );
}

export default HandwritingViewer;
