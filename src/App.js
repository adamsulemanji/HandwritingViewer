import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Data from './data/data.json';
import HandwritingViewer from './components/HandwritingViewer';
import HandwritingStats from './components/HandwritingStats';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
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
    setCurrentObjectIndex(0);
    updateImagePath(student.objects[0].file_path);
  };

  const goToPreviousLetter = () => {
    setCurrentObjectIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      updateImagePath(selectedStudent.objects[newIndex].file_path);
      return newIndex;
    });
  };

  const goToNextLetter = () => {
    if (selectedStudent && currentObjectIndex < selectedStudent.objects.length - 1) {
      setCurrentObjectIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        updateImagePath(selectedStudent.objects[newIndex].file_path);
        return newIndex;
      });
    }
  };

  return (
    <ChakraProvider>
      <div className="flex flex-row p-5 text-center h-screen">
        <div className="flex-none w-1/4 mr-4 bg-green-200 h-full">
          <StudentList students={Data} onStudentSelect={handleStudentSelect} />
        </div>
        <div className="flex-grow flex flex-col items-center bg-blue-200 h-full">
          Student Handwriting Viewer
          Current Viewing: {selectedStudent ? selectedStudent.name : 'None'}
          <HandwritingViewer imageUrl={imagePath} caption={`Object ${currentObjectIndex + 1}`} goToPreviousLetter={goToPreviousLetter} goToNextLetter={goToNextLetter} />
        </div>
        <div className="flex-none w-1/4 ml-4 bg-red-300 h-full">
          <HandwritingStats data={selectedStudent ? [selectedStudent.objects[currentObjectIndex]] : []} />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
