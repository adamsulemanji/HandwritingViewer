import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

function HandwritingViewer({ filePath }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const [fileData, setFileData] = useState(null);
  const canvasRef = useRef(null);

  const draw = (data) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    const colors = ['red', 'green', 'blue', 'purple'];
    let colorIndex = 0;

    data.forEach((stroke) => {
      context.beginPath();
      context.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach((point) => {
        context.lineTo(point.x, point.y);
      });
      context.strokeStyle = colors[colorIndex % colors.length];
      context.lineWidth = 3;
      context.stroke();
      context.closePath();
      colorIndex += 1;
    });
  };

  useEffect(() => {
    if (filePath && filePath.length > 0) {
      fetch(filePath)
        .then((response) => response.json())
        .then((data) => {
          setFileData(data);
          draw(data);
        })
        .catch((error) => console.error('Error loading the file:', error));
    }
  }, [filePath]);

  console.log(fileData);

  if (!filePath || filePath.length === 0) {
    return (
      <Box boxShadow="base" p="5" bg={bgColor} color={textColor} borderRadius="lg" m="4" textAlign="center">
        No data available
      </Box>
    );
  }

  return (
    <Box boxShadow="base" p="5" bg={bgColor} color={textColor} borderRadius="lg" m="4" textAlign="center">
      <Heading fontSize="xl" size="lg" textAlign="center" mb="4">
        Handwriting Viewer
      </Heading>
      <canvas ref={canvasRef} width={400} height={500} style={{ border: '2px solid gray', borderRadius: '10px' }} />
    </Box>
  );
}

HandwritingViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default HandwritingViewer;
