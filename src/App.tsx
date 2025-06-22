import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Editor from './components/Editor';
import About from './components/About';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/editor"
          element={
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }}
            >
              <Editor />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }}
            >
              <About />
            </motion.div>
          }
        />
        {/* Catch-all route to redirect to Home for unmatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="app relative">
        {/* <LiveWallpaper /> Removed for performance */}
        <div className="relative z-10">
          <Navbar />
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </div>
      </div>
    </Router>
  );
}

export default App;