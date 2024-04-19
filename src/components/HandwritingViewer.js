import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

function HandwritingViewer({ filePath }) {
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
    <Box boxShadow="base" p="5" bg={bgColor} color={textColor} borderRadius="lg" m="4" textAlign="center">
      <Box className="m-10 p-10 border-2 border-gray-300 rounded-xl">{filePath}</Box>
    </Box>
  );
}

HandwritingViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default HandwritingViewer;
