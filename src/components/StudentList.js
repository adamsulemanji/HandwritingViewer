import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListIcon, Heading, useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

function StudentList({ students, onStudentSelect }) {
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Box borderRadius="md" overflow="hidden" boxShadow="base" p="5" m="4" bg={useColorModeValue('white', 'gray.800')}>
      <Heading fontSize="xl" textAlign="center" mb="4">
        Student List
      </Heading>
      <List spacing={3}>
        {students.map((student) => (
          <ListItem
            key={student.id}
            onClick={() => onStudentSelect(student)}
            cursor="pointer"
            p="2"
            borderRadius="md"
            _hover={{ bg: hoverBgColor }}
            transition="background-color 0.3s ease"
            color={textColor}
          >
            <ListIcon as={ChevronRightIcon} color="teal.500" />
            {student.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

// Define prop types for StudentList
StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onStudentSelect: PropTypes.func.isRequired,
};

export default StudentList;
