import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Imprint: React.FC = () => {
  return (
    <div className="fade-in pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      
      <div className="mb-12">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest">
           <ArrowLeft size={16} className="mr-2" /> Back to Scoring
        </Link>
      </div>

      <h1 className="text-4xl md:text-5xl text-white serif mb-10">Imprint</h1>

      <div className="space-y-8 text-gray-400 font-light leading-relaxed">
        
        <section>
          <h2 className="text-white text-lg font-medium mb-4">Information according to § 5 TMG</h2>
          <p>
            Johann Bärenklau<br />
            Schloßberg 9<br />
            99817 Eisenach<br />
            Germany
          </p>
        </section>

        <section>
          <h2 className="text-white text-lg font-medium mb-4">Contact</h2>
          <p>
            Phone: +49 176 20796491<br />
            Email: <a href="mailto:info@sonotop.org" className="hover:text-white transition-colors">info@sonotop.org</a>
          </p>
        </section>

        <div className="h-px w-full bg-white/10 my-8"></div>

        <section>
          <h2 className="text-white text-lg font-medium mb-4">Copyright Notice</h2>
          <p className="text-sm">
            © 2026 Filip Januchowski & Johann Bärenklau. All rights reserved.<br />
            All musical works composed by Filip Januchowski and Johann Bärenklau.<br />
            Film excerpts are used with the kind permission of the respective rights holders.
          </p>
        </section>
      </div>
    </div>
  );
}; export default Imprint;