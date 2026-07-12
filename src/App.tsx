/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import rawData from './data.json';
import type { VideoProject } from './types';
import { VideoViewer } from './components/VideoViewer';
import { VideoRow } from './components/VideoRow';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Process data on initial load
  const projects: VideoProject[] = useMemo(() => {
    return rawData.Project.map((p) => {
      const thumb = rawData.Media.find((m) => m.Id === p.Thumbnail)?.Url;
      const audio = rawData.Media.find((m) => m.Id === p.Audio)?.Url;
      const videoObj = rawData.Video.find((v) => v.Id === p.Video);
      const video = videoObj?.DownloadUrl;

      return {
        id: p.Id,
        title: p.Title,
        description: p.Description,
        thumbnailUrl: thumb,
        audioUrl: audio,
        videoUrl: video,
        duration: videoObj?.Duration,
      };
    });
  }, []);

  const heroProjects = useMemo(() => projects.slice(0, 5), [projects]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroProjects.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroProjects.length]);

  const nextHero = () => setCurrentHeroIndex((prev) => (prev + 1) % heroProjects.length);
  const prevHero = () => setCurrentHeroIndex((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);

  const heroProject = heroProjects[currentHeroIndex];
  
  // Create some fake rows for Netflix feel
  const trendingNow = projects.slice(1, 8);
  const newReleases = projects.slice(8, 15);
  const topPicks = projects.slice(15, 24);

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <header className={`fixed top-0 z-40 w-full transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="px-4 sm:px-12 flex h-16 items-center gap-8">
          <h1 className="text-2xl font-bold tracking-tight text-red-600 sm:text-3xl font-sans">
            IMMERZO
          </h1>
          <nav className="hidden md:flex gap-4 text-sm font-medium text-zinc-300">
            <a href="#" className="text-white hover:text-zinc-300 transition-colors">Home</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">TV Shows</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Movies</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">New & Popular</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">My List</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {heroProject && (
        <div className="relative h-[80vh] w-full group overflow-hidden">
          {heroProjects.map((proj, idx) => (
            <div 
              key={proj.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentHeroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {proj.thumbnailUrl && (
                <img 
                  src={proj.thumbnailUrl} 
                  alt={proj.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          ))}

          {/* Slider Controls */}
          <button 
            onClick={prevHero} 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>
          <button 
            onClick={nextHero} 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-[25%] left-4 sm:left-12 z-20 flex gap-2">
            {heroProjects.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentHeroIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === currentHeroIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-[30%] left-4 sm:left-12 max-w-2xl z-20">
            <h1 key={`${heroProject.id}-title`} className="text-4xl sm:text-6xl font-bold text-white mb-4 shadow-black drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
              {heroProject.title}
            </h1>
            <p key={`${heroProject.id}-desc`} className="text-lg text-white mb-6 drop-shadow-md line-clamp-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {heroProject.description}
            </p>
            <div key={`${heroProject.id}-btns`} className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <button 
                onClick={() => setActiveProject(heroProject)}
                className="flex items-center gap-2 rounded bg-white px-6 py-2.5 text-lg font-bold text-black transition-colors hover:bg-neutral-300"
              >
                <Play className="h-6 w-6 fill-current" />
                Play
              </button>
              <button className="flex items-center gap-2 rounded bg-zinc-500/70 px-6 py-2.5 text-lg font-bold text-white transition-colors hover:bg-zinc-500/50">
                <Info className="h-6 w-6" />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Rows */}
      <main className="relative z-20 -mt-24 pb-12 overflow-hidden">
        <VideoRow title="Trending Now" projects={trendingNow} onPlay={setActiveProject} />
        <VideoRow title="New Releases" projects={newReleases} onPlay={setActiveProject} />
        <VideoRow title="Top Picks for You" projects={topPicks} onPlay={setActiveProject} />
      </main>

      {/* Video Viewer Modal */}
      {activeProject && (
        <VideoViewer
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}
