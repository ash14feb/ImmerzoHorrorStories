import { Download, Play } from 'lucide-react';
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
    <div className="group flex flex-col overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all hover:border-red-900/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden bg-zinc-950">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600">
            No Image
          </div>
        )}
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => onPlay(project)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-red-500"
            aria-label={`Play ${project.title}`}
          >
            <Play className="ml-1 h-8 w-8 fill-current" />
          </button>
        </div>

        {/* Duration Badge */}
        {project.duration && (
          <div className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {formatDuration(project.duration)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold leading-tight text-zinc-100 line-clamp-2">
          {project.title}
        </h3>
        <p className="mb-6 flex-1 text-sm text-zinc-400 line-clamp-3">
          {project.description}
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-zinc-800">
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              <Download className="h-4 w-4" />
              Video
            </a>
          )}
          {project.audioUrl && (
            <a
              href={project.audioUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              <Download className="h-4 w-4" />
              Audio
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
