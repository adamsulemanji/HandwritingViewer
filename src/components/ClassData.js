import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

function ClassData({ data }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  if (typeof data === 'undefined' || data.length === 0) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
        <Heading>No data available</Heading>
      </Box>
    );
  }
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
      <Heading>Class Data</Heading>
      <Box>Class Data goes here !</Box>
    </Box>
  );
}

ClassData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ClassData;
