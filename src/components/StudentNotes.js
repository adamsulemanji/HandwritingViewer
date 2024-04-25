import React from 'react';
import {
  Box, Textarea, useColorModeValue, Heading,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import '../block.css';

function StudentNotes({ filePath }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  if (typeof filePath === 'undefined' || filePath.length === 0) {
    return <Box className="box">No data available</Box>;
  }

  return (
    <Box className="box">
      <Heading class="title">Student Notes</Heading>
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
