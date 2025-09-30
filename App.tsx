import React, { useState, useCallback } from 'react';
import { Student } from './types';
import { studentData } from './data/studentData';
import SearchForm from './components/SearchForm';
import StudentInfoCard from './components/StudentInfoCard';
import { SchoolIcon } from './components/icons/SchoolIcon';

const App: React.FC = () => {
  const [civilIdInput, setCivilIdInput] = useState<string>('');
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = useCallback(() => {
    if (!civilIdInput.trim()) {
      setError('الرجاء إدخال الرقم المدني.');
      setStudent(null);
      setSearched(true);
      return;
    }
    
    setIsLoading(true);
    setError('');
    setStudent(null);
    setSearched(true);

    setTimeout(() => {
      const foundStudent = studentData[civilIdInput.trim()];
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        setError('لم يتم العثور على طالب بهذا الرقم المدني. الرجاء التأكد من الرقم والمحاولة مرة أخرى.');
      }
      setIsLoading(false);
    }, 500);
  }, [civilIdInput]);

  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col items-center justify-between p-4 print:bg-white print:text-black">
      <header className="w-full max-w-4xl text-center print:hidden">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center space-y-4">
          <SchoolIcon />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-900">بوابة نور الذكية</h1>
            <p className="text-green-700 mt-1">مدرسة الطريف للبنات 7-10</p>
            <p className="text-sm text-gray-500 mt-2">إعداد وتنفيذ مساعدة المديرة أ.نجوى بنت محمد بن سليمان العوفيه</p>
          </div>
        </div>
      </header>
      
      <main className="flex-grow w-full max-w-md flex flex-col items-center justify-center py-8 print:py-0">
        <div className="w-full bg-white text-gray-800 rounded-xl shadow-lg p-8 space-y-6 print:shadow-none print:p-0 print:bg-transparent print:text-black">
          <div className="print:hidden">
            <SearchForm
              value={civilIdInput}
              onChange={(e) => {
                setCivilIdInput(e.target.value);
                setError('');
              }}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center pt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
            </div>
          ) : (
            <>
              {error && <p className="text-center text-white bg-red-500 p-3 rounded-lg">{error}</p>}
              {student ? (
                <StudentInfoCard student={student} />
              ) : (
                searched && !error && (
                  <p className="text-center text-gray-500 pt-8">لا توجد بيانات لعرضها.</p>
                )
              )}
            </>
          )}
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center text-sm text-gray-200 py-4 print:hidden">
        <p><span className="font-bold">تنبيه هام:</span> الرجاء عدم تغيير كلمة المرور إطلاقًا لتجنب فقدها.</p>
      </footer>
    </div>
  );
};

export default App;