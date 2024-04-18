import React, { useState } from 'react';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import Data from './data/data.json';
// import HandwritingViewer from './components/HandwritingViewer';
import HandwritingStats from './components/HandwritingStats';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [Student, setStudent] = useState(null);
  const [currObjIdx, setcurrObjIdx] = useState(0);
  const [imagePath, setImagePath] = useState('');

  const updateImagePath = (path) => {
    try {
      setImagePath(path);
    } catch {
      console.error('Failed to load image:', path);
    }
  };

  const handleStudentSelect = (student) => {
    setStudent(student);
    setcurrObjIdx(0);
    updateImagePath(student.objects[0].file_path);
  };

  // const goToPrevLetter = () => {
  //   setcurrObjIdx((prevIndex) => {
  //     const newIndex = Math.max(prevIndex - 1, 0);
  //     updateImagePath(Student.objects[newIndex].file_path);
  //     return newIndex;
  //   });
  // };

  // const goToNextLetter = () => {
  //   if (Student && currObjIdx < Student.objects.length - 1) {
  //     setcurrObjIdx((prevIndex) => {
  //       const newIndex = prevIndex + 1;
  //       updateImagePath(Student.objects[newIndex].file_path);
  //       return newIndex;
  //     });
  //   }
  // };

  console.log('filepath', imagePath);

  return (
    <ChakraProvider>
      <div className="flex flex-col text-center h-screen">
        <Heading as="h1" textAlign="center" mb="4">
          Student Handwriting Viewer 2
        </Heading>
        <div className="flex-grow flex">
          {/* Student List */}
          <div className="flex-none w-1/4 bg-indigo-200 h-full rounded-md overflow-hidden">
            <StudentList students={Data} onStudentSelect={handleStudentSelect} />
          </div>

          <div className="flex-grow rounded-md overflow-hidden">
            <div className="h-1/3 p-2 bg-yellow-200">{/* Picture of Student */}</div>
            <div className="h-2/3 p-2 bg-orange-200">
              <HandwritingStats data={Student ? [Student.objects[currObjIdx]] : []} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow rounded-md overflow-hidden">
            {/* Handwriting Image and Notes */}
            <div className="h-1/2 p-2 bg-purple-200">{/* Picture of Student */}</div>
            <div className="h-1/2 p-2 bg-blue-200">{/* List of writing sample */}</div>
          </div>

          {/* Labels and Stats */}
          <div className="flex-none w-1/4 bg-teal-100 h-full rounded-md overflow-hidden">
            {/* Labels Section */}
            <div className="h-1/2 p-2 bg-red-200">{/* Add your labels input and display here */}</div>
            {/* Handwriting Stats */}
            <div className="h-1/2 p-2 bg-green-200">{/* Comparison of student */}</div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
