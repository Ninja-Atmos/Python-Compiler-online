import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, ChevronRight, Play, CheckCircle } from 'lucide-react';

const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: 'Python Fundamentals',
      level: 'Beginner',
      duration: '4 weeks',
      students: '12,500+',
      rating: 4.9,
      description: 'Master the basics of Python programming from variables to functions.',
      topics: [
        'Variables and Data Types',
        'Control Structures',
        'Functions and Modules',
        'File Handling',
        'Error Handling'
      ],
      progress: 0,
      color: 'from-green-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Object-Oriented Programming',
      level: 'Intermediate',
      duration: '3 weeks',
      students: '8,200+',
      rating: 4.8,
      description: 'Learn OOP principles, classes, inheritance, and advanced Python concepts.',
      topics: [
        'Classes and Objects',
        'Inheritance and Polymorphism',
        'Encapsulation',
        'Abstract Classes',
        'Design Patterns'
      ],
      progress: 30,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Data Science with Python',
      level: 'Advanced',
      duration: '6 weeks',
      students: '5,800+',
      rating: 4.9,
      description: 'Dive into data analysis, visualization, and machine learning with Python.',
      topics: [
        'NumPy and Pandas',
        'Data Visualization',
        'Statistical Analysis',
        'Machine Learning Basics',
        'Real-world Projects'
      ],
      progress: 0,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 4,
      title: 'Web Development with Django',
      level: 'Advanced',
      duration: '5 weeks',
      students: '4,600+',
      rating: 4.7,
      description: 'Build powerful web applications using Django framework.',
      topics: [
        'Django Basics',
        'Models and Databases',
        'Views and Templates',
        'Authentication',
        'Deployment'
      ],
      progress: 0,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const skillTree = [
    { name: 'Variables', completed: true, level: 1 },
    { name: 'Data Types', completed: true, level: 1 },
    { name: 'Control Flow', completed: true, level: 2 },
    { name: 'Functions', completed: false, level: 2 },
    { name: 'Classes', completed: false, level: 3 },
    { name: 'Modules', completed: false, level: 3 },
    { name: 'File I/O', completed: false, level: 4 },
    { name: 'Exceptions', completed: false, level: 4 }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Python <span className="text-blue-400">Courses</span>
          </h1>
          <p className="text-xl text-white/70">
            Structured learning path from beginner to expert
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="lg:col-span-2 space-y-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                  selectedCourse === course.id ? 'ring-2 ring-blue-400/50' : ''
                }`}
                onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{course.title}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                          course.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-4">{course.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-white/60">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-white/70">Progress</span>
                          <span className="text-blue-400 font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 bg-gradient-to-r ${course.color} rounded-full transition-all duration-500`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 text-white/40 transition-transform duration-300 ${
                    selectedCourse === course.id ? 'rotate-90' : ''
                  }`} />
                </div>

                {selectedCourse === course.id && (
                  <div className="border-t border-white/10 pt-4 mt-4 animate-fadeIn">
                    <h4 className="text-lg font-semibold mb-3 text-white">Course Topics</h4>
                    <div className="space-y-2">
                      {course.topics.map((topic, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.color}`}></div>
                          <span className="text-white/80">{topic}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <button className={`flex-1 bg-gradient-to-r ${course.color} px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}>
                        <Play className="w-4 h-4" />
                        <span>Start Course</span>
                      </button>
                      <button className="px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300">
                        Preview
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Skill Tree Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white">Your Progress</h3>
              <div className="space-y-3">
                {skillTree.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      skill.completed 
                        ? 'bg-gradient-to-r from-green-500 to-blue-600' 
                        : 'bg-white/10 border-2 border-white/20'
                    }`}>
                      {skill.completed ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${skill.completed ? 'text-white' : 'text-white/60'}`}>
                        {skill.name}
                      </div>
                      <div className="text-xs text-white/40">Level {skill.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold mb-3 text-white">🎯 Next Challenge</h3>
              <p className="text-white/70 mb-4 text-sm">
                Complete the Functions module to unlock Object-Oriented Programming!
              </p>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;