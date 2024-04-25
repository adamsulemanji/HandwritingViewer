import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, useColorModeValue, Select,
} from '@chakra-ui/react';
import '../block.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, Text, BarChart, Legend, Bar, Rectangle,
} from 'recharts';

function formatFileName(filePath) {
  const baseName = filePath.split('/').pop().replace('.json', '');
  const noUnderscores = baseName.replace(/_/g, ' ');
  const capitalized = noUnderscores
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return capitalized;
}

function ClassData({ data }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const [dataSet, setDataSet] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const allWritings = data.flatMap((obj) => obj.objects.flatMap((o) => o.writings));

    console.log(allWritings);
    const fetchPromises = allWritings.map((url) => {
      const fileName = url.split('/').pop();
      return fetch(url)
        .then((res) => res.json())
        .then((json) => ({
          name: formatFileName(fileName),
          totalStrokes: json.total_strokes,
          totalPoints: json.total_points,
          avgPoints: json.average_points_per_stroke,
          duration: json.drawing_duration,
          firstToLast: json.distance_first_to_last_point,
          convexRatio: json.convex_hull_to_bounding_rectangle_ratio,
        }));
    });

    Promise.all(fetchPromises).then((results) => {
      const newDataSet = results.map((result, index) => ({
        name: result.name,
        TotalStrokes: result.totalStrokes,
        TotalPoints: result.totalPoints,
        AvgPoints: result.avgPoints,
        Duration: result.duration,
        DistFirstToLast: result.firstToLast,
        ConvexHullRatio: result.convexRatio,
      }));
      setDataSet(newDataSet);
    });
  }, [data]);
  const handleSelectChange = (event) => {
    setSelectedIndex(parseInt(event.target.value, 10));
  };

  if (!data || data.length === 0) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" m={5} bg={bgColor} color={textColor}>
        <Heading>No data available</Heading>
      </Box>
    );
  }
  return (
    <Box className="box">
      <Heading class="title" color={textColor}>Class Data</Heading>
      <Select onChange={handleSelectChange} placeholder="Select a sketch">
        {dataSet.map((entry, index) => (
          <option key={entry.name} value={index}>{entry.name}</option>
        ))}
      </Select>
      <ResponsiveContainer width={300} height={300}>
        <BarChart
          width={300}
          height={300}
          data={[dataSet[selectedIndex]]}
          margin={{
            top: 1,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Legend />
          <Bar dataKey="TotalStrokes" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="TotalPoints" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          <Bar dataKey="AvgPoints" fill="#E34A29" activeBar={<Rectangle fill="#64E329" stroke="#E34A29" />} />
          <Bar dataKey="Duration" fill="#E329CC" activeBar={<Rectangle fill="gold" stroke="#E329CC" />} />
          <Bar dataKey="DistFirstToLast" fill="#136EE9 " activeBar={<Rectangle fill="#7B13E9" stroke="#136EE9" />} />
          <Bar dataKey="ConvexHullRatio" fill="#16F3E9" activeBar={<Rectangle fill="#1659F3" stroke="#16F3E9" />} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
ClassData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    objects: PropTypes.arrayOf(PropTypes.shape({
      writings: PropTypes.arrayOf(PropTypes.string),
    })),
  })).isRequired,
};
export default ClassData;
