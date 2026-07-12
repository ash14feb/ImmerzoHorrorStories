/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import rawData from './data.json';
import type { VideoProject } from './types';
import { VideoViewer } from './components/VideoViewer';
import { VideoRow } from './components/VideoRow';
import { Play, Info } from 'lucide-react';

export default function App() {
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const heroProject = projects[0];
  
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
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0">
            {heroProject.thumbnailUrl && (
              <img 
                src={heroProject.thumbnailUrl} 
                alt={heroProject.title}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-[20%] left-4 sm:left-12 max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 shadow-black drop-shadow-lg">
              {heroProject.title}
            </h1>
            <p className="text-lg text-white mb-6 drop-shadow-md line-clamp-3">
              {heroProject.description}
            </p>
            <div className="flex items-center gap-4">
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
      <main className="relative z-10 -mt-24 pb-12 overflow-hidden">
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
