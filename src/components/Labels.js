import React from 'react';
import { Box, Heading, useColorModeValue, Button, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Labels({ data }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handlelog = () => {
    console.log('Create new Label');
  };

  if (typeof data === 'undefined' || data.length === 0) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
        <Text>No data available</Text>
      </Box>
    );
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
      <Heading fontSize="xl" mb={4}>
        Labels
      </Heading>
      <VStack align="start" spacing={3}>
        <Button colorScheme="blue">Label 1</Button>
        <Button colorScheme="green">Label 2</Button>
        <Button colorScheme="purple">Label 3</Button>
        <Button colorScheme="teal" onClick={handlelog}>
          Create new Label
        </Button>
      </VStack>
    </Box>
  );
}

Labels.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Labels;
