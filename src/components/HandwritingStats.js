import React from 'react';
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

function HandwritingStats({ data }) {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    
    if (data.length === 0) {
        return <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
            <Text>No data available</Text>
        </Box>;
    }
    
    const object = data[0];
    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
            <Heading fontSize="xl" mb={4}>Handwriting Stats</Heading>
            <VStack align="start" spacing={3}>
                <Text>Number of strokes: <strong>{object.number_of_strokes}</strong></Text>
                <Text>Time taken: <strong>{object.time_taken}</strong></Text>
                <Text>Teacher: <strong>{object.teacher}</strong></Text>
                <Text>Date: <strong>{object.date}</strong></Text>
            </VStack>
        </Box>
    );
}

export default HandwritingStats;
