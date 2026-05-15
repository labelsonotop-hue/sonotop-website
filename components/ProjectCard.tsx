import React from 'react';
import { Project } from '../types';
import { Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleWatchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="group relative w-full flex flex-col bg-[#0a1221] border border-white/5 hover:border-white/20 transition-all duration-500">
      
      {/* Image Container with Overlay - Portrait Aspect Ratio 2:3 */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[#0a1221]">
        <img 
          src={project.imageUrl || undefined} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button 
             onClick={handleWatchClick}
             className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
           >
             <Play size={16} fill="currentColor" />
             <span className="uppercase text-xs tracking-widest font-medium">Watch & Listen</span>
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col flex-grow justify-between">
        <div>
           <div className="flex justify-between items-baseline mb-2">
             <Link to={`/project/${project.id}`} className="text-lg md:text-xl text-white serif tracking-wide group-hover:text-gray-200 transition-colors hover:underline decoration-white/30 underline-offset-4">
               {project.title}
             </Link>
             <span className="text-gray-500 text-xs md:text-sm font-light font-mono">
               {project.year}
             </span>
           </div>
           
           <div className="h-px w-8 bg-white/20 my-3 group-hover:w-full transition-all duration-500 ease-out"></div>
           
           <p className="text-gray-400 text-xs md:text-sm font-light tracking-wide">
             {project.genre}
           </p>
           {project.director && (
              <p className="text-gray-600 text-[10px] md:text-xs mt-1 uppercase tracking-wider">
                {project.director}
              </p>
           )}
        </div>
        
        {/* Production Companies */}
        <div className="mt-4 md:mt-6">
           {project.productionCompanies?.map((line, index) => (
             <p key={index} className="text-gray-600 text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
               {line}
             </p>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;