// HandwritingStats.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

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
        <img src={file_path} alt="Student Headshot" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        <Text>Writing Points:</Text>
        <VStack align="start" spacing={1} pl={4}>
          {writings.map((stroke, index) => (
            <Box key={index} bg="gray.200" p={2} borderRadius="md">
              <Text>Stroke {index + 1}:</Text>
              <VStack align="start" spacing={1} pl={2}>
                {stroke.map((point, pointIndex) => (
                  <Text key={pointIndex}>
                    x: {point.x}, y: {point.y}, t: {point.t}
                  </Text>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

HandwritingStats.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      file_path: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      number_of_strokes: PropTypes.number.isRequired,
      time_taken: PropTypes.string.isRequired,
      teacher: PropTypes.string.isRequired,
      writings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        t: PropTypes.number.isRequired,
      }))).isRequired,
    }),
  ).isRequired,
};

export default HandwritingStats;
