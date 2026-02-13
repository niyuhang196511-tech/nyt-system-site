"use client";

import React, { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider"; // shadcn Slider
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // shadcn Popover
import { Switch } from "@/components/ui/switch"; // shadcn Switch
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // shadcn Select
import { Button } from "@/components/ui/button"; // optional
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Image,
  Maximize2,
  Minimize2,
  ImageMinus,
  RefreshCw,
  Cpu,
} from "lucide-react";
import gsap from "gsap";
import Hls from "hls.js";

type Source = { label: string; url: string; value: string };

export default function ProVideoPlayer({
  poster,
  videoName,
  sources,
  initialQuality,
}: {
  poster?: string;
  videoName: string;
  sources: Source[];
  initialQuality?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 100
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [quality, setQuality] = useState<string | undefined>(
    initialQuality ?? sources[0]?.value,
  );

  const [showControls, setShowControls] = useState(true);
  const [isSeeking] = useState(false);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);

  // ---------- Load source (Option A: multiple files)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const srcObj = sources.find((s) => s.value === quality) ?? sources[0];
    const src = srcObj?.url ?? "";

    // destroy previous HLS
    if (hlsInstance) {
      hlsInstance.destroy();
      setHlsInstance(null);
    }

    if (src.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(v);
        setHlsInstance(hls);
      } else {
        v.src = src;
      }
    } else {
      // normal mp4
      // preserve time & play state
      const currentTime = v.currentTime || 0;
      const wasPlaying = !v.paused;
      v.src = src;
      const onLoaded = () => {
        // restore time if possible
        try {
          v.currentTime = Math.min(currentTime, v.duration || currentTime);
        } catch {}
        if (wasPlaying || autoplay) {
          v.play().catch(() => {});
        }
        v.removeEventListener("loadedmetadata", onLoaded);
      };
      v.addEventListener("loadedmetadata", onLoaded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality, sources]);

  // ---------- video event bindings
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      if (!v.duration || isNaN(v.duration)) return;
      if (!isSeeking) {
        setProgress((v.currentTime / v.duration) * 100);
      }
    };
    const onLoaded = () => {
      if (v.duration && !isNaN(v.duration)) setDuration(v.duration);
      if (autoplay) {
        v.play().catch(() => {});
      }
    };
    const onEnded = () => {
      setPlaying(false);
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("ended", onEnded);
    };
  }, [autoplay, isSeeking]);

  // ---------- auto-hide controls
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const show = () => {
      setShowControls(true);
      clearTimeout(t);
      t = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
    // initial show
    show();

    const events = ["mousemove", "touchstart", "touchmove"];
    events.forEach((ev) => el.addEventListener(ev, show));
    return () => {
      events.forEach((ev) => el.removeEventListener(ev, show));
      clearTimeout(t);
    };
  }, []);

  // ---------- volume / muted
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.muted = muted;
  }, [volume, muted]);

  // ---------- speed
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = speed;
  }, [speed]);

  // ---------- loop
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.loop = loop;
  }, [loop]);

  // ---------- play / pause
  const togglePlay = async () => {
    const v = videoRef.current!;
    if (!v) return;
    if (v.paused) {
      await v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  // ---------- seek
  const handleSeek = (val: number[]) => {
    const v = videoRef.current!;
    if (!v || !v.duration) return;
    const pct = val[0];
    v.currentTime = (pct / 100) * v.duration;
    setProgress(pct);
  };

  // on commit (optional)
  // const handleSeekStart = () => setIsSeeking(true);
  // const handleSeekEnd = (val?: number[]) => {
  //   setIsSeeking(false);
  //   if (val && videoRef.current && videoRef.current.duration) {
  //     videoRef.current.currentTime = (val[0] / 100) * videoRef.current.duration;
  //   }
  // };

  // ---------- change quality (preserve time & play state)
  const changeQuality = async (newQ: string) => {
    if (newQ === quality) return;
    const v = videoRef.current!;
    const currentTime = v.currentTime || 0;
    const wasPlaying = !v.paused;
    setQuality(newQ);

    // small delay to let new src attach (use loadedmetadata to accurately restore time)
    const restore = () => {
      try {
        if (v.duration) v.currentTime = Math.min(currentTime, v.duration);
      } catch {}
      if (wasPlaying || autoplay) v.play().catch(() => {});
      v.removeEventListener("loadedmetadata", restore);
    };
    v.addEventListener("loadedmetadata", restore);
  };

  // ---------- screenshot
  const handleScreenshot = () => {
    const v = videoRef.current!;
    if (!v) return;
    const canvas = document.createElement("canvas");
    const w = v.videoWidth || 1280;
    const h = v.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // draw current frame
    ctx.drawImage(v, 0, 0, w, h);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `screenshot-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  // ---------- Picture-in-Picture
  const togglePiP = async () => {
    const v = videoRef.current!;
    if (!v) return;
    // @ts-ignore
    if (document.pictureInPictureElement) {
      // @ts-ignore
      await document.exitPictureInPicture();
    } else if (v.requestPictureInPicture) {
      try {
        // @ts-ignore
        await v.requestPictureInPicture();
      } catch {}
    }
  };

  // ---------- full screen
  const toggleFullscreen = async () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await el.requestFullscreen().catch(() => {});
    }
  };

  // ---------- mobile swipe: left/right to seek
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!videoRef.current) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      // horizontal dominant -> seek
      if (Math.abs(dx) > Math.abs(dy)) {
        // change currentTime proportional to dx
        const v = videoRef.current;
        if (!v.duration) return;
        v.currentTime = Math.max(
          0,
          Math.min(v.duration, v.currentTime + dx * 0.05),
        ); // tweak sensitivity
      } else {
        // vertical -> volume adjust
        // const v = videoRef.current;
        let newVol = volume - dy / 300;
        newVol = Math.max(0, Math.min(1, newVol));
        setVolume(newVol);
      }
    };
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [volume]);

  // ---------- simple GSAP control fade (optional)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const controls = el.querySelector(".controls-root") as HTMLElement | null;
    if (!controls) return;
    gsap.to(controls, {
      opacity: showControls ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [showControls]);

  // ---------- helpers
  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "00:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ aspectRatio: "16/9" }}
      >
        {/* video element */}
        <video
          ref={videoRef}
          poster={poster}
          className="h-full w-full bg-black object-cover"
          onClick={togglePlay}
        />

        {/* center big play */}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50"
            aria-label="play"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Play size={16} />
            </div>
          </button>
        )}

        {/* top-left small label */}
        <div className="absolute top-4 left-4 z-30 text-sm">{videoName}</div>

        {/* controls (inside video) */}
        <div
          className="controls-root absolute right-0 bottom-0 left-0 z-40 px-4 pb-4"
          style={{ pointerEvents: showControls ? "auto" : "none" }}
        >
          {/* glass gradient */}
          <div className="pointer-events-none absolute inset-0 -top-24 bg-linear-to-t from-black/70 to-transparent" />

          <div className="relative flex flex-col gap-3">
            {/* progress (clickable) */}
            <div
              className="relative h-2 w-full cursor-pointer rounded-full bg-white/10"
              onClick={(e) => {
                const target = e.currentTarget as HTMLElement; // 永远是最外层进度条
                const rect = target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const pct = (x / rect.width) * 100;
                handleSeek([pct]);
              }}
            >
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-white/20"
                style={{ width: `${Math.min(progress + 6, 100)}%` }}
              />
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* controls row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="rounded-md bg-black/30 p-2 text-white/95 hover:bg-white/5"
                >
                  {playing ? <Pause /> : <Play />}
                </button>

                <div className="text-sm text-white/80">
                  {fmt((progress / 100) * duration)} / {fmt(duration)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* volume (sm hidden on very small screens) */}
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    onClick={() => {
                      setMuted((m) => !m);
                      setMuted(!muted);
                    }}
                    className="text-white/90"
                  >
                    {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
                  </button>
                  {/* shadcn Slider (0 - 100) */}
                  <div className="w-28">
                    <Slider
                      value={[Math.round((muted ? 0 : volume) * 100)]}
                      onValueChange={(val) => {
                        const v = val[0] / 100;
                        setMuted(v === 0);
                        setVolume(v);
                      }}
                      min={0}
                      max={100}
                    />
                  </div>
                </div>

                {/* screenshot */}
                <button
                  onClick={handleScreenshot}
                  className="rounded-md p-2 text-white/90 hover:bg-white/5"
                >
                  <Image size={16} />
                </button>

                {/* pip */}
                <button
                  onClick={togglePiP}
                  className="rounded-md p-2 text-white/90 hover:bg-white/5"
                >
                  <ImageMinus size={16} />
                </button>

                {/* fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="rounded-md p-2 text-white/90 hover:bg-white/5"
                >
                  <Maximize2 size={16} />
                </button>

                {/* settings popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="rounded-md p-2 text-white/90 hover:bg-white/5">
                      <Settings size={16} />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    side="top"
                    className="w-64 rounded-lg bg-black/85 p-4 text-white backdrop-blur-md"
                  >
                    {/* autoplay */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm">自动播放</div>
                      <Switch
                        checked={autoplay}
                        onCheckedChange={(v: boolean) => setAutoplay(v)}
                      />
                    </div>

                    {/* loop */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm">循环播放</div>
                      <Switch
                        checked={loop}
                        onCheckedChange={(v: boolean) => setLoop(v)}
                      />
                    </div>

                    {/* speed */}
                    <div className="mb-3">
                      <div className="mb-2 text-sm">播放速度</div>
                      <Select onValueChange={(val) => setSpeed(Number(val))}>
                        <SelectTrigger className="w-full bg-white/5 text-white/90">
                          {speed}x
                        </SelectTrigger>
                        <SelectContent>
                          {[0.5, 1, 1.5, 2].map((s) => (
                            <SelectItem key={s} value={String(s)}>
                              {s}x
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* quality */}
                    <div>
                      <div className="mb-2 text-sm">清晰度</div>
                      <Select onValueChange={(val) => changeQuality(val)}>
                        <SelectTrigger className="w-full bg-white/5 text-white/90">
                          {sources.find((s) => s.value === quality)?.label ??
                            quality}
                        </SelectTrigger>
                        <SelectContent>
                          {sources.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
