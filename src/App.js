import React, { useState } from 'react';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import Data from './data/data.json';
import HandwritingViewer from './components/HandwritingViewer';
import HandwritingStats from './components/HandwritingStats';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
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
    setSelectedStudent(student);
    setcurrObjIdx(0);
    updateImagePath(student.objects[0].file_path);
  };

  const goToPrevLetter = () => {
    setcurrObjIdx((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      updateImagePath(selectedStudent.objects[newIndex].file_path);
      return newIndex;
    });
  };

  const goToNextLetter = () => {
    if (selectedStudent && currObjIdx < selectedStudent.objects.length - 1) {
      setcurrObjIdx((prevIndex) => {
        const newIndex = prevIndex + 1;
        updateImagePath(selectedStudent.objects[newIndex].file_path);
        return newIndex;
      });
    }
  };

  return (
    <ChakraProvider>
      <div className="flex flex-row p-5 text-center h-screen">
        <div className="flex-none w-1/4 mr-4 bg-teal-100 h-full rounded-md overflow-hidden">
          <StudentList students={Data} onStudentSelect={handleStudentSelect} />
        </div>
        <div className="flex-grow flex flex-col items-center bg-teal-100 h-full rounded-md overflow-hidden min-w-0">
          <Heading as="h1" textAlign="center" mb="4">
            Student Handwriting Viewer
          </Heading>
          <p className="mb-2">
            Current Viewing:
            {selectedStudent ? selectedStudent.name : 'None'}
          </p>
          <HandwritingViewer
            imageUrl={imagePath}
            caption={`Object ${currObjIdx + 1}`}
            goToPreviousLetter={goToPrevLetter}
            goToNextLetter={goToNextLetter}
          />
        </div>
        <div className="flex-none w-1/4 ml-4 bg-teal-100 h-full rounded-md overflow-hidden">
          <HandwritingStats data={selectedStudent ? [selectedStudent.objects[currObjIdx]] : []} />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
