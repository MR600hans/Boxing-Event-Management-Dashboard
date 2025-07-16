import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from './ui/button';
import boxingPic1 from '@/assets/boxingPic1.jpg';
import boxingPic2 from '@/assets/boxingPic2.jpg';
import boxingPic3 from '@/assets/boxingPic3.jpg';
import boxingPic4 from '@/assets/boxingPic4.jpg';
import boxingPic5 from '@/assets/boxingPic5.png';

interface Bout {
  id: number;
  thumbnail: string;
  fighters: string;
  round: string;
  redScore: number;
  blueScore: number;
}

const bouts: Bout[] = [
  {
    id: 1,
    thumbnail: boxingPic1,
    fighters: '林育廷 vs 周建宏',
    round: '第 5 回合',
    redScore: 48,
    blueScore: 47,
  },
  {
    id: 2,
    thumbnail: boxingPic2,
    fighters: '張偉 vs 黃俊',
    round: '第 3 回合',
    redScore: 29,
    blueScore: 29,
  },
  {
    id: 3,
    thumbnail: boxingPic3,
    fighters: '陳志豪 vs 李國強',
    round: '第 7 回合',
    redScore: 66,
    blueScore: 64,
  },
  {
    id: 4,
    thumbnail: boxingPic4,
    fighters: '王心凌 vs 蔡依林',
    round: '第 2 回合',
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
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回
      </Button>

      <h2 className="text-2xl mb-6">進行中對戰</h2>

      <div className="space-y-4">
        {bouts.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-6 bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg overflow-hidden hover:border-[var(--boxing-blue)] hover:bg-[var(--charcoal)] transition-all group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-48 h-28 flex-shrink-0 overflow-hidden">
              <img
                src={b.thumbnail}
                alt={b.fighters}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* live pulse */}
              <div className="absolute top-2 left-2 bg-[var(--boxing-red)] text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                LIVE
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 py-4 pr-4">
              <h3 className="text-lg font-semibold group-hover:text-[var(--boxing-blue)] mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--boxing-blue)]" /> {b.fighters}
              </h3>
              <p className="text-gray-400 text-sm mb-1">{b.round}</p>
              <div className="text-gray-300 text-sm">
                <span className="text-[var(--boxing-red)] font-semibold mr-2">紅 {b.redScore}</span>
                :
                <span className="text-[var(--boxing-blue)] font-semibold ml-2">藍 {b.blueScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 