import React from 'react';
import { Github, Linkedin, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/your-username',
    color: 'from-gray-600 to-gray-800',
    hoverColor: 'hover:from-gray-500 hover:to-gray-700',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/your-profile',
    color: 'from-blue-500 to-blue-700',
    hoverColor: 'hover:from-blue-400 hover:to-blue-600',
  },
  {
    name: 'Portfolio',
    icon: ExternalLink,
    url: 'https://your-portfolio.com',
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-400 hover:to-pink-400',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/your-profile',
    color: 'from-pink-500 to-purple-600',
    hoverColor: 'hover:from-pink-400 hover:to-purple-500',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/your-profile',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:from-blue-500 hover:to-blue-700',
  },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="space-y-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2 mx-auto animate-pulse">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-semibold text-sm">Connect</div>
            <div className="text-white/60 text-xs">with me</div>
          </div>
          <div className="space-y-3">
            {socialLinks.map((social, idx) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative block bg-gradient-to-r ${social.color} ${social.hoverColor} p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl`}
                  whileHover={{ scale: 1.13, rotate: [0, 2, -2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {social.name}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black/80"></div>
                  </div>
                </motion.a>
              );
            })}
          </div>
          {/* Animated Divider */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;