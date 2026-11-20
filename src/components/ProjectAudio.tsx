import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { getWaveform } from "@/data/waveforms";

interface Props {
  project: Project;
  /** Classes for the framed box around the player. */
  className?: string;
}

const formatTime = (seconds: number): string => {
  const total = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

/**
 * Plays a case's audio (a radio ad, an audio story). The file streams from the
 * CDN and nothing is fetched until a visitor presses play, so there is no
 * download affordance anywhere: the browser's own player bar is never shown,
 * the save button is turned off, and right-click "Save audio as" is blocked.
 */
const ProjectAudio = ({ project, className = "" }: Props) => {
  const url = project.audioUrl;
  const bars = getWaveform(project.slug);
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(project.audioDuration ?? 0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    // A new case always starts from the top and stopped.
    setCurrent(0);
    setPlaying(false);
  }, [url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      setCurrent(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
      // Stop on unmount, but only if something is actually playing.
      if (!audio.paused) audio.pause();
    };
  }, [url]);

  if (!url) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  const seekTo = (clientX: number) => {
    const track = trackRef.current;
    const audio = audioRef.current;
    if (!track || !audio || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const target = ratio * duration;
    // Streaming files can report a non-finite length; seeking then would throw.
    if (!Number.isFinite(target)) return;
    audio.currentTime = target;
    setCurrent(target);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const step = { ArrowRight: 2, ArrowLeft: -2, ArrowUp: 2, ArrowDown: -2 }[event.key];
    if (step !== undefined) {
      event.preventDefault();
      audio.currentTime = Math.min(duration, Math.max(0, audio.currentTime + step));
      setCurrent(audio.currentTime);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      audio.currentTime = event.key === "Home" ? 0 : duration;
      setCurrent(audio.currentTime);
    }
  };

  const progress = duration ? Math.min(1, current / duration) : 0;
  const blockSave = (event: React.MouseEvent) => event.preventDefault();

  return (
    <div
      className={`rounded-xl border border-border bg-secondary/40 p-4 sm:p-5 ${className}`}
      onContextMenu={blockSave}
    >
      <audio
        ref={audioRef}
        src={url}
        preload="none"
        controlsList="nodownload noremoteplayback"
        onContextMenu={blockSave}
        className="hidden"
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause the audio" : "Play the audio"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="font-body text-[10px] uppercase tracking-[0.24em] text-primary">
              Listen
            </span>
            <span className="font-body text-[11px] tabular-nums tracking-[0.12em] text-muted-foreground">
              {formatTime(current)} / {formatTime(duration)}
            </span>
          </div>

          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label="Seek through the audio"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
            aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
            onKeyDown={onKeyDown}
            onPointerDown={(event) => {
              event.preventDefault();
              setDragging(true);
              try {
                event.currentTarget.setPointerCapture?.(event.pointerId);
              } catch {
                // Older browsers without pointer capture still seek and drag fine.
              }
              seekTo(event.clientX);
            }}
            onPointerMove={(event) => dragging && seekTo(event.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            className={`flex h-10 select-none items-center gap-[2px] outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              dragging ? "cursor-grabbing" : "cursor-pointer"
            }`}
          >
            {bars.length > 0
              ? bars.map((peak, index) => (
                  <span
                    key={index}
                    style={{ height: `${Math.max(6, Math.round(peak * 100))}%` }}
                    className={`w-full min-w-[2px] flex-1 rounded-full transition-colors ${
                      (index + 0.5) / bars.length <= progress ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))
              : (
                <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-border">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ width: `${progress * 100}%` }}
                  />
                </span>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAudio;
