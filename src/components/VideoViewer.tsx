import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useState, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { VideoProject } from '../types';

interface VideoViewerProps {
  project: VideoProject;
  onClose: () => void;
}

function VideoSphere({ url, onReady }: { url: string; onReady: () => void }) {
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    vid.muted = false; // We want audio
    vid.playsInline = true;
    vid.src = url;
    return vid;
  });

  useEffect(() => {
    let mounted = true;

    const handleCanPlay = () => {
      if (mounted) {
        onReady();
        video.play().catch((err) => console.error("Video playback failed:", err));
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.load();

    return () => {
      mounted = false;
      video.removeEventListener('canplay', handleCanPlay);
      video.pause();
      video.src = '';
      video.load();
    };
  }, [video, onReady, url]);

  return (
    <mesh scale={[-1, 1, 1]}>
      {/* 
        We use scale={[-1, 1, 1]} instead of side={THREE.BackSide} to mirror 
        the inside of the sphere, ensuring correct left/right orientation for 360 videos 
      */}
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
      </meshBasicMaterial>
    </mesh>
  );
}

export function VideoViewer({ project, onClose }: VideoViewerProps) {
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="fixed inset-0 z-50 bg-black animate-in fade-in duration-300">
      {/* Header / Controls overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="px-2">
          <h2 className="text-xl font-bold text-white shadow-black drop-shadow-md">
            {project.title}
          </h2>
          <p className="text-sm text-zinc-300 shadow-black drop-shadow-md">
            Drag to look around
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-red-600/80"
          aria-label="Close Viewer"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-red-500 gap-4">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p className="font-medium tracking-widest text-zinc-400 uppercase text-sm">Loading Experience</p>
        </div>
      )}

      {/* 360 Canvas */}
      <div className="h-full w-full cursor-move">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 80 }}>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={-0.5} // Invert rotation since we are inside the sphere
          />
          <VideoSphere url={project.videoUrl} onReady={() => setLoading(false)} />
        </Canvas>
      </div>
    </div>
  );
}
