import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Text, VStack, useColorModeValue, Button,
} from '@chakra-ui/react';
import '../block.css';

function HandwritingStats({ data, onObjectSelect }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  function formatFileName(filePath) {
    const baseName = filePath.split('/').pop().replace('.json', '');
    const noUnderscores = baseName.replace(/_/g, ' ');
    const capitalized = noUnderscores
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return capitalized;
  }

  if (typeof data === 'undefined' || data.length === 0) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
        <Text>No data available</Text>
      </Box>
    );
  }

  const writingPaths = data[0].writings;

  return (
    <Box className="box">
      <Heading class="title">Handwriting Stats</Heading>
      <VStack align="start" spacing={3}>
        {writingPaths.map((path, idx) => (
          <Button key={`${path}}`} onClick={() => onObjectSelect(idx)} class="button-53" role="button">
            {formatFileName(path)}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}

HandwritingStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  onObjectSelect: PropTypes.func.isRequired,
};

export default HandwritingStats;
