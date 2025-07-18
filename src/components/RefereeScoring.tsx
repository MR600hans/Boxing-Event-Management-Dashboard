import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bouts } from './OngoingBouts';
import { Button } from './ui/button';
import { ArrowLeft, User, Shield, Minus, Plus, AlertTriangle, ChevronDown, History, LogOut } from 'lucide-react';

export function RefereeScoring() {
    const { boutId } = useParams<{ boutId: string }>();
    const navigate = useNavigate();
    const bout = bouts.find((b) => b.id === Number(boutId));

    const [round, setRound] = useState(1);
    const [maxRounds] = useState(12);
    const [roundActive, setRoundActive] = useState(false);
    const [roundTimer, setRoundTimer] = useState(180); // 3 minutes per round
    const [redScore, setRedScore] = useState(10);
    const [blueScore, setBlueScore] = useState(10);
    const [scores, setScores] = useState<Record<number, { red: number; blue: number }>>({});

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (roundActive && roundTimer > 0) {
            interval = setInterval(() => {
                setRoundTimer(t => t - 1);
            }, 1000);
        } else if (roundTimer === 0) {
            setRoundActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [roundActive, roundTimer]);

    if (!bout) {
        return <div className="text-white text-center p-8">找不到比賽資訊</div>;
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    const handleScoreChange = (player: 'red' | 'blue', delta: number) => {
        if (!roundActive) return;
        if (player === 'red') {
            setRedScore(s => Math.max(0, s + delta));
        } else {
            setBlueScore(s => Math.max(0, s + delta));
        }
    };
    
    const handleFoul = (player: 'red' | 'blue') => {
        if (!roundActive) return;
        if (player === 'red') setRedScore(s => s - 1);
        else setBlueScore(s => s - 1);
    };
    
    const handleKnockdown = (player: 'red' | 'blue') => {
        if (!roundActive) return;
        if(player === 'red') setRedScore(s => s - 2);
        else setBlueScore(s => s - 2);
    };

    const submitRoundScores = () => {
        if (roundActive) {
            alert('請先結束目前回合');
            return;
        }
        if (scores[round]) {
            alert(`第 ${round} 回合的分數已經提交。`);
            return;
        }
        setScores(prev => ({ ...prev, [round]: { red: redScore, blue: blueScore } }));
        if (round < maxRounds) {
            setRound(r => r + 1);
            setRedScore(10);
            setBlueScore(10);
            setRoundTimer(180);
        } else {
            alert('比賽結束!');
        }
    };

    const handleToggleRound = () => {
        if (!roundActive && roundTimer === 0) {
            setRoundTimer(180);
        }
        setRoundActive(!roundActive);
    };

    const totalScores = Object.values(scores).reduce((acc, curr) => {
        acc.red += curr.red;
        acc.blue += curr.blue;
        return acc;
    }, { red: 0, blue: 0 });

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <Button variant="ghost" onClick={() => navigate(`/live/${boutId}`)} className="absolute top-4 left-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> 返回
            </Button>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">{bout.fighter1.name} vs {bout.fighter2.name}</h1>
                    <p className="text-yellow-400">裁判評分系統</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
                    <div className="bg-red-900/50 p-4 rounded-lg">
                        <User className="mx-auto mb-2 w-8 h-8"/>
                        <p className="text-2xl font-bold">{bout.fighter1.name}</p>
                        <p className="text-4xl font-bold text-red-400">{totalScores.red}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg flex flex-col justify-center items-center">
                        <div className="flex items-baseline gap-2">
                             <p className="text-5xl font-extrabold text-yellow-400">{round}</p>
                             <p className="text-xl text-gray-400">/{maxRounds} 回合</p>
                        </div>
                        <p className="text-2xl font-mono my-2">{formatTime(roundTimer)}</p>
                        <Button onClick={handleToggleRound} className={`mt-2 w-full ${roundActive ? 'bg-red-600' : 'bg-green-600'} hover:bg-opacity-80`}>
                            {roundActive ? '結束回合' : '開始回合'}
                        </Button>
                    </div>
                    <div className="bg-blue-900/50 p-4 rounded-lg">
                        <User className="mx-auto mb-2 w-8 h-8"/>
                        <p className="text-2xl font-bold">{bout.fighter2.name}</p>
                        <p className="text-4xl font-bold text-blue-400">{totalScores.blue}</p>
                    </div>
                </div>

                <div className="bg-[var(--charcoal-light)] p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-center mb-6">第 {round} 回合評分</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Red Corner */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-red-500 text-center">{bout.fighter1.name} (紅方)</h3>
                             <div className="flex items-center justify-center gap-4">
                                <Button size="icon" variant="outline" onClick={() => handleScoreChange('red', -1)} disabled={!roundActive}><Minus /></Button>
                                <p className="text-4xl font-mono w-20 text-center">{redScore}</p>
                                <Button size="icon" variant="outline" onClick={() => handleScoreChange('red', 1)} disabled={!roundActive}><Plus /></Button>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button variant="destructive" onClick={() => handleFoul('red')} disabled={!roundActive}><AlertTriangle className="w-4 h-4 mr-2"/>犯規</Button>
                                <Button variant="secondary" onClick={() => handleKnockdown('red')} disabled={!roundActive}><ChevronDown className="w-4 h-4 mr-2"/>擊倒</Button>
                            </div>
                        </div>
                        {/* Blue Corner */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-500 text-center">{bout.fighter2.name} (藍方)</h3>
                            <div className="flex items-center justify-center gap-4">
                                <Button size="icon" variant="outline" onClick={() => handleScoreChange('blue', -1)} disabled={!roundActive}><Minus /></Button>
                                <p className="text-4xl font-mono w-20 text-center">{blueScore}</p>
                                <Button size="icon" variant="outline" onClick={() => handleScoreChange('blue', 1)} disabled={!roundActive}><Plus /></Button>
                            </div>
                             <div className="flex justify-center gap-2">
                                <Button variant="destructive" onClick={() => handleFoul('blue')} disabled={!roundActive}><AlertTriangle className="w-4 h-4 mr-2"/>犯規</Button>
                                <Button variant="secondary" onClick={() => handleKnockdown('blue')} disabled={!roundActive}><ChevronDown className="w-4 h-4 mr-2"/>擊倒</Button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Button onClick={submitRoundScores} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" disabled={roundActive}>
                            提交第 {round} 回合分數
                        </Button>
                    </div>
                </div>

                {Object.keys(scores).length > 0 && (
                    <div className="bg-[var(--charcoal-light)] p-6 rounded-lg mt-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><History className="w-5 h-5" /> 分數歷史記錄</h3>
                        <div className="space-y-2">
                            {Object.entries(scores).map(([r, s]) => (
                                <div key={r} className="flex justify-between items-center bg-[var(--charcoal)] p-3 rounded-md">
                                    <span className="font-semibold">第 {r} 回合</span>
                                    <div>
                                        <span className="text-red-400">紅 {s.red}</span>
                                        <span className="mx-2">-</span>
                                        <span className="text-blue-400">藍 {s.blue}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-[var(--charcoal-lighter)] text-center">
                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => navigate(-1)}
                        className="bg-red-800 hover:bg-red-900 text-white font-bold"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        離開裁判系統
                    </Button>
                </div>
            </div>
        </div>
    );
} 