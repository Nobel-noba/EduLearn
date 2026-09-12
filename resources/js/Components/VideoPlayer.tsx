import React, { useRef, useState, useEffect } from 'react';
import {
    Play,
    Pause,
    RotateCcw,
    Volume2,
    VolumeX,
    Maximize,
    CheckCircle2,
    Settings,
} from 'lucide-react';

interface VideoPlayerProps {
    url: string;
    title: string;
    onEnded?: () => void;
    onMarkComplete?: () => void;
    isCompleted?: boolean;
}

export default function VideoPlayer({
    url,
    title,
    onEnded,
    onMarkComplete,
    isCompleted = false,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);

    // Auto-hide controls timer
    useEffect(() => {
        let timer: any;
        if (isPlaying) {
            timer = setTimeout(() => setControlsVisible(false), 3000);
        } else {
            setControlsVisible(true);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentTime]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const seekTime = parseFloat(e.target.value);
        videoRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const changeSpeed = (speed: number) => {
        if (!videoRef.current) return;
        videoRef.current.playbackRate = speed;
        setPlaybackSpeed(speed);
        setSpeedMenuOpen(false);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    };

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${mins}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={() => setControlsVisible(true)}
            className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group select-none"
        >
            <video
                ref={videoRef}
                src={url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => {
                    setIsPlaying(false);
                    if (onEnded) onEnded();
                }}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
            />

            {/* Center Play Button Overlay when paused */}
            {!isPlaying && (
                <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border border-indigo-400 cursor-pointer"
                    aria-label="Play video"
                >
                    <Play className="w-8 h-8 ml-1 fill-white" />
                </button>
            )}

            {/* Control Bar Overlay */}
            <div
                className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 ${
                    controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Seek Track */}
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:h-2 transition-all"
                    />
                </div>

                {/* Buttons Row */}
                <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={togglePlay}
                            className="p-1 hover:text-indigo-400 transition cursor-pointer"
                            title={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                if (videoRef.current) videoRef.current.currentTime = Math.max(0, currentTime - 10);
                            }}
                            className="p-1 hover:text-indigo-400 transition cursor-pointer"
                            title="Rewind 10s"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={toggleMute}
                            className="p-1 hover:text-indigo-400 transition cursor-pointer"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <span className="font-mono text-slate-300 text-xs">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mark as Complete button */}
                        {onMarkComplete && (
                            <button
                                type="button"
                                onClick={onMarkComplete}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                                    isCompleted
                                        ? 'bg-emerald-600/90 text-white hover:bg-emerald-700'
                                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600'
                                }`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                            </button>
                        )}

                        {/* Playback Speed Menu */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
                                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold border border-slate-700 cursor-pointer"
                            >
                                <Settings className="w-3.5 h-3.5" />
                                <span>{playbackSpeed}x</span>
                            </button>

                            {speedMenuOpen && (
                                <div className="absolute bottom-8 right-0 bg-slate-900 border border-slate-700 rounded-lg p-1.5 shadow-xl flex flex-col gap-1 w-20 z-50">
                                    {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => changeSpeed(s)}
                                            className={`text-xs py-1 rounded px-2 text-center transition cursor-pointer ${
                                                playbackSpeed === s ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                                            }`}
                                        >
                                            {s}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fullscreen Button */}
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="p-1 hover:text-indigo-400 transition cursor-pointer"
                            title="Fullscreen"
                        >
                            <Maximize className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
