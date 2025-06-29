import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, BookOpen, Users, Sparkles, GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    icon: GithubIcon,
    url: 'https://github.com/Ninja-Atmos',
    color: 'text-gray-200 hover:text-white',
    glow: 'shadow-[0_0_24px_6px_rgba(36,37,42,0.18)]',
    grad: 'from-gray-800 to-gray-700',
  },
  {
    name: 'LinkedIn',
    icon: LinkedinIcon,
    url: 'https://www.linkedin.com/in/suvam-biswas-156b09327',
    color: 'text-blue-200 hover:text-white',
    glow: 'shadow-[0_0_24px_6px_rgba(59,130,246,0.18)]',
    grad: 'from-blue-700 to-blue-500',
  },
  {
    name: 'Portfolio',
    icon: ExternalLink,
    url: 'https://suvamportfolioo.netlify.app/',
    color: 'text-purple-200 hover:text-white',
    glow: 'shadow-[0_0_24px_6px_rgba(168,85,247,0.18)]',
    grad: 'from-purple-600 to-pink-500',
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    url: 'https://www.instagram.com/suvam__biswas',
    color: 'text-pink-200 hover:text-white',
    glow: 'shadow-[0_0_24px_6px_rgba(236,72,153,0.18)]',
    grad: 'from-pink-600 to-purple-600',
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    url: 'https://www.facebook.com/Suvam0961',
    color: 'text-blue-200 hover:text-white',
    glow: 'shadow-[0_0_24px_6px_rgba(37,99,235,0.18)]',
    grad: 'from-blue-800 to-blue-600',
  },
];

const socialVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Python Compiler
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
            Write, compile, and run Python code in your browser
          </p>
          <Link
            to="/editor"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
          >
            <Code className="mr-2" />
            Start Coding
          </Link>
        </div>
      </div>

      {/* Connect with Me Section */}
      <div className="flex flex-col items-center py-6 sm:py-8">
        <span className="text-base sm:text-lg font-semibold text-white/90 tracking-wide mb-2">Connect with Me</span>
        <div className="h-1 w-12 sm:w-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
        <div className="flex flex-row flex-wrap gap-6 sm:gap-10 mt-2 justify-center">
          {socialLinks.map((social, idx) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
                whileHover={{
                  scale: 1.13,
                  y: -8,
                  boxShadow: `0 0 32px 8px rgba(255,255,255,0.13), ${social.glow}`,
                  rotate: [0, 6, -6, 0],
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${social.grad} bg-opacity-80 shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                  <motion.div
                    whileHover={{
                      rotate: 360,
                      transition: { repeat: Infinity, duration: 1.2, ease: 'linear' },
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                  >
                    <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 ${social.color} drop-shadow-lg group-hover:scale-110 transition-transform duration-300`} />
                  </motion.div>
                </div>
                <span className="text-xs sm:text-sm text-white/80 mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
        {/* Real-time Code Execution */}
        <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
          <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Real-time Execution</h3>
          <p className="text-gray-400 text-sm sm:text-base">Run your Python code instantly and see results in real-time</p>
        </div>
        <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Code Snippets</h3>
          <p className="text-gray-400 text-sm sm:text-base">Access a library of useful Python code snippets and examples</p>
        </div>
        <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Community</h3>
          <p className="text-gray-400 text-sm sm:text-base">Share your code and collaborate with other developers</p>
        </div>
      </div>

      {/* Interactive Code Playground */}
      <div className="container mx-auto px-2 sm:px-4 py-10 sm:py-16">
        <div className="bg-slate-800/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mr-2 sm:mr-3" />
            <h2 className="text-xl sm:text-2xl font-bold">Interactive Playground</h2>
          </div>
          <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            Experiment with Python code in our interactive playground. Try out different features and see immediate results.
          </p>
          <Link
            to="/editor"
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors duration-300 text-base sm:text-lg"
          >
            Try it Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 