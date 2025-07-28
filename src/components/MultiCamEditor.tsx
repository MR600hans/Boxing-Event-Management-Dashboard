import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ArrowLeft, Play, Pause, Disc, Clapperboard, Trash2, Save, ListVideo, PlayCircle, StopCircle } from 'lucide-react';
import boxingDemo1 from '@/assets/boxingDemo 1.MOV';
import boxingDemo2 from '@/assets/boxingDemo 2.MOV';
import boxingDemo3 from '@/assets/boxingDemo 3.MOV';
import boxingDemo4 from '@/assets/boxingDemo 4.MOV';
import boxingDemo5 from '@/assets/boxingDemo 5.MOV';
import boxingDemo6 from '@/assets/boxingDemo 6.MOV';

interface Replay {
  id: number;
  videoUrl: string;
  title: string;
}

interface MultiCamEditorProps {
  replay: Replay;
  onBack: () => void;
}

const camVideos = [
  boxingDemo1,
  boxingDemo2,
  boxingDemo3,
  boxingDemo4,
  boxingDemo5,
  boxingDemo6,
];
const NUM_CAMS = camVideos.length;

const camButtonColors = {
    base: 'bg-ivory-base hover:bg-ivory-dark',
    active: 'bg-red-600 ring-2 ring-red-400 shadow-lg shadow-red-500/50',
};

type EditorMode = 'live' | 'recording' | 'replay';
interface Cut {
  timestamp: number;
  cam: number;
}
interface Recording {
  id: number;
  name: string;
  cuts: Cut[];
}

export function MultiCamEditor({ replay, onBack }: MultiCamEditorProps) {
  const mainVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const previewVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeCam, setActiveCam] = useState(1);
  const [mode, setMode] = useState<EditorMode>('live');
  const [cuts, setCuts] = useState<Cut[]>([{ cam: 1, timestamp: 0 }]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [previewCuts, setPreviewCuts] = useState<Cut[] | null>(null);
  const [masterClockIndex, setMasterClockIndex] = useState(0);

  const allVideoElements = [
    ...mainVideoRefs.current,
    ...previewVideoRefs.current
  ].filter(Boolean) as HTMLVideoElement[];

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };
  
  useEffect(() => {
    if (allVideoElements.length === 0) return;

    if (isPlaying) {
      Promise.all(allVideoElements.map(v => v.play())).catch(e => {
        console.error("Playback failed:", e);
        setIsPlaying(false);
      });
    } else {
      allVideoElements.forEach(v => v.pause());
    }
  }, [isPlaying, allVideoElements.length]);

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    allVideoElements.forEach(v => {
      v.currentTime = newTime;
    });
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCamEnded = (camIndex: number) => {
    setEndedCams(prev => {
        const newEnded = [...prev];
        newEnded[camIndex] = true;
        return newEnded;
    });
  };

  const handleSetActiveCam = (cam: number) => {
    setActiveCam(cam);
    if (mode === 'recording') {
      const timestamp = currentTime;
      // Add new cut, replacing any future cuts to allow re-recording from a point
      const newCuts = [
        ...cuts.filter(c => c.timestamp < timestamp),
        { cam, timestamp }
      ].sort((a, b) => a.timestamp - b.timestamp);
      setCuts(newCuts);
    }
  };

  const handleModeChange = (newMode: EditorMode) => {
    if (newMode === 'recording' && mode !== 'recording') {
        // When starting a new recording, reset cuts if user confirms
        if (cuts.length > 1 && !confirm('開始新的錄製將會清除目前的導播紀錄，確定嗎？')) {
            return;
        }
        setCuts([{ cam: 1, timestamp: 0 }]);
        setIsPlaying(true); // Auto-play on record start
    }
    setMode(newMode);
  }

  const handleSaveRecording = () => {
    if (cuts.length <= 1) {
      alert('沒有足夠的剪輯點可以儲存。');
      return;
    }
    const newRecording = {
      id: Date.now(),
      name: `錄製 #${recordings.length + 1}`,
      cuts: [...cuts],
    };
    setRecordings(prev => [...prev, newRecording]);
    alert(`"${newRecording.name}" 已儲存！`);
  };

  const handleLoadRecording = (recordingToLoad: Recording) => {
    if (confirm(`載入 "${recordingToLoad.name}" 將會覆蓋目前的剪輯紀錄，確定嗎？`)) {
      setCuts(recordingToLoad.cuts);
      setMode('live');
      handleSeek([0]);
    }
  };

  const handleDeleteRecording = (recordingId: number) => {
    if (confirm('確定要刪除這個錄製紀錄嗎？')) {
      setRecordings(prev => prev.filter(r => r.id !== recordingId));
    }
  };
  
  const handlePreviewRecording = (recordingToPreview: Recording) => {
    setPreviewCuts(recordingToPreview.cuts);
    setMode('replay');
    handleSeek([0]);
    setIsPlaying(true);
  };

  const handleStopPreview = () => {
    setPreviewCuts(null);
    setMode('live');
    setIsPlaying(false);
    handleSeek([0]);
  };

  // Effect to find the max duration and set the master clock
  useEffect(() => {
    const previewElements = previewVideoRefs.current.filter(Boolean);
    if (previewElements.length < NUM_CAMS || duration > 0) {
      return;
    }

    const durationPromises = previewElements.map(video => 
      new Promise<number>(resolve => {
        if (video.readyState >= 1) {
          resolve(video.duration);
        } else {
          video.onloadedmetadata = () => resolve(video.duration);
        }
      })
    );

    Promise.all(durationPromises).then(durations => {
      const validDurations = durations.filter(d => isFinite(d));
      if (validDurations.length > 0) {
        const maxDuration = Math.max(...validDurations);
        const masterIndex = durations.indexOf(maxDuration);
        setDuration(maxDuration);
        setMasterClockIndex(masterIndex);
      }
    });

  }, [previewVideoRefs.current.length]);

  // Effect to sync the displayed time ONLY from the master clock
  useEffect(() => {
    const masterVideo = previewVideoRefs.current[masterClockIndex];
    if (!masterVideo) return;

    const handleTimeUpdate = () => {
      setCurrentTime(masterVideo.currentTime);
    };

    masterVideo.addEventListener('timeupdate', handleTimeUpdate);
    return () => masterVideo.removeEventListener('timeupdate', handleTimeUpdate);
  }, [masterClockIndex]);

  // Effect for replay mode - auto-switches camera based on cuts
  useEffect(() => {
    if (mode !== 'replay' || !isPlaying) return;

    const cutsToUse = previewCuts || cuts;

    // Find the latest cut that should be active for the current time
    const currentCut = [...cutsToUse].reverse().find(c => c.timestamp <= currentTime);

    if (currentCut && currentCut.cam !== activeCam) {
      setActiveCam(currentCut.cam);
    }
  }, [currentTime, isPlaying, mode, cuts, previewCuts]);

  // Effect to stop recording when video ends
  useEffect(() => {
    if (mode === 'recording' && isPlaying && currentTime >= duration && duration > 0) {
      setIsPlaying(false);
      setMode('live');
      alert('錄製完成！');
    }
  }, [currentTime, duration, isPlaying, mode]);

  const cutsToDisplay = previewCuts || cuts;
  const timelineSegments = cutsToDisplay.map((cut, index) => {
      const nextCut = cutsToDisplay[index + 1];
      const start = cut.timestamp;
      const end = nextCut ? nextCut.timestamp : duration;
      return {
          cam: cut.cam,
          left: (start / duration) * 100,
          width: ((end - start) / duration) * 100,
      };
  }).filter(seg => seg.width > 0.1); // Filter out tiny segments

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden p-4 gap-4">
      <div className="flex-shrink-0 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-1" /> 返回
            </Button>
            <h2 className="text-xl font-bold">{replay.title} - 導播模式</h2>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="w-2/3 grid grid-cols-3 grid-rows-2 gap-2">
            {[...Array(NUM_CAMS)].map((_, i) => (
                <div key={i} className={`relative border-2 ${activeCam === i + 1 ? 'border-red-500' : 'border-gray-700'} rounded-lg overflow-hidden`}>
                    <video
                        ref={el => previewVideoRefs.current[i] = el}
                        src={camVideos[i]}
                        muted
                        className="w-full h-full object-cover"
                        playsInline
                    />
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                        CAM {i + 1}
                    </div>
                </div>
            ))}
        </div>

        <div className="w-1/3 flex flex-col gap-4">
          <div className="flex-[3] flex flex-col bg-gray-900 rounded-lg p-2">
            <h3 className="text-center text-red-500 font-bold mb-2">主輸出 (PROGRAM)</h3>
            <div className="flex-1 bg-black rounded overflow-hidden relative">
              {camVideos.map((videoSrc, i) => {
                const videoDuration = mainVideoRefs.current[i]?.duration;
                const hasEnded = videoDuration && isFinite(videoDuration) ? currentTime >= videoDuration - 0.1 : false;

                return (
                    <div key={i} className={`w-full h-full absolute inset-0 transition-opacity duration-200 ${activeCam === i + 1 ? 'opacity-100' : 'opacity-0'}`}>
                        <video
                            ref={el => mainVideoRefs.current[i] = el}
                            src={videoSrc}
                            className="w-full h-full object-contain"
                            playsInline
                            muted={activeCam !== i + 1}
                        />
                        {hasEnded && (
                            <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
                                <p className="text-gray-500">CAM {i + 1} 訊號結束</p>
                            </div>
                        )}
                    </div>
                )
              })}
            </div>
          </div>
          <div className="flex-[2] grid grid-cols-3 grid-rows-2 gap-2">
            {[...Array(NUM_CAMS)].map((_, i) => (
              <Button
                key={i}
                onClick={() => handleSetActiveCam(i + 1)}
                disabled={mode === 'replay'}
                className={`w-full h-full text-3xl font-bold transition-all duration-200 text-gray-800
                  ${
                    activeCam === i + 1
                      ? camButtonColors.active
                      : camButtonColors.base
                  }
                `}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-shrink-0 flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg">
          <Button onClick={handlePlayPause} size="lg">
              {isPlaying ? <Pause /> : <Play />}
          </Button>
          <div className="flex-1 flex flex-col justify-center h-12">
            {/* Segments Visualization */}
            <div className="relative w-full h-5">
                {timelineSegments.map((segment, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 h-full flex items-center justify-center rounded-sm text-xs font-bold ${index % 2 === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'} border-r border-black/50`}
                        style={{
                            left: `${segment.left}%`,
                            width: `${segment.width}%`,
                        }}
                    >
                        {/* Only show cam number if the segment is wide enough to avoid clutter */}
                        {segment.width > 2 && <span>{segment.cam}</span>}
                    </div>
                ))}
            </div>
            {/* Slider */}
            <Slider
                min={0}
                max={duration || 1}
                step={0.1}
                value={[currentTime]}
                onValueChange={handleSeek}
                className="w-full"
            />
          </div>
          <div className="text-lg font-mono text-white whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="h-full border-l border-gray-600 mx-4"></div>
          <div className="flex items-center gap-2">
            <Button 
                onClick={() => handleModeChange('recording')}
                className={`w-24 ${mode === 'recording' ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-600'}`}
            >
                <Disc className="w-5 h-5 mr-2"/>
                {mode === 'recording' ? '錄製中' : '錄製'}
            </Button>
            <Button 
                onClick={handleSaveRecording}
                disabled={cuts.length <= 1 || mode === 'recording'}
                className="bg-green-600"
            >
                <Save className="w-5 h-5 mr-2"/>
                儲存
            </Button>
             <Button 
                variant="destructive"
                size="icon"
                onClick={() => {
                    if(confirm('確定要清空所有導播紀錄嗎？')) {
                        setCuts([{ cam: 1, timestamp: 0 }]);
                        handleSeek([0]);
                    }
                }}
                disabled={cuts.length <= 1}
            >
                <Trash2 className="w-5 h-5"/>
            </Button>
          </div>
      </div>
      <div className="flex-shrink-0 bg-gray-900/50 p-4 border-t border-gray-700">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center"><ListVideo className="w-5 h-5 mr-2"/> 導播紀錄庫</h3>
        <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
          {recordings.length === 0 && <p className="text-gray-500 text-center py-4">尚未儲存任何紀錄。</p>}
          {recordings.map(rec => {
            const isPreviewing = previewCuts === rec.cuts;
            const recTimelineSegments = rec.cuts.map((cut, index) => {
                const nextCut = rec.cuts[index + 1];
                const start = cut.timestamp;
                const end = nextCut ? nextCut.timestamp : duration;
                return {
                    cam: cut.cam,
                    left: (start / duration) * 100,
                    width: ((end - start) / duration) * 100,
                };
            }).filter(seg => seg.width > 0);

            return (
              <div key={rec.id} className="bg-[var(--charcoal)] p-3 rounded-md flex justify-between items-center">
                <div className="flex-1 pr-4">
                  <p className="font-semibold">{rec.name}</p>
                  <p className="text-xs text-gray-400">{rec.cuts.length} 個剪輯點</p>
                  <div className="w-full h-4 bg-gray-800 rounded-full relative my-1 overflow-hidden">
                      {recTimelineSegments.map((segment, idx) => (
                          <div
                              key={idx}
                              className={`absolute h-full flex items-center justify-center text-xs font-bold ${idx % 2 === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'}`}
                              style={{
                                  left: `${segment.left}%`,
                                  width: `${segment.width}%`,
                              }}
                              title={`CAM ${segment.cam}`}
                          >
                            {segment.width > 5 && segment.cam}
                          </div>
                      ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => isPreviewing ? handleStopPreview() : handlePreviewRecording(rec)}
                    size="sm" 
                    variant="outline"
                    className={isPreviewing ? 'text-red-400 border-red-400' : ''}
                  >
                    {isPreviewing ? <StopCircle className="w-4 h-4 mr-2"/> : <PlayCircle className="w-4 h-4 mr-2"/>}
                    {isPreviewing ? '停止' : '預覽'}
                  </Button>
                  <Button onClick={() => handleDeleteRecording(rec.id)} size="sm" variant="destructive">刪除</Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
} 