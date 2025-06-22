import React from 'react';
import { Code, Zap, Shield, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Python Compiler
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto">
            A modern, web-based Python compiler that allows you to write, compile, and run Python code directly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl sm:max-w-5xl mx-auto">
          {/* Features */}
          <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center mb-3 sm:mb-4">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 mr-2 sm:mr-3" />
              <h2 className="text-lg sm:text-2xl font-semibold">Features</h2>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
              <li>• Real-time code execution</li>
              <li>• Syntax highlighting</li>
              <li>• Code sharing capabilities</li>
              <li>• Download code as .py files</li>
              <li>• Copy code to clipboard</li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center mb-3 sm:mb-4">
              <Code className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 mr-2 sm:mr-3" />
              <h2 className="text-lg sm:text-2xl font-semibold">Technology Stack</h2>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
              <li>• React for the frontend</li>
              <li>• Flask for the backend</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Python for code execution</li>
              <li>• WebSocket for real-time updates</li>
            </ul>
          </div>

          {/* Security */}
          <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center mb-3 sm:mb-4">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-green-400 mr-2 sm:mr-3" />
              <h2 className="text-lg sm:text-2xl font-semibold">Security</h2>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
              <li>• Sandboxed code execution</li>
              <li>• Resource usage limits</li>
              <li>• Input validation</li>
              <li>• Secure API endpoints</li>
              <li>• Regular security updates</li>
            </ul>
          </div>

          {/* Accessibility */}
          <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center mb-3 sm:mb-4">
              <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mr-2 sm:mr-3" />
              <h2 className="text-lg sm:text-2xl font-semibold">Accessibility</h2>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
              <li>• Responsive design</li>
              <li>• Keyboard navigation</li>
              <li>• Screen reader support</li>
              <li>• High contrast mode</li>
              <li>• Cross-browser compatibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 