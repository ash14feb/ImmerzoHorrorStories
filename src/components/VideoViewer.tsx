import { useState, useRef, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { VideoProject } from '../types';

interface VideoViewerProps {
  project: VideoProject;
  onClose: () => void;
}

export function VideoViewer({ project, onClose }: VideoViewerProps) {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!project.videoUrl) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
        <div className="rounded-xl bg-zinc-900 p-8 text-center border border-zinc-800">
          <p className="text-xl text-zinc-100">No video available for this project.</p>
          <button 
            onClick={onClose}
            className="mt-6 rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleError = () => {
    setLoading(false);
    if (videoRef.current?.error) {
      if (videoRef.current.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        setErrorMsg("Your browser does not support this video format (HEVC). Please try a different browser like Safari, or download the video.");
      } else {
        setErrorMsg(`Video error: ${videoRef.current.error.message || videoRef.current.error.code}`);
      }
    } else {
      setErrorMsg("Video playback failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black animate-in fade-in duration-300">
      {/* Header / Controls overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="px-2">
          <h2 className="text-xl font-bold text-white shadow-black drop-shadow-md">
            {project.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-red-600/80"
          aria-label="Close Viewer"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {errorMsg ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6 text-center gap-6">
          <p className="text-xl font-medium text-red-400 max-w-lg">{errorMsg}</p>
          <div className="flex gap-4">
            <a 
              href={project.videoUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-zinc-800 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Download Video Instead
            </a>
            <button 
              onClick={onClose}
              className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
            >
              Close Viewer
            </button>
          </div>
        </div>
      ) : (
        <>
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-red-500 gap-4 pointer-events-none">
              <Loader2 className="h-12 w-12 animate-spin" />
              <p className="font-medium tracking-widest text-zinc-400 uppercase text-sm">Loading Experience</p>
            </div>
          )}

          {/* Standard Video Player */}
          <div className="flex h-full w-full items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={project.videoUrl}
              className="h-full w-full object-contain"
              controls
              autoPlay
              playsInline
              crossOrigin="anonymous"
              onCanPlay={() => setLoading(false)}
              onError={handleError}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      )}
    </div>
  );
}
