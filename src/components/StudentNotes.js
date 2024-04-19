import React from 'react';
import { Box, Textarea, useColorModeValue, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function StudentNotes({ filePath }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  if (typeof filePath === 'undefined' || filePath.length === 0) {
    return (
      <Box boxShadow="base" p="5" bg={bgColor} color={textColor} borderRadius="lg" m="4" textAlign="center">
        No data available
      </Box>
    );
  }

  return (
    <Box boxShadow="base" p="5" bg={bgColor} color={textColor} borderRadius="lg" m="4">
      <Heading fontSize="xl" size="lg" textAlign="center" mb="4">
        Student Notes
      </Heading>
      <Box boxShadow="base" p="5" bg={bgColor} color={textColor} borderRadius="lg" m="4" textAlign="center">
        <Textarea placeholder="Add notes here" size="lg" />
      </Box>
    </Box>
  );
}

StudentNotes.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default StudentNotes;
