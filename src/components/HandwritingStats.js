import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, VStack, useColorModeValue, Image } from '@chakra-ui/react';

function HandwritingStats({ data }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  if (data.length === 0) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
        <Text>No data available</Text>
      </Box>
    );
  }

  const handwritingSession = data[0]; // Assuming data contains only one handwriting session
  const { file_path, date, number_of_strokes, time_taken, teacher, writings } = handwritingSession;

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
      <Heading fontSize="xl" mb={4}>
        Handwriting Stats
      </Heading>
      <VStack align="start" spacing={3}>
        <Text>
          Number of strokes:
          <strong>{number_of_strokes}</strong>
        </Text>
        <Text>
          Time taken:
          <strong>{time_taken}</strong>
        </Text>
        <Text>
          Teacher:
          <strong>{teacher}</strong>
        </Text>
        <Text>
          Date:
          <strong>{date}</strong>
        </Text>
        <Text>Writings:</Text>
        <VStack spacing={2} align="start">
          {writings.map((writing, index) => (
            <Image key={index} src={writing} alt={`Writing ${index}`} />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

HandwritingStats.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HandwritingStats;
