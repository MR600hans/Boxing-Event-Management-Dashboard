import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from './ui/button';
import boxingPic1 from '@/assets/boxingPic1.jpg';
import boxingPic2 from '@/assets/boxingPic2.jpg';
import boxingPic3 from '@/assets/boxingPic3.jpg';
import boxingPic4 from '@/assets/boxingPic4.jpg';

export interface FighterInfo {
  name: string;
  checkInStatus: '已檢錄' | '未檢錄';
}

export interface RefereeInfo {
  name: string;
  loginStatus: '已登入' | '未登入';
}

export interface Bout {
  id: number;
  thumbnail: string;
  fighter1: FighterInfo;
  fighter2: FighterInfo;
  referee: RefereeInfo;
  status: 'LIVE' | '即將開始';
  round?: string;
  time?: string;
  redScore?: number;
  blueScore?: number;
}

export const bouts: Bout[] = [
  {
    id: 1,
    thumbnail: boxingPic1,
    fighter1: { name: '林育廷', checkInStatus: '已檢錄' },
    fighter2: { name: '周建宏', checkInStatus: '已檢錄' },
    referee: { name: '王強', loginStatus: '未登入' },
    status: '即將開始',
  },
  {
    id: 2,
    thumbnail: boxingPic2,
    fighter1: { name: '張偉', checkInStatus: '已檢錄' },
    fighter2: { name: '黃俊', checkInStatus: '已檢錄' },
    referee: { name: '李明', loginStatus: '已登入' },
    status: 'LIVE',
    round: '第 3 回合',
    time: '01:24',
    redScore: 29,
    blueScore: 29,
  },
  {
    id: 3,
    thumbnail: boxingPic3,
    fighter1: { name: '陳志豪', checkInStatus: '已檢錄' },
    fighter2: { name: '李國強', checkInStatus: '已檢錄' },
    referee: { name: '劉備', loginStatus: '已登入' },
    status: 'LIVE',
    round: '第 7 回合',
    time: '02:11',
    redScore: 66,
    blueScore: 64,
  },
  {
    id: 4,
    thumbnail: boxingPic4,
    fighter1: { name: '王心凌', checkInStatus: '已檢錄' },
    fighter2: { name: '蔡依林', checkInStatus: '已檢錄' },
    referee: { name: '周董', loginStatus: '已登入' },
    status: 'LIVE',
    round: '第 2 回合',
    time: '00:48',
    redScore: 18,
    blueScore: 20,
  },
];

export function OngoingBouts() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8 text-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回
      </Button>

      <h2 className="text-2xl mb-6">進行中對戰</h2>

      <div className="space-y-4">
        {bouts.map((b) => (
          <div
            key={b.id}
            onClick={() => navigate(`/live/${b.id}`)}
            className="flex items-center gap-6 bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg overflow-hidden hover:border-[var(--boxing-blue)] hover:bg-[var(--charcoal)] transition-all group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-48 h-28 flex-shrink-0 overflow-hidden">
              <img
                src={b.thumbnail}
                alt={`${b.fighter1.name} vs ${b.fighter2.name}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* live pulse */}
              {b.status === 'LIVE' ? (
                <div className="absolute top-2 left-2 bg-[var(--boxing-red)] text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                  LIVE
                </div>
              ) : (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                  即將開始
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 py-4 pr-4">
              <h3 className="text-lg font-semibold group-hover:text-[var(--boxing-blue)] mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--boxing-blue)]" /> {b.fighter1.name} vs {b.fighter2.name}
              </h3>
              {b.status === 'LIVE' ? (
                <>
                  <p className="text-gray-400 text-sm mb-1">{b.round}</p>
                  <div className="text-gray-300 text-sm">
                    <span className="text-[var(--boxing-red)] font-semibold mr-2">紅 {b.redScore}</span>
                    :
                    <span className="text-[var(--boxing-blue)] font-semibold ml-2">藍 {b.blueScore}</span>
                  </div>
                </>
              ) : (
                <p className="text-yellow-400 text-sm">比賽即將開始，請稍候...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 