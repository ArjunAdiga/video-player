import React from "react";
import { useRef, useState } from "react";
import { Pause,Play ,FastForward, Rewind ,VolumeOff,Volume2} from 'lucide-react';



export default function VideoPlayer({ video }) {
  const playerRef = useRef(null);
  const videoElRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);

  

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const handleSeek = (value) => {
    playerRef.current?.seekTo(value, "fraction");
    setProgress(value);
  };

  const skip = (seconds) => {
    const current = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(current + seconds, "seconds");
  };


  React.useEffect(() => {
    const el = videoElRef.current;
    if (!el) return;
    if (playing) {
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch((err) => console.warn("Play prevented:", err));
      }
    } else {
      el.pause();
    }
  }, [playing]);

  
  React.useEffect(() => {
    const el = videoElRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  return (
    <div className="fixed inset-0 bg-black pb-10 sm:pb-14">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-7xl aspect-video">
          <video
            src={video.mediaUrl}
            className="w-full  h-[80vh] bg-black"
            
            autoPlay
            muted={muted}
            playsInline
            preload="auto"
            onLoadedData={(e) => {
              const d = e.currentTarget.duration;
              if (!isNaN(d)) setDuration(d);
              setPlaying(true);
            }}
            onTimeUpdate={(e) => {
              const current = e.currentTarget.currentTime;
              const d = e.currentTarget.duration || duration || 1;
              setProgress(current / d);
            }}
            onError={(e) => {
              console.error("HTML5 video error:", e);
            }}
            ref={(el) => {
              videoElRef.current = el;
            
              playerRef.current = {
                seekTo: (value, type) => {
                  if (!el) return;
                  if (type === "fraction") {
                    el.currentTime = value * (el.duration || 0);
                  } else {
                    el.currentTime = value;
                  }
                },
                getCurrentTime: () => (el ? el.currentTime : 0),
              };
            }}
          />

          <div className="absolute inset-x-0 bottom-8 sm:bottom-8 z-30">
            <div className="pointer-events-auto mx-3 sm:mx-4 rounded-lg bg-black/80 backdrop-blur p-3 sm:p-4 text-white flex items-center gap-3 sm:gap-4 shadow-lg">
              <button
                aria-label="Skip back 10 seconds"
                onClick={() => skip(-10)}
              >
                <Rewind size={16} />
              </button>
              <button
                aria-label={playing ? "Pause" : "Play"}
                onClick={handlePlayPause}
              >
                {playing ? <Pause size={16} />     : <Play size={16} /> }
              </button>
              <button
                aria-label={muted ? "Unmute" : "Mute"}
                onClick={() => setMuted((m) => !m)}
              >
                {muted ? <VolumeOff size={16} />  :  <Volume2 size={16} />}
              </button>
              <button
                aria-label="Skip forward 10 seconds"
                onClick={() => skip(10)}
              >
                <FastForward size={16} />
              </button>
              <div className="flex-1" />
              <div className="flex items-center flex-col tablet:flex-row">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="0.01"
                  value={progress}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-40 sm:w-[40vw] md:w-[50vw] accent-white/90"
                  aria-label="Seek"
                />
                <div className="text-[11px] sm:text-sm ml-2 whitespace-nowrap drop-shadow">
                  {Math.floor(progress * duration)}s / {Math.floor(duration)}s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
