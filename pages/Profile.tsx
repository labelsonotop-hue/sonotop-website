import React from 'react';
import { TeamMember } from '../types';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileProps {
  member: TeamMember;
}

const Profile: React.FC<ProfileProps> = ({ member }) => {
  return (
    <div key={member.id} className="fade-in pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
      
      <div className="mb-12">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest">
           <ArrowLeft size={16} className="mr-2" /> Back to Scoring
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Image */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="aspect-[3/4] overflow-hidden bg-[#0a1221] border border-white/5">
            <img 
              src={member.imageUrl || undefined} 
              alt={member.name} 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl md:text-5xl text-white serif mb-2">{member.name}</h1>
          <p className="text-gray-500 text-lg mb-8 font-light uppercase tracking-wide">{member.role}</p>
          
          <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg whitespace-pre-line">
            {member.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-white/10 flex flex-wrap gap-10 items-center w-full">
              {member.imdbUrl && (
                <a 
                  href={member.imdbUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center text-white hover:text-gray-300 transition-colors"
                >
                  <span className="font-bold text-lg tracking-wider">IMDB</span>
                </a>
              )}

              {member.spotifyUrl && (
                <a 
                  href={member.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z"/>
                  </svg>
                </a>
              )}

              {member.youtubeMusicUrl && (
                <a 
                  href={member.youtubeMusicUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 1a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm-2 3.5 5.5 3.5-5.5 3.5v-7z" />
                  </svg>
                </a>
              )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;