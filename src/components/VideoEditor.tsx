import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ArrowLeft, Scissors, Play, Pause, RotateCcw, Trash2 } from 'lucide-react';

interface Replay {
  id: number;
  thumbnail: string;
  title: string;
  fighters: string;
  date: string;
  videoUrl: string;
}

interface VideoEditorProps {
  replay: Replay;
  onBack: () => void;
}

interface Clip {
  id: number;
  start: number;
  end: number;
}

export function VideoEditor({ replay, onBack }: VideoEditorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [clips, setClips] = useState<Clip[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        if (video.currentTime > endTime && endTime !== 0 && (endTime - startTime) > 0) {
          video.currentTime = startTime;
          video.pause();
        } else {
          setCurrentTime(video.currentTime);
        }
      };

      const handleDurationChange = () => {
        const videoDuration = video.duration;
        if (videoDuration && isFinite(videoDuration)) {
          setDuration(videoDuration);
          if (endTime === 0 || endTime > videoDuration) {
            setEndTime(videoDuration);
          }
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('durationchange', handleDurationChange);
      video.addEventListener('loadedmetadata', handleDurationChange);
      handleDurationChange();

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('durationchange', handleDurationChange);
        video.removeEventListener('loadedmetadata', handleDurationChange);
      };
    }
  }, [endTime, startTime]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        if (video.currentTime < startTime || video.currentTime >= endTime) {
            video.currentTime = startTime;
        }
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (video) {
      const newTime = value[0];
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) {
      return '00:00.0';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };

  const handleSetStart = () => {
    if (videoRef.current) {
      const newStartTime = videoRef.current.currentTime;
      if (newStartTime >= endTime) {
        alert('開始時間不能晚於或等於結束時間');
        return;
      }
      setStartTime(newStartTime);
    }
  }

  const handleSetEnd = () => {
    if (videoRef.current) {
      const newEndTime = videoRef.current.currentTime;
      if (newEndTime <= startTime) {
        alert('結束時間不能早於或等於開始時間');
        return;
      }
      setEndTime(newEndTime);
    }
  }
  
  const handleReset = () => {
    setStartTime(0);
    if(videoRef.current && isFinite(videoRef.current.duration)) {
      setEndTime(videoRef.current.duration);
      videoRef.current.currentTime = 0;
    } else {
      setEndTime(duration);
    }
  }
  
  const handleSaveClip = () => {
      if (endTime <= startTime) {
          alert('結束時間必須晚於開始時間');
          return;
      }
      const newClip = {
          id: Date.now(),
          start: startTime,
          end: endTime,
      };
      setClips(prevClips => [...prevClips, newClip].sort((a,b) => a.start - b.start));
      handleReset();
  }

  const handleDeleteClip = (clipId: number) => {
    setClips(prevClips => prevClips.filter(clip => clip.id !== clipId));
  }

  const handlePlayClip = (clip: Clip) => {
    if (videoRef.current) {
      setStartTime(clip.start);
      setEndTime(clip.end);
      videoRef.current.currentTime = clip.start;
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="flex-shrink-0 px-6 py-3 border-b border-[var(--charcoal-lighter)]">
        <div className="flex items-center gap-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-400 hover:text-white hover:bg-[var(--charcoal)]"
            >
                <ArrowLeft className="w-4 h-4 mr-1" /> 返回
            </Button>
            <h2 className="text-xl font-bold">{replay.title} - 影片剪輯</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-row gap-6 p-6 overflow-hidden">
        {/* Left: Player */}
        <div className="w-2/3 flex flex-col gap-6">
          <div className="flex-1 aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                src={replay.videoUrl}
                className="w-full h-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
              />
          </div>

          <div className="flex-shrink-0 bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg p-4 space-y-4">
              <div className="relative pt-2">
                <Slider
                    min={0}
                    max={duration || 1}
                    step={0.01}
                    value={[currentTime]}
                    onValueChange={handleSeek}
                    className="w-full"
                    thumbClassName="slider-thumb"
                />
                <div
                  className="absolute top-[9px] h-2 pointer-events-none"
                  style={{
                    left: `${(startTime / duration) * 100}%`,
                    width: `${((endTime - startTime) / duration) * 100}%`,
                  }}
                >
                  <div className="w-full h-full opacity-40 bg-blue-500 rounded-full" />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                      <Button onClick={togglePlay} size="icon" className="w-12 h-12 rounded-full">
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </Button>
                       <div className="text-left">
                          <p className="text-sm text-gray-400">當前剪輯範圍</p>
                          <p className="font-mono text-md md:text-lg">{formatTime(startTime)} - {formatTime(endTime)}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <Button onClick={handleSetStart} variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                          <Scissors className="w-4 h-4 mr-2" /> 設定起點
                      </Button>
                      <Button onClick={handleSetEnd} variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                          <Scissors className="w-4 h-4 mr-2" /> 設定終點
                      </Button>
                  </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-[var(--charcoal-lighter)]">
                  <Button onClick={handleReset} variant="ghost">
                      <RotateCcw className="w-4 h-4 mr-2" /> 重設
                  </Button>
                  <Button onClick={handleSaveClip} className="bg-blue-600 hover:bg-blue-700 text-white">
                      儲存剪輯
                  </Button>
              </div>
          </div>
        </div>

        {/* Right: Clips */}
        <div className="w-1/3 flex flex-col bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg">
          <h3 className="text-lg font-semibold p-4 border-b border-[var(--charcoal-lighter)] flex-shrink-0">已儲存的剪輯</h3>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {clips.length === 0 && <p className="text-gray-400 text-center py-8">尚未儲存任何剪輯</p>}
            {clips.map((clip, index) => (
              <div key={clip.id} className="bg-[var(--charcoal)] p-3 rounded-lg flex items-center justify-between gap-2 group">
                <div className="flex items-center gap-3">
                    <div className="text-blue-400 font-bold text-lg">{index + 1}</div>
                    <div>
                        <p className="font-semibold text-white">剪輯 #{index + 1}</p>
                        <p className="text-sm text-gray-400 font-mono">{formatTime(clip.start)} - {formatTime(clip.end)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => handlePlayClip(clip)}>
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-400" onClick={() => handleDeleteClip(clip.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 