import React, { useState, useRef, useEffect } from 'react';
import { Governorate } from '../types';
import { PlayButtonIcon, PauseIcon } from './icons/Icons';
import { getWaveformData, drawWaveform } from '../utils/waveform';
import { GOVERNORATE_AR_MAP } from '../constants';

interface AudioPlayerProps {
    src: string;
    governorate: Governorate;
    compact?: boolean;
}

const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) {
        return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Draws a generic, static waveform as a fallback when the real audio data cannot be fetched.
 */
const drawFallbackWaveform = (canvas: HTMLCanvasElement, color: string) => {
    const samples = 100;
    // A simple sine wave pattern for a visually appealing fallback
    const fakeData = Array.from({length: samples}, (_, i) => {
        const x = i / (samples - 1); // progress from 0 to 1
        const sine = Math.sin(x * Math.PI * 2 * 2.5); // 2.5 full waves
        const envelope = Math.pow(Math.sin(x * Math.PI), 0.7); // Envelope to make ends taper
        return (Math.abs(sine) * envelope * 0.8) + 0.15; // Combine and add base height
    });
    drawWaveform(canvas, fakeData, color);
};


const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, governorate, compact = false }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const waveformColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#0D9488';
        
        if (canvas && src && !isLoaded) {
            getWaveformData(src)
              .then(audioData => {
                  if (audioData) {
                      drawWaveform(canvas, audioData, waveformColor);
                  } else {
                      // If fetching/processing fails (e.g., CORS), draw a fallback
                      drawFallbackWaveform(canvas, waveformColor);
                  }
                  setIsLoaded(true);
              });
        }

        const audio = audioRef.current;
        if (audio) {
            const setAudioData = () => {
                setDuration(audio.duration);
                setCurrentTime(audio.currentTime);
            }

            const setAudioTime = () => setCurrentTime(audio.currentTime);

            audio.addEventListener("loadeddata", setAudioData);
            audio.addEventListener("timeupdate", setAudioTime);

            return () => {
                audio.removeEventListener("loadeddata", setAudioData);
                audio.removeEventListener("timeupdate", setAudioTime);
            }
        }
    }, [src, isLoaded]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (!audio.src || audio.currentSrc === "") {
                console.error("AudioPlayer: No source URL provided.");
                return;
            }
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(error => console.error("Error playing audio:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);

            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('ended', handlePause);

            return () => {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('ended', handlePause);
            };
        }
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    if (compact) {
        return (
            <div className="flex items-center space-x-2 w-full max-w-[250px] text-on-primary">
                <audio ref={audioRef} src={src} preload="metadata"></audio>
                <button
                    onClick={togglePlayPause}
                    className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center bg-white/20 text-on-primary transition-transform hover:scale-105"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayButtonIcon className="w-5 h-5" />}
                </button>
                <div className="flex-grow">
                    <div className="relative h-8 w-full">
                        <canvas ref={canvasRef} className="w-full h-full" />
                        <div
                            className="absolute top-0 left-0 h-full bg-white/30"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                     <div className="flex justify-between items-center mt-1 text-xs opacity-70">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-4 glass-card rounded-lg p-4 flex items-center space-x-4">
            <audio ref={audioRef} src={src} preload="metadata"></audio>
            <button
                onClick={togglePlayPause}
                className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-primary text-on-primary transition-transform hover:scale-105"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayButtonIcon className="w-6 h-6" />}
            </button>
            <div className="flex-grow">
                <div className="relative h-12 w-full">
                    <canvas ref={canvasRef} className="w-full h-full" />
                    <div
                        className="absolute top-0 left-0 h-full bg-primary/30"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                 <div className="flex justify-between items-center mt-1 text-xs text-theme-text-muted">
                    <span>{formatTime(currentTime)}</span>
                     <span className="font-arabic font-bold">{GOVERNORATE_AR_MAP[governorate] || governorate}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;