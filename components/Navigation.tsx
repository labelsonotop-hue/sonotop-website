import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Scoring', path: '/' },
    { name: 'Filip', path: '/filip' },
    { name: 'Johann', path: '/johann' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050a14]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo Area */}
        <Link to="/" className="group" onClick={() => setIsOpen(false)}>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-medium tracking-wide text-white group-hover:text-gray-300 transition-colors serif">
              Filip Januchowski <span className="font-cormorant">&</span> Johann Bärenklau
            </h1>
            <span className="text-xs text-gray-500 tracking-wider mt-1 uppercase hidden md:block">
              SCORING & SOUND WORKS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 lg:space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm tracking-widest uppercase transition-all hover:text-white ${
                isActive(link.path) ? 'text-white border-b border-white pb-1' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050a14] border-b border-white/10 py-8 flex flex-col items-center space-y-6 fade-in shadow-2xl">
           {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg tracking-widest uppercase transition-colors ${
                isActive(link.path) ? 'text-white' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;