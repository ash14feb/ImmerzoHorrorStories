import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { VideoProject } from '../types';
import { VideoCard } from './VideoCard';

interface VideoRowProps {
  title: string;
  projects: VideoProject[];
  onPlay: (project: VideoProject) => void;
}

export function VideoRow({ title, projects, onPlay }: VideoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 relative group">
      <h2 className="text-xl font-bold text-white mb-4 px-4 sm:px-12 transition-colors">{title}</h2>
      
      <div className="relative">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
        >
          <ChevronLeft className="text-white h-8 w-8" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex gap-2 overflow-x-auto px-4 sm:px-12 pb-8 pt-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div key={project.id} className="flex-none w-[280px] sm:w-[320px] md:w-[360px] snap-start">
              <VideoCard project={project} onPlay={onPlay} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
        >
          <ChevronRight className="text-white h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
