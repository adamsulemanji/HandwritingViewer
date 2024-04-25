import React, { useState } from 'react';
import { ChakraProvider, Heading, useToast } from '@chakra-ui/react';
import Data from './data/data.json';
import HandwritingViewer from './components/HandwritingViewer';
import HandwritingList from './components/HandwritingList';
import StudentList from './components/StudentList';
import StudentViewer from './components/StudentViewer';
import StudentNotes from './components/StudentNotes';
import ClassData from './components/ClassData';
import Labels from './components/Labels';
import './App.css';

function App() {
  const [Student, setStudent] = useState(null);
  const [currObjIdx, setcurrObjIdx] = useState(0);
  const [imagePath, setImagePath] = useState('');
  const [handwritingPath, setHandwritingPath] = useState('');

  const [currHandwritingIdx, setCurrHandwritingIdx] = useState(0);
  const toast = useToast();

  const updateImagePath = (path) => {
    try {
      setImagePath(path);
    } catch {
      toast({
        title: 'Error loading image',
        description: 'There was an error loading the image',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleStudentSelect = (student) => {
    setStudent(student);
    setcurrObjIdx(0);
    updateImagePath(student.objects[0].file_path);
    setHandwritingPath(student.objects[0].writings[0]);

    toast({
      title: 'Student selected',
      description: 'Student data loaded successfully',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
  };

  const handleChangeObject = (index) => {
    setCurrHandwritingIdx(index);
    setHandwritingPath(Student.objects[currObjIdx].writings[index]);

    toast({
      title: 'Handwriting changed',
      description: 'Handwriting image changed successfully',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider>
      <div className="flex flex-col text-center h-screen">
        <Heading as="h1" textAlign="center" mb="4" class="header">
          Student Handwriting Viewer
        </Heading>
        <div className="flex-grow flex">
          {/* Student List */}
          <div className="card">
            <StudentList students={Data} onStudentSelect={handleStudentSelect} />
          </div>
          <div className="flex-grow rounded-md overflow-hidden">
            <div className="halfCard" style={{ backgroundColor: '#fefcbf' }}>
              <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <StudentViewer filePath={imagePath} className="student-viewer-img" />
              </div>
            </div>
            <div className="halfCard" style={{ backgroundColor: '#fed7aa' }}>
              <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <HandwritingList
                  data={Student ? [Student.objects[currObjIdx]] : []}
                  onObjectSelect={handleChangeObject}
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-1/4 flex-grow rounded-md overflow-hidden">
            <div className="viewerCard" style={{ backgroundColor: 'rgb(233 213 255)' }}>
              <HandwritingViewer filePath={handwritingPath} />
            </div>
            <div className="oneThirdCard" style={{ backgroundColor: '#bfdbfe' }}>
              <StudentNotes filePath={handwritingPath} />
            </div>
          </div>

          {/* Labels and Stats */}
          <div className="flex-none w-1/4 h-full rounded-md overflow-hidden">
            <div className="halfCard" style={{ backgroundColor: '#fed7d7' }}>
              <Labels data={Student ? [Student.objects[currObjIdx]] : []} />
            </div>
            <div className="halfCard" style={{ backgroundColor: '#e6fffa' }}>
              <ClassData data={Data} />
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
export default App;
