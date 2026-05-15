import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="fade-in pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl text-white serif mb-6">Get in Touch</h1>
        <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
          We are always interested in new collaborations for film, art, and media projects.
        </p>
      </div>

      <div className="max-w-md mx-auto w-full bg-[#0a1221] p-8 md:p-12 border border-white/5 relative overflow-hidden text-center">
        <div className="space-y-12">
          <div className="flex flex-col items-center space-y-3">
            <Mail className="text-gray-500" size={24} />
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Email</p>
              <a href="mailto:info@sonotop.org" className="text-xl text-white hover:text-gray-300 transition-colors">
                info@sonotop.org
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
             <Phone className="text-gray-500" size={24} />
             <div>
               <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Phone</p>
               <p className="text-xl text-white">+49 176 20796491</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
