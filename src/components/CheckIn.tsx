import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, QrCode, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import QRCodeImage from '@/assets/QR.png';

interface Match {
  id: number;
  title: string;
  date: string;
  location: string;
  opponent: string;
  checkInTime: string;
  checkInStatus: '未檢錄' | '已檢錄';
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    title: 'WBC 亞洲區冠軍挑戰賽',
    date: '2026年7月15日 19:00',
    location: '台北小巨蛋',
    opponent: '泰國拳王 - 阿迪南',
    checkInTime: '17:00 - 18:30',
    checkInStatus: '未檢錄',
  },
  {
    id: 2,
    title: '全國青年拳擊錦標賽',
    date: '2026年8月2日 14:00',
    location: '高雄國家體育場',
    opponent: '陳俊宏',
    checkInTime: '12:00 - 13:30',
    checkInStatus: '未檢錄',
  },
];

export function CheckIn() {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [timer, setTimer] = useState(300);
  const [qrCodeKey, setQrCodeKey] = useState(Date.now());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showQrModal) {
      // Reset timer and QR code key each time the modal is opened
      setTimer(300);
      setQrCodeKey(Date.now());
      
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            // Timer ends, refresh QR code and reset timer
            setQrCodeKey(Date.now());
            return 300;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    // Cleanup interval on component unmount or when modal is closed
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showQrModal]);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
  };

  const handleBackToList = () => {
    setSelectedMatch(null);
  };

  if (selectedMatch) {
    return (
      <div className="container mx-auto px-6 py-8 text-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToList}
          className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> 返回比賽列表
        </Button>
        <div className="bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{selectedMatch.title}</h2>
            <p className="text-gray-400 mb-6">{selectedMatch.date}</p>

            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-500">地點</p>
                    <p className="text-lg">{selectedMatch.location}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">對手</p>
                    <p className="text-lg">{selectedMatch.opponent}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">檢錄時間</p>
                    <p className="text-lg">{selectedMatch.checkInTime}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">檢錄狀態</p>
                    <p className={`text-lg font-semibold ${selectedMatch.checkInStatus === '已檢錄' ? 'text-green-400' : 'text-yellow-400'}`}>{selectedMatch.checkInStatus}</p>
                </div>
            </div>
            
            <Button 
                onClick={() => setShowQrModal(true)}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg"
            >
                <QrCode className="w-6 h-6 mr-2" /> 顯示檢錄 QR Code
            </Button>
        </div>

        {showQrModal && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowQrModal(false)}
          >
            <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-700 w-[320px] h-[580px] flex flex-col justify-center items-center relative animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full h-8 bg-gray-700/50 rounded-t-xl absolute top-0"></div>
                <h3 className="text-lg text-gray-300 absolute top-10">出示此 QR Code 進行檢錄</h3>
                <div key={qrCodeKey} className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
                    <img src={QRCodeImage} alt="QR Code" className="w-60 h-60" />
                </div>
                <p className="text-yellow-400 mt-6 text-lg font-mono tracking-wider">
                  將於 {formatCountdown(timer)} 後更新
                </p>
                <p className="text-gray-400 mt-4 text-sm absolute bottom-10">掃描以完成檢錄手續</p>
                <div className="w-24 h-1 bg-white/80 rounded-full absolute bottom-4"></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 text-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回
      </Button>
      <h2 className="text-2xl mb-6">選手檢錄：即將到來</h2>
      <div className="space-y-4">
        {upcomingMatches.map((match) => (
          <div
            key={match.id}
            onClick={() => handleMatchClick(match)}
            className="flex items-center justify-between gap-6 bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg p-6 hover:border-[var(--boxing-blue)] hover:bg-[var(--charcoal)] transition-all group cursor-pointer"
          >
            <div>
              <h3 className="text-lg font-semibold group-hover:text-[var(--boxing-blue)] mb-1">
                {match.title}
              </h3>
              <p className="text-gray-400 text-sm">{match.date}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white" />
          </div>
        ))}
      </div>
    </div>
  );
} 