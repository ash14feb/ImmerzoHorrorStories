import { Download, Play, Music } from 'lucide-react';
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
    <div className="group relative flex flex-col h-full overflow-hidden rounded-md bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:z-10 cursor-default">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden bg-zinc-950 cursor-pointer flex-shrink-0" onClick={() => onPlay(project)}>
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
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white backdrop-blur-sm transition-transform hover:scale-110 shadow-lg">
            <Play className="ml-1 h-6 w-6 fill-current" />
          </div>
        </div>

        {/* Duration Badge */}
        {project.duration && (
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white shadow-sm">
            {formatDuration(project.duration)}
          </div>
        )}
      </div>

      {/* Content Always Visible */}
      <div className="flex flex-1 flex-col p-4 bg-zinc-900">
        <h3 className="mb-2 text-base font-bold leading-tight text-zinc-100 line-clamp-1 group-hover:text-red-500 transition-colors" title={project.title}>
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-zinc-400 line-clamp-3" title={project.description}>
          {project.description}
        </p>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-800/80">
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-zinc-800/80 px-2 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              title="Download Video"
            >
              <Download className="h-3.5 w-3.5" />
              Video
            </a>
          )}
          {project.audioUrl && (
            <a
              href={project.audioUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-zinc-800/80 px-2 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              title="Download Audio"
            >
              <Music className="h-3.5 w-3.5" />
              Audio
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
