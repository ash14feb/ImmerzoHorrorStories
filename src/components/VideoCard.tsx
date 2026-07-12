import { Download, Play, Info } from 'lucide-react';
import type { VideoProject } from '../types';

interface VideoCardProps {
  project: VideoProject;
  onPlay: (project: VideoProject) => void;
}

function formatDuration(ms?: number) {
  if (!ms) return null;
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function VideoCard({ project, onPlay }: VideoCardProps) {
  return (
    <div className="group relative flex flex-col overflow-visible rounded-md bg-zinc-900 transition-all duration-300 hover:scale-110 hover:z-50 hover:shadow-2xl">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden rounded-md bg-zinc-950 cursor-pointer" onClick={() => onPlay(project)}>
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600">
            No Image
          </div>
        )}
        
        {/* Duration Badge */}
        {project.duration && (
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white shadow-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            {formatDuration(project.duration)}
          </div>
        )}
      </div>

      {/* Expanded Content (Hover State) */}
      <div className="absolute top-full left-0 right-0 z-50 flex-col gap-2 rounded-b-md bg-zinc-900 p-4 shadow-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto hidden group-hover:flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlay(project)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-neutral-300"
            >
              <Play className="ml-1 h-4 w-4 fill-current" />
            </button>
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-500 bg-transparent text-white transition-colors hover:border-white hover:bg-zinc-800"
                title="Download Video"
              >
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-500 bg-transparent text-white transition-colors hover:border-white hover:bg-zinc-800">
            <Info className="h-4 w-4" />
          </button>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-green-500">98% Match</span>
            <span className="border border-zinc-600 px-1 text-zinc-400">HD</span>
            {project.duration && <span className="text-zinc-200">{formatDuration(project.duration)}</span>}
          </div>
          <h3 className="mt-1 text-sm font-bold text-white line-clamp-1">{project.title}</h3>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
