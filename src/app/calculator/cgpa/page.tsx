'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Course {
  id: string;
  name: string;
  credit: number;
  grade: string;
}

interface University {
  name: string;
  gradePoints: { [key: string]: number };
}

const universities: University[] = [
  {
    name: 'NSU',
    gradePoints: {
      'A+': 4.0,
      'A': 3.7,
      'A-': 3.3,
      'B+': 3.0,
      'B': 2.7,
      'B-': 2.3,
      'C+': 2.0,
      'C': 1.7,
      'C-': 1.3,
      'D+': 1.0,
      'D': 0.7,
      'F': 0.0
    }
  },
  {
    name: 'BUET',
    gradePoints: {
      'A+': 4.0,
      'A': 3.75,
      'A-': 3.5,
      'B+': 3.25,
      'B': 3.0,
      'B-': 2.75,
      'C+': 2.5,
      'C': 2.25,
      'C-': 2.0,
      'D+': 1.75,
      'D': 1.5,
      'F': 0.0
    }
  },
  {
    name: 'DU',
    gradePoints: {
      'A+': 4.0,
      'A': 3.75,
      'A-': 3.5,
      'B+': 3.25,
      'B': 3.0,
      'B-': 2.75,
      'C+': 2.5,
      'C': 2.25,
      'C-': 2.0,
      'D': 1.0,
      'F': 0.0
    }
  },
  {
    name: 'BRAC',
    gradePoints: {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'F': 0.0
    }
  }
];

export default function CGPACalculator() {
  const [selectedUniversity, setSelectedUniversity] = useState<University>(universities[0]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCourse, setCurrentCourse] = useState({ name: '', credit: 3, grade: 'A' });
  const [isCalculated, setIsCalculated] = useState(false);

  const addCourse = () => {
    if (currentCourse.name.trim()) {
      const newCourse: Course = {
        id: Date.now().toString(),
        name: currentCourse.name.trim(),
        credit: currentCourse.credit,
        grade: currentCourse.grade
      };
      setCourses([...courses, newCourse]);
      setCurrentCourse({ name: '', credit: 3, grade: 'A' });
      setIsCalculated(false);
    }
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    setIsCalculated(false);
  };

  const updateCourseGrade = (id: string, grade: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, grade } : course
    ));
    setIsCalculated(false);
  };

  const calculateCGPA = () => {
    if (courses.length === 0) return { cgpa: 0, totalCredits: 0, totalGradePoints: 0 };
    
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const gradePoint = selectedUniversity.gradePoints[course.grade] || 0;
      totalGradePoints += gradePoint * course.credit;
      totalCredits += course.credit;
    });

    const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    
    return {
      cgpa: parseFloat(cgpa.toFixed(2)),
      totalCredits,
      totalGradePoints: parseFloat(totalGradePoints.toFixed(2))
    };
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const exportToPDF = () => {
    const result = calculateCGPA();
    const content = `
CGPA CALCULATION REPORT
University: ${selectedUniversity.name}
Date: ${new Date().toLocaleDateString()}

COURSES:
${courses.map((course, index) => 
  `${index + 1}. ${course.name} - Credit: ${course.credit} - Grade: ${course.grade} (${selectedUniversity.gradePoints[course.grade]})`
).join('\n')}

RESULTS:
Total Credits: ${result.totalCredits}
Total Grade Points: ${result.totalGradePoints}
CGPA: ${result.cgpa}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CGPA_Report_${selectedUniversity.name}_${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const result = calculateCGPA();

  return (
    <div className="min-h-screen bg-calc-gradient">
      <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
        <div className="calculator-header mb-6">
          <Link href="/" className="back-btn text-base px-4 py-2">← Back</Link>
          <h1 className="text-2xl text-white font-bold">CGPA Calculator</h1>
        </div>

        <div className="calculator bg-gray-900 rounded-xl p-6 flex-1">
          {/* Set Grade Points Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Set Grade Points</h2>
              <div className="flex justify-center items-center gap-3">
                <label className="text-white">Your University:</label>
                <select 
                  value={selectedUniversity.name}
                  onChange={(e) => setSelectedUniversity(universities.find(u => u.name === e.target.value) || universities[0])}
                  className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                >
                  {universities.map(uni => (
                    <option key={uni.name} value={uni.name}>{uni.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grade Points Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3 text-center">Grade Points</h3>
                <div className="bg-gray-800 rounded-lg p-4">
                  {Object.entries(selectedUniversity.gradePoints).slice(0, Math.ceil(Object.keys(selectedUniversity.gradePoints).length / 2)).map(([grade, point]) => (
                    <div key={grade} className="flex justify-between items-center py-2 border-b border-gray-600">
                      <span className="text-white font-medium">{grade}</span>
                      <span className="text-calc-gold font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3 text-center opacity-0">Grade Points</h3>
                <div className="bg-gray-800 rounded-lg p-4">
                  {Object.entries(selectedUniversity.gradePoints).slice(Math.ceil(Object.keys(selectedUniversity.gradePoints).length / 2)).map(([grade, point]) => (
                    <div key={grade} className="flex justify-between items-center py-2 border-b border-gray-600">
                      <span className="text-white font-medium">{grade}</span>
                      <span className="text-calc-gold font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Management Section */}
          <div className="mb-8">
            <div className="bg-purple-800 text-white p-3 rounded-t-lg">
              <div className="grid grid-cols-4 gap-4 font-semibold">
                <div>Course</div>
                <div className="text-center">Credit</div>
                <div className="text-center">Grade</div>
                <div className="text-center">Action</div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-b-lg p-4 min-h-[200px]">
              {courses.length === 0 ? (
                <div className="text-gray-400 text-center py-8">No courses added yet. Add courses to calculate CGPA.</div>
              ) : (
                courses.map((course) => (
                  <div key={course.id} className="grid grid-cols-4 gap-4 items-center py-3 border-b border-gray-600">
                    <div className="text-white">{course.name}</div>
                    <div className="text-white text-center">{course.credit}</div>
                    <div className="text-center">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourseGrade(course.id, e.target.value)}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                      >
                        {Object.keys(selectedUniversity.gradePoints).map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Course Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-white mb-2">Course Name</label>
                <input
                  type="text"
                  value={currentCourse.name}
                  onChange={(e) => setCurrentCourse({...currentCourse, name: e.target.value})}
                  placeholder="Enter course name"
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Credit</label>
                <input
                  type="number"
                  value={currentCourse.credit}
                  onChange={(e) => setCurrentCourse({...currentCourse, credit: parseInt(e.target.value) || 0})}
                  min="1"
                  max="6"
                  className="w-20 bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Grade</label>
                <select
                  value={currentCourse.grade}
                  onChange={(e) => setCurrentCourse({...currentCourse, grade: e.target.value})}
                  className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                >
                  {Object.keys(selectedUniversity.gradePoints).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={addCourse}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Add Course
              </button>
              <button
                onClick={handleCalculate}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                disabled={courses.length === 0}
              >
                Calculate CGPA
              </button>
            </div>
          </div>

          {/* Results Section */}
          {isCalculated && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">RESULT</h2>
              <div className="space-y-2">
                <div className="text-lg">Total Grade Point: {result.totalGradePoints}</div>
                <div className="text-lg">Total Credit: {result.totalCredits}</div>
                <div className="text-2xl font-bold">CGPA: {result.cgpa}</div>
              </div>
            </div>
          )}

          {/* Export Button */}
          {isCalculated && (
            <div className="text-center">
              <button
                onClick={exportToPDF}
                className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors"
              >
                Export Grades ⬇
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}