import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const Scoring: React.FC = () => {
  return (
    <div className="fade-in pt-32 pb-10 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
      
      {/* Hero Section within Home */}
      <header className="mb-20 md:mb-32">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-cormorant font-light leading-tight mb-6">
          Film Scoring <br />
          <span className="text-gray-500">&</span> Sound Works for Media
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
          Original music for narrative film, documentary and theater
        </p>
      </header>

      {/* Projects Grid */}
      <section className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default Scoring;