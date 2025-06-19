import React from 'react';
import { ArrowRight, Play, Star, Users, Code, Trophy } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const stats = [
    { icon: Users, label: 'Users', value: '100,000+' },
    { icon: Code, label: 'Code Executions', value: '1M+' },
    { icon: Star, label: 'Rating', value: '4.9/5' }
  ];

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-3 border border-blue-500/30">
            <Star className="w-5 h-5 text-yellow-400 animate-spin" />
            <span className="text-sm font-medium">Professional Python Online Compiler</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Code{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent animate-pulse">
              Python
            </span>
            <br />
            Online
          </h1>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Professional Python compiler with VS Code-like syntax highlighting and intelligent code completion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => onNavigate('compiler')}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <span>Start Coding</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <IconComponent className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Preview */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose PyCompiler?</h2>
          <p className="text-xl text-white/70">Professional Python development environment in your browser</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Code Editor</h3>
            <p className="text-white/70 leading-relaxed">
              VS Code-like syntax highlighting, intelligent autocomplete, and real-time error detection.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Instant Execution</h3>
            <p className="text-white/70 leading-relaxed">
              Run Python code instantly in your browser with full library support and real-time output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;