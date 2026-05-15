import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050a14] border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        
        <div className="text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Januchowski & Bärenklau. All rights reserved.
          </p>
        </div>

        <div className="flex justify-center space-x-6">
           <a href="mailto:info@sonotop.org" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
             <Mail size={20} />
           </a>
        </div>

        <div className="text-center md:text-right">
          <Link to="/imprint" className="text-gray-600 hover:text-gray-400 text-xs tracking-wider uppercase transition-colors">
            Imprint
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;