import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, VStack, useColorModeValue, Image, Button } from '@chakra-ui/react';

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
  const { filePath, date, numStrokes, timeTake, teacher, writings } = handwritingSession;

  const [imageVisibility, setImageVisibility] = useState(Array(writings.length).fill(false));

  const toggleImage = (index) => {
    const newVisibility = [...imageVisibility];
    newVisibility[index] = !newVisibility[index];
    setImageVisibility(newVisibility);
  };

  console.log('HandwritingStats File Path', filePath);

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
      <Heading fontSize="xl" mb={4}>
        Handwriting Stats
      </Heading>
      <VStack align="start" spacing={3}>
        <Text>
          Number of strokes:
          <strong>{numStrokes}</strong>
        </Text>
        <Text>
          Time taken:
          <strong>{timeTake}</strong>
        </Text>
        <Text>
          Teacher:
          <strong>{teacher}</strong>
        </Text>
        <Text>
          Date:
          <strong>{date}</strong>
        </Text>
        {writings.map((writing, index) => (
          <div key={`Writing ${writing}`}>
            <Button onClick={() => toggleImage(index)}>
              {writing} {imageVisibility[index] ? '(Hide)' : '(Show)'}
            </Button>
            {imageVisibility[index] && <Image src={writing} alt={`Writing ${index}`} />}
          </div>
        ))}
      </VStack>
    </Box>
  );
}

HandwritingStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HandwritingStats;
