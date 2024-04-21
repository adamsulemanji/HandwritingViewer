import React from 'react';
import { Image, Box, useColorModeValue, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import '../block.css';

function StudentViewer({ filePath }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  if (!filePath) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
        <Box>No data available</Box>
      </Box>
    );
  }

  return (
    <Box className="box">
      <Heading class="title">Student Picture</Heading>
      <Box
        className="border-5 border-gray-300 rounded-xl bg-slate-200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        maxW="300px"
        maxH="300px"
        overflow="hidden"
        // center the image
        mx="auto"
      >
        <Image src={filePath} alt="Handwriting" width="100%" height="auto" objectFit="contain" />
      </Box>
    </Box>
  );
}

export default StudentViewer;

StudentViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
};
