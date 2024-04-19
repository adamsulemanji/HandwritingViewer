import React, { useState } from 'react';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import Data from './data/data.json';
import HandwritingViewer from './components/HandwritingViewer';
import HandwritingList from './components/HandwritingList';
import StudentList from './components/StudentList';
import StudentViewer from './components/StudentViewer';
import './App.css';

function App() {
  const [Student, setStudent] = useState(null);
  const [currObjIdx, setcurrObjIdx] = useState(0);
  const [imagePath, setImagePath] = useState('');
  const [handwritingPath, setHandwritingPath] = useState('');
  const [currHandwritingIdx, setCurrHandwritingIdx] = useState(0);

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
    setHandwritingPath(student.objects[0].writings[0]);
  };

  const handleChangeObject = (index) => {
    setCurrHandwritingIdx(index);
    setHandwritingPath(Student.objects[currObjIdx].writings[index]);

    console.log(currHandwritingIdx);
  };

  return (
    <ChakraProvider>
      <div className="flex flex-col text-center h-screen">
        <Heading as="h1" textAlign="center" mb="4">
          Student Handwriting Viewer
        </Heading>
        <div className="flex-grow flex">
          {/* Student List */}
          <div className="flex-none w-1/4 bg-indigo-200 h-full rounded-md overflow-hidden">
            <StudentList students={Data} onStudentSelect={handleStudentSelect} />
          </div>

          <div className="flex-grow rounded-md overflow-hidden">
            <div className="h-1/3 p-2 bg-yellow-200 flex flex-col justify-center items-center">
              <StudentViewer filePath={imagePath} />
            </div>
            <div className="h-2/3 p-2 bg-orange-200 flex flex-col justify-start items-center">
              <HandwritingList
                data={Student ? [Student.objects[currObjIdx]] : []}
                onObjectSelect={handleChangeObject}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow rounded-md overflow-hidden">
            <div className="h-1/2 p-2 bg-purple-200">
              <HandwritingViewer filePath={handwritingPath} />
            </div>
            <div className="h-1/2 p-2 bg-blue-200">Notes and Stats</div>
          </div>

          {/* Labels and Stats */}
          <div className="flex-none w-1/4 bg-teal-100 h-full rounded-md overflow-hidden">
            <div className="h-1/2 p-2 bg-red-200">Labels and create new labels</div>
            <div className="h-1/2 p-2 bg-green-200">Comparison of all students</div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
