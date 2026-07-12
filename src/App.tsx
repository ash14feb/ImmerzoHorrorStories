/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import rawData from './data.json';
import type { VideoProject } from './types';
import { VideoCard } from './components/VideoCard';
import { VideoViewer } from './components/VideoViewer';
import { Skull } from 'lucide-react';

export default function App() {
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-red-900/30 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-950 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                <Skull className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Immerzo
                </h1>
                <p className="text-xs font-medium uppercase tracking-widest text-red-500">
                  Horror Room Stories
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">The Dark Library</h2>
          <p className="max-w-2xl text-zinc-400">
            Immersive 360° experiences designed to test your courage. 
            Download the raw files or face the terror directly in your browser.
            Headphones strongly recommended.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              onPlay={(p) => setActiveProject(p)}
            />
          ))}
        </div>
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
