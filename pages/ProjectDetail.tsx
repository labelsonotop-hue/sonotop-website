import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowLeft, ArrowRight, Play, Pause, Maximize2, X, ChevronLeft, ChevronRight, Volume2, VolumeX, Volume1, Loader2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { pdfjs, Document, Page } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const phoenixTitles = [
  "Prologue",
  "Hypnosis",
  "Love Scene",
  "On the Balcony",
  "Linus",
  "\"Phoenix\" and End Credits",
  "Relapse",
  "Doubts",
  "Finale"
];

const SAMPLE_VIDEOS = {
  main: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  phoenixTraum: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/Traum_22Feb26.mp4",
  phoenixHypnosis: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/Felix_fuehrt_23Feb26.mp4",
  phoenixBalcony: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/Liebesszene_23Feb26.mp4",
  phoenixLinus: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/Balkon%2023Feb26.mp4",
  phoenixRelapse: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/Linus_23Feb26.mp4",
  phoenixCredits: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/phoenix%2Bcredits_23Feb26.mp4",
  phoenixDoubts: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/rueckfall_23Feb26.mp4",
  phoenixFinale: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/Zweifel_23Feb26.mp4",
  phoenixLoveScene: "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/2_video_2/finale2_23Feb26.mp4",
  phoenixOthers: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  drachen1: "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/2-videos/03_dt_gg_1.mp4",
  drachen2: "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/2-videos/02_dt_fl_2.mp4",
  drachen3: "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/2-videos/01_dt_fl_1.mp4",
  drachen4: "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/2-videos/04_dt_fl_3.mp4",
  drachen5: "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/2-videos/dt_uglywedding.mp4",
  drachen6: "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/2-videos/06_dt_zk_1_1ee.mp4",
  drachen7: "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/2-videos/07_dt_fl_4_1.mp4",
  cowboy1: "https://phoenix-media.b-cdn.net/Cowboy%20(2023)/2-video/cowboy.mp4"
};

const PHOENIX_AUDIO_01 = "https://phoenix-media.b-cdn.net/audio-phx/dream.mp3";
const PHOENIX_AUDIO_02 = "https://phoenix-media.b-cdn.net/audio-phx/felix.mp3";
const PHOENIX_AUDIO_03 = "https://phoenix-media.b-cdn.net/audio-phx/love.mp3";
const PHOENIX_AUDIO_04 = "https://phoenix-media.b-cdn.net/audio-phx/balcony.mp3";
const PHOENIX_AUDIO_05 = "https://phoenix-media.b-cdn.net/audio-phx/linus.mp3";
const PHOENIX_AUDIO_06 = "https://phoenix-media.b-cdn.net/audio-phx/phoenixcredits.mp3";
const PHOENIX_AUDIO_07 = "https://phoenix-media.b-cdn.net/audio-phx/relapsecbr.mp3";
const PHOENIX_AUDIO_08 = "https://phoenix-media.b-cdn.net/audio-phx/doubts.mp3";
const PHOENIX_AUDIO_09 = "https://phoenix-media.b-cdn.net/audio-phx/finale.mp3";

const DRACHEN_AUDIO_01 = "https://phoenix-media.b-cdn.net/audio-drachen/gangstergit.mp3";
const DRACHEN_AUDIO_02 = "https://phoenix-media.b-cdn.net/audio-drachen/flockeneins.mp3";
const DRACHEN_AUDIO_04 = "https://phoenix-media.b-cdn.net/audio-drachen/flockenzwei.mp3";
const DRACHEN_AUDIO_05 = "https://phoenix-media.b-cdn.net/audio-drachen/ugly.mp3";
const DRACHEN_AUDIO_06 = "https://phoenix-media.b-cdn.net/audio-drachen/postkartedrei.mp3";

const COWBOY_AUDIO_01 = "https://phoenix-media.b-cdn.net/Cowboy%20(2023)/1-audio/Cowboy.wav";

/**
 * Utility to play media safely while catching standard browser errors.
 */
const safePlayMedia = async (media: HTMLMediaElement | null) => {
  if (!media) return;
  try {
    if (!media.paused && !media.ended && media.readyState > 2) return;
    if (!media.src || media.src === window.location.href) return;

    const playPromise = media.play();
    if (playPromise !== undefined) {
      await playPromise;
    }
  } catch (err) {
    const error = err as Error;
    if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
      console.debug("Media Error:", error.name, error.message);
    }
  }
};

const MinimalAudioPlayer: React.FC<{ title?: string; label?: string; className?: string; src?: string }> = ({ title, label, className = "", src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeContainerRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const togglePlay = () => {
    if (src && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setTimeout(() => safePlayMedia(audioRef.current), 0);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeContainerRef.current && !volumeContainerRef.current.contains(event.target as Node)) {
        setIsVolumeVisible(false);
      }
    };
    if (isVolumeVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVolumeVisible]);

  useEffect(() => {
    if (!src) {
      if (isPlaying && !isDragging) {
        intervalRef.current = window.setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              setIsPlaying(false);
              return 0;
            }
            return prev + 0.2;
          });
        }, 100);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, src, isDragging]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const updateProgressFromMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!progressContainerRef.current || !src || !audioRef.current) return;
    const rect = progressContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newProgress = (x / rect.width) * 100;
    setProgress(newProgress);
    
    if (duration) {
      const newTime = (newProgress / 100) * duration;
      setCurrentTime(newTime);
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    if (!src) return;
    setIsDragging(true);
    updateProgressFromMouse(e);

    const handleMouseMove = (moveEvent: MouseEvent) => updateProgressFromMouse(moveEvent);
    const handleMouseUp = (upEvent: MouseEvent) => {
      if (audioRef.current && duration) {
        const rect = progressContainerRef.current!.getBoundingClientRect();
        const x = Math.max(0, Math.min(upEvent.clientX - rect.left, rect.width));
        const finalProgress = x / rect.width;
        audioRef.current.currentTime = finalProgress * duration;
      }
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`w-full bg-[#0a1221] border border-white/10 p-4 flex items-center gap-5 transition-colors hover:border-white/20 group ${className}`}>
      {src && (
        <audio 
          ref={audioRef} 
          src={src} 
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setProgress(0); }}
        />
      )}
      
      <button 
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex-shrink-0"
      >
        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
      </button>

      <div className="flex-grow flex flex-col justify-center gap-3">
        <div className="flex justify-between items-end">
           <div className="flex flex-col">
              {label && <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">{label}</span>}
              <span className="text-xs text-gray-200 font-medium tracking-wide uppercase">{title || "Original Score"}</span>
           </div>
           <span className="text-[10px] font-mono text-gray-500">
             {src ? `${formatTime(currentTime)} / ${formatTime(duration)}` : (isPlaying ? "01:24" : "03:45")}
           </span>
        </div>
        
        <div ref={progressContainerRef} className="w-full h-2 flex items-center relative cursor-pointer group/progress" onMouseDown={handleProgressMouseDown}>
           <div className="w-full h-px bg-white/20"></div>
           <div className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] bg-white" style={{ width: `${progress}%` }}>
             <div className="absolute inset-0 shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
           </div>
           <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none" style={{ left: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="relative flex items-center" ref={volumeContainerRef}>
        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-3 bg-[#0a1221] border border-white/10 rounded-full shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 z-30 ${isVolumeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="relative w-1 h-24 bg-white/10 rounded-full cursor-pointer overflow-hidden" onMouseDown={(e) => {
            const el = e.currentTarget;
            const update = (me: MouseEvent | React.MouseEvent) => {
              const rect = el.getBoundingClientRect();
              const v = Math.min(1, Math.max(0, 1 - (me.clientY - rect.top) / rect.height));
              setVolume(v);
            };
            update(e);
            const mm = (me: MouseEvent) => update(me);
            const mu = () => { window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu); };
            window.addEventListener('mousemove', mm);
            window.addEventListener('mouseup', mu);
          }}>
             <div className="absolute bottom-0 left-0 w-full bg-white transition-all duration-75" style={{ height: `${volume * 100}%` }}></div>
          </div>
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white/10 absolute top-full left-1/2 -translate-x-1/2"></div>
        </div>
        <button onClick={() => setIsVolumeVisible(!isVolumeVisible)} className={`transition-colors duration-300 p-1 rounded-full hover:bg-white/5 ${isVolumeVisible || volume < 0.1 ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`}>
          {volume === 0 ? <VolumeX size={14} /> : volume < 0.5 ? <Volume1 size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </div>
  );
};

const ScoreModal: React.FC<{ url: string; onClose: () => void; title: string }> = ({ url, onClose, title }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateDimensions();
    // Add a slight delay to ensure container is fully rendered
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const next = prevPageNumber + offset;
      if (numPages && next >= 1 && next <= numPages) {
        return next;
      }
      return prevPageNumber;
    });
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 4.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4));
  const resetZoom = () => setScale(1.0);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'n') changePage(1);
      if (e.key === 'ArrowLeft' || e.key === 'p') changePage(-1);
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetZoom();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages]); // re-bind if numPages changes though changePage handles it

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md fade-in" onClick={onClose}>
      <div className="relative w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header bar */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 md:h-20 bg-transparent z-50">
          <div className="flex flex-col mb-4 md:mb-0">
            <h2 className="text-white font-serif text-xl tracking-wide uppercase">{title}</h2>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Score Excerpt</span>
          </div>
          
          <div className="flex items-center flex-wrap justify-center gap-4 md:gap-8">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
              <button onClick={zoomOut} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Zoom Out ( - )">
                <ZoomOut size={18} />
              </button>
              <button onClick={resetZoom} className="px-3 py-1 hover:bg-white/5 rounded-md text-[10px] uppercase tracking-tighter text-white/50 hover:text-white font-mono flex items-center gap-2 group" title="Reset Zoom ( 0 )">
                <RotateCcw size={12} className="group-hover:rotate-[-45deg] transition-transform" />
                <span>{Math.round(scale * 100)}%</span>
              </button>
              <button onClick={zoomIn} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Zoom In ( + )">
                <ZoomIn size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 text-white">
              <button 
                onClick={() => changePage(-1)} 
                disabled={pageNumber <= 1}
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="font-mono text-sm tracking-[0.2em] min-w-[80px] text-center">
                {pageNumber} / {numPages || '--'}
              </span>
              <button 
                onClick={() => changePage(1)} 
                disabled={numPages ? pageNumber >= numPages : true}
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <button onClick={onClose} className="p-2 hover:text-white text-gray-400 transition-colors">
              <X size={28} />
            </button>
          </div>
        </div>

        {/* PDF Content Area */}
        <div ref={containerRef} className="flex-grow flex items-start justify-center bg-transparent overflow-auto md:p-8 select-none custom-scrollbar">
          <Document
            file={url.startsWith('/') ? url : `/api/proxy-pdf?url=${encodeURIComponent(url)}`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center text-white/50 animate-pulse flex-col gap-4 mt-20">
                <Loader2 className="animate-spin" size={32} />
                <span className="uppercase tracking-[0.3em] text-[10px]">Loading Partitur...</span>
              </div>
            }
            error={
              <div className="text-gray-500 uppercase tracking-widest text-xs mt-20 text-center">
                Failed to load Partitur.<br/>
                <span className="text-[10px] mt-2 block opacity-50">Local preview requires proxy. Deployment needs local PDF file.</span>
              </div>
            }
            className="flex items-center justify-center py-4"
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale}
              loading=""
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-[0_0_80px_rgba(0,0,0,0.8)] bg-white transition-all duration-300"
            />
          </Document>
        </div>

        {/* Footer shortcuts */}
        <div className="px-8 h-10 border-t border-white/5 flex items-center justify-center bg-black/40">
           <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-white/30 truncate">Use arrows to flip pages • +/- to scale • Space to scroll</span>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

const ScoreThumbnail: React.FC<{ url: string }> = ({ url }) => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    
    updateWidth();
    // Add a small delay to compensate for layout shifts
    const timer = setTimeout(updateWidth, 150);
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-white overflow-hidden pointer-events-none select-none">
      <Document
        file={url.startsWith('/') ? url : `/api/proxy-pdf?url=${encodeURIComponent(url)}`}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 rounded-full border-2 border-black/5 border-t-black/40 animate-spin" />
          </div>
        }
      >
        <Page 
          pageNumber={1} 
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading=""
        />
      </Document>
    </div>
  );
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [mainVideoPlaying, setMainVideoPlaying] = useState(false);
  const [activePhoenixVideo, setActivePhoenixVideo] = useState<number | null>(null);
  const [activeDrachenVideo, setActiveDrachenVideo] = useState<number | null>(null);

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const phoenixVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const drachenVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const projectIndex = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsScoreOpen(false);
    
    const stopMedia = (v: HTMLVideoElement | null) => { if (v) { try { v.pause(); v.src = ""; v.load(); } catch(e) {} } };
    stopMedia(mainVideoRef.current);
    phoenixVideoRefs.current.forEach(stopMedia);
    drachenVideoRefs.current.forEach(stopMedia);

    setMainVideoPlaying(false);
    setActivePhoenixVideo(null);
    setActiveDrachenVideo(null);
  }, [id]);

  if (!project) return null;

  const displayImage = project.stillImageUrl || project.imageUrl;
  const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;

  const handlePlayMain = () => {
    setMainVideoPlaying(true);
    setTimeout(() => safePlayMedia(mainVideoRef.current), 50);
  };

  const handlePlayPhoenix = (index: number) => {
    phoenixVideoRefs.current.forEach((v, i) => { if(i !== index && v) try { v.pause(); } catch(e) {} });
    setActivePhoenixVideo(index);
    setTimeout(() => safePlayMedia(phoenixVideoRefs.current[index]), 50);
  };

  const handlePlayDrachen = (index: number) => {
    drachenVideoRefs.current.forEach((v, i) => { if(i !== index && v) try { v.pause(); } catch(e) {} });
    setActiveDrachenVideo(index);
    setTimeout(() => safePlayMedia(drachenVideoRefs.current[index]), 50);
  };

  return (
    <div key={id} className="fade-in pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col relative">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest">
           <ArrowLeft size={16} className="mr-2" /> Back to Scoring
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-grow items-start">
        <div className="lg:col-span-4 relative">
          <div className={`${project.id === 'phoenix' ? '' : 'sticky top-32'}`}>
             <div className="bg-[#0a1221] p-6 border border-white/5 space-y-4">
              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Credits</h3>
              {project.fullCredits && Object.entries(project.fullCredits).map(([role, name]) => (
                <div key={role} className="flex justify-between text-sm">
                  <span className="text-gray-500">{role}</span>
                  <span className="text-gray-300 text-right whitespace-pre-line">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <div className="relative w-full aspect-video bg-black overflow-hidden mb-12 border border-white/5 shadow-2xl">
            <img src={displayImage || undefined} alt={project.title} className="w-full h-full object-cover object-center chrome-image-fix" />
            <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none" style={{ backgroundImage: noiseOverlay }}></div>
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#050a14] via-[#050a14]/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-10">
               <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                 <h1 className="text-4xl md:text-6xl text-white serif tracking-wide shadow-black drop-shadow-lg">{project.title}</h1>
                 <span className="text-xl md:text-2xl text-gray-400 font-light font-mono">{project.year}</span>
               </div>
               <p className="text-lg text-gray-300 font-light tracking-wide">{project.genre}</p>
            </div>
          </div>

          <div className="mb-16 px-2">
            <h2 className="text-xl serif text-white mb-4">Synopsis</h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed max-w-3xl">{project.synopsis}</p>
          </div>

          {project.id !== 'hero' && (
            <>
              <div className="relative mb-0">
                 {project.scorePdfUrl && (
                   <div className="mb-12 lg:mb-0 lg:absolute lg:top-0 lg:right-[calc(100%+3rem)] lg:w-[calc((100%-3rem)/2)] lg:h-full z-10 flex justify-center lg:block">
                      <div className="group relative h-full cursor-pointer flex items-center justify-center lg:w-full" onClick={() => setIsScoreOpen(true)}>
                          <div className="w-[180px] md:w-[240px] lg:w-auto lg:h-full aspect-[1/1.414] bg-white shadow-2xl flex flex-col opacity-95 group-hover:opacity-100 transition-all duration-500 relative overflow-hidden ring-1 ring-black/5 hover:scale-[1.02]">
                              {/* Real PDF Preview as Thumbnail */}
                              <div className="absolute inset-0 pointer-events-none select-none bg-white flex items-center justify-center overflow-hidden">
                                 <Document
                                   file={project.scorePdfUrl.startsWith('/') ? project.scorePdfUrl : `/api/proxy-pdf?url=${encodeURIComponent(project.scorePdfUrl)}`}
                                   className="w-full h-full flex items-center justify-center bg-white"
                                   loading={
                                     <div className="flex items-center justify-center h-full">
                                       <div className="w-8 h-8 rounded-full border-2 border-black/10 border-t-black/60 animate-spin" />
                                     </div>
                                   }
                                 >
                                   <Page 
                                     pageNumber={1} 
                                     width={300} 
                                     renderTextLayer={false}
                                     renderAnnotationLayer={false}
                                     className="w-full h-full object-contain"
                                   />
                                 </Document>
                              </div>

                              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/30 via-transparent to-transparent group-hover:opacity-0 transition-all duration-500"></div>

                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm">
                                 <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 mb-4 shadow-2xl">
                                   <Maximize2 size={24} className="text-white" />
                                 </div>
                                 <div className="text-center group-hover:scale-110 transition-all duration-500 flex flex-col items-center gap-1">
                                     <span className="text-white uppercase tracking-widest text-xs font-medium opacity-80 group-hover:opacity-100">View Score Excerpt</span>
                                 </div>
                              </div>
                          </div>
                      </div>
                   </div>
                 )}

                 <div className="w-full aspect-video bg-black relative border border-white/10 overflow-hidden shadow-lg">
                    <video 
                      key={`main-v-${project.id}`} 
                      ref={mainVideoRef}
                      src={mainVideoPlaying ? (
                        project.id === 'phoenix' ? SAMPLE_VIDEOS.phoenixTraum : 
                        project.id === 'drachen' ? SAMPLE_VIDEOS.drachen1 : 
                        project.id === 'cowboys' ? SAMPLE_VIDEOS.cowboy1 :
                        SAMPLE_VIDEOS.main
                      ) : undefined} 
                      poster={displayImage}
                      preload={mainVideoPlaying ? "auto" : "none"}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${mainVideoPlaying ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
                      controls={mainVideoPlaying}
                      onEnded={() => setMainVideoPlaying(false)}
                    />
                    {!mainVideoPlaying && (
                      <div className="absolute inset-0 z-10 cursor-pointer group" onClick={handlePlayMain}>
                        <img src={displayImage || undefined} className="absolute inset-0 w-full h-full object-cover blur-[5px] scale-[1.05] transition-all duration-700 group-hover:scale-[1.08] group-hover:blur-[0.3px] chrome-image-fix" alt="Thumbnail" />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                              <Play size={32} fill="currentColor" className="text-white ml-1" />
                          </div>
                          <div className="text-center group-hover:scale-110 transition-all duration-500 flex flex-col items-center gap-1">
                              <span className="text-white uppercase tracking-widest text-xs font-medium opacity-80 group-hover:opacity-100">Play Excerpt 1</span>
                              {project.id === 'phoenix' && <span className="text-white uppercase tracking-widest text-[10px] md:text-xs font-medium opacity-70 group-hover:opacity-100">{phoenixTitles[0]}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                 </div>
              </div>
              
              <p className="text-xs text-gray-600 my-2 text-center uppercase tracking-wider">For portfolio and demonstration purposes only</p>

              <MinimalAudioPlayer 
                label="Excerpt 1"
                title={project.id === 'cowboys' ? "COWBOY" : project.id === 'phoenix' ? phoenixTitles[0] : project.id === 'drachen' ? "Gangstergitarre" : "Main Theme"}
                src={project.id === 'phoenix' ? PHOENIX_AUDIO_01 : (project.id === 'drachen' ? DRACHEN_AUDIO_01 : (project.id === 'cowboys' ? COWBOY_AUDIO_01 : undefined))}
                className="mb-12" 
              />
            </>
          )}
          
          {project.id === 'phoenix' && (
            <div className="space-y-12">
              {Array.from({ length: 8 }).map((_, index) => {
                const videoSrc = index === 0 ? SAMPLE_VIDEOS.phoenixHypnosis : 
                               (index === 1 ? SAMPLE_VIDEOS.phoenixBalcony : 
                               (index === 2 ? SAMPLE_VIDEOS.phoenixLinus : 
                               (index === 3 ? SAMPLE_VIDEOS.phoenixRelapse : 
                               (index === 4 ? SAMPLE_VIDEOS.phoenixCredits : 
                               (index === 5 ? SAMPLE_VIDEOS.phoenixDoubts : 
                               (index === 6 ? SAMPLE_VIDEOS.phoenixFinale : 
                               (index === 7 ? SAMPLE_VIDEOS.phoenixLoveScene : SAMPLE_VIDEOS.phoenixOthers)))))));
                const uniqueKey = `phx-v-${project.id}-${index}`;
                
                const thumbUrl = (index === 0) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/16zu9.jpeg" 
                  : (index === 1) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/liebesszene.jpeg"
                  : (index === 2) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/balkon.jpeg"
                  : (index === 3) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/linus.jpeg"
                  : (index === 4) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/phoenix.jpeg"
                  : (index === 5) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/rueckfall.jpeg"
                  : (index === 6) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/zweifel.jpeg"
                  : (index === 7) ? "https://phoenix-media.b-cdn.net/Ph%C3%B6nix%20(2026)/3_stills/finale.jpeg"
                  : `https://picsum.photos/800/450?random=${100 + index}`;
                
                return (
                  <div key={uniqueKey}>
                    <div className="w-full aspect-video bg-black relative border border-white/10 overflow-hidden shadow-lg">
                        <video 
                          ref={el => phoenixVideoRefs.current[index] = el}
                          src={activePhoenixVideo === index ? videoSrc : undefined} 
                          poster={thumbUrl}
                          preload={activePhoenixVideo === index ? "auto" : "none"}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activePhoenixVideo === index ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
                          controls={activePhoenixVideo === index}
                          onEnded={() => setActivePhoenixVideo(null)}
                        />
                        {activePhoenixVideo !== index && (
                          <div className="absolute inset-0 z-10 cursor-pointer group" onClick={() => handlePlayPhoenix(index)}>
                            <img src={thumbUrl || undefined} className="absolute inset-0 w-full h-full object-cover blur-[5px] scale-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:blur-[0.3px] chrome-image-fix" alt="Thumbnail" />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                                 <Play size={32} fill="currentColor" className="text-white ml-1" />
                              </div>
                              <div className="text-center group-hover:scale-110 transition-all duration-500 flex flex-col items-center gap-1">
                                  <span className="text-white uppercase tracking-widest text-xs font-medium opacity-80 group-hover:opacity-100">Play Excerpt {index + 2}</span>
                                  <span className="text-white uppercase tracking-widest text-[10px] md:text-xs font-medium opacity-70 group-hover:opacity-100">{phoenixTitles[index + 1]}</span>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                    <MinimalAudioPlayer 
                      label={`Excerpt ${index + 2}`} 
                      title={phoenixTitles[index + 1]} 
                      src={index === 0 ? PHOENIX_AUDIO_02 : (index === 1 ? PHOENIX_AUDIO_03 : (index === 2 ? PHOENIX_AUDIO_04 : (index === 3 ? PHOENIX_AUDIO_05 : (index === 4 ? PHOENIX_AUDIO_06 : (index === 5 ? PHOENIX_AUDIO_07 : (index === 6 ? PHOENIX_AUDIO_08 : (index === 7 ? PHOENIX_AUDIO_09 : undefined)))))))}
                      className="mt-2" 
                    />
                  </div>
                );
              })}
            </div>
          )}

          {project.id === 'drachen' && (
            <div className="space-y-12">
              {Array.from({ length: 6 }).map((_, index) => {
                const uniqueKey = `dra-v-${project.id}-${index}`;
                const videoSrc = index === 0 ? SAMPLE_VIDEOS.drachen2 
                               : index === 1 ? SAMPLE_VIDEOS.drachen3
                               : index === 2 ? SAMPLE_VIDEOS.drachen4
                               : index === 3 ? SAMPLE_VIDEOS.drachen5
                               : index === 4 ? SAMPLE_VIDEOS.drachen6
                               : SAMPLE_VIDEOS.drachen7;

                const thumbUrl = index === 0 
                  ? "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/3_stills/still1.jpeg"
                  : index === 1 
                  ? "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/3_stills/still3.jpeg"
                  : index === 2
                  ? "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/3_stills/still4.jpeg"
                  : index === 3
                  ? "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/3_stills/still5.jpeg"
                  : index === 4
                  ? "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/3_stills/still6.jpeg"
                  : index === 5
                  ? "https://phoenix-media.b-cdn.net/Drachen-Takelage%20(2026)/3_stills/still7.jpeg"
                  : `https://picsum.photos/800/450?random=${200 + index}`;
                
                return (
                  <div key={uniqueKey}>
                    <div className="w-full aspect-video bg-black relative border border-white/10 overflow-hidden shadow-lg">
                        <video 
                          ref={el => drachenVideoRefs.current[index] = el}
                          src={activeDrachenVideo === index ? videoSrc : undefined} 
                          poster={thumbUrl}
                          preload={activeDrachenVideo === index ? "auto" : "none"}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activeDrachenVideo === index ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
                          controls={activeDrachenVideo === index}
                          onEnded={() => setActiveDrachenVideo(null)}
                        />
                        {activeDrachenVideo !== index && (
                          <div className="absolute inset-0 z-10 cursor-pointer group" onClick={() => handlePlayDrachen(index)}>
                              <img src={thumbUrl || undefined} className="absolute inset-0 w-full h-full object-cover blur-[5px] scale-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:blur-[0.3px] chrome-image-fix" alt="Thumbnail" />
                              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
                              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                                  <Play size={32} fill="currentColor" className="text-white ml-1" />
                                </div>
                                <span className="text-white uppercase tracking-widest text-xs font-medium opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">Play Excerpt {index + 2}</span>
                              </div>
                          </div>
                        )}
                    </div>
                    {/* Verstecke den Audioplayer für index 1 (Track 3) und index 5 (Track 7) bei Drachen-Takelage */}
                    {!(project.id === 'drachen' && (index === 1 || index === 5)) && (
                      <MinimalAudioPlayer 
                        label={`Excerpt ${index + 2}`} 
                        title={
                          project.id === 'drachen' 
                            ? (index === 0 ? "Flockenlesen" : (index === 2 ? "Flockenlesen (2023)" : (index === 3 ? "Ugly Wedding" : (index === 4 ? "Postkarte No. III (Zithernde Knie)" : `Track ${index + 2}`)))) 
                            : `Track ${index + 2}`
                        } 
                        src={index === 0 ? DRACHEN_AUDIO_02 : (index === 2 ? DRACHEN_AUDIO_04 : (index === 3 ? DRACHEN_AUDIO_05 : (index === 4 ? DRACHEN_AUDIO_06 : undefined)))} 
                        className="mt-2" 
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 flex justify-end border-t border-white/5 pt-8">
        <Link to={`/project/${nextProject.id}`} className="inline-flex items-center text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest">
          Next: {nextProject.title} <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>

      {isScoreOpen && project.scorePdfUrl && (
        <ScoreModal 
          url={project.scorePdfUrl} 
          onClose={() => setIsScoreOpen(false)} 
          title={project.title} 
        />
      )}
    </div>
  );
};

export default ProjectDetail;