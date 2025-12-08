import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets';

// --- LOGO COMPONENT ---
const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center gap-2 group cursor-pointer">
      <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
        <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden">
           <img 
             src={assets.logo} 
             alt="CodeSage" 
             className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" 
           />
        </div>
      </div>
      <span className="text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
        Code<span className="text-purple-500">Sage</span>
      </span>
    </Link>
  );
};

// --- MAIN HEADER COMPONENT ---
const HomeHeader = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help', path: '/help' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LEFT: LOGO */}
        <Logo />

        {/* MIDDLE: DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-950 text-sm font-semibold rounded-full hover:bg-purple-50 transition-all shadow-lg hover:shadow-purple-500/20 active:scale-95"
          >
            Get Started
            <ArrowRight size={16} className="text-purple-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-slate-950 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-purple-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-white/10 my-2" />
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20"
              >
                Login / Signup
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HomeHeader;