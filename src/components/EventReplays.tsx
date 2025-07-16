import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from './ui/button';
import boxingPic1 from '@/assets/boxingPic1.jpg';
import boxingPic2 from '@/assets/boxingPic2.jpg';
import boxingPic3 from '@/assets/boxingPic3.jpg';
import boxingPic4 from '@/assets/boxingPic4.jpg';
import boxingPic5 from '@/assets/boxingPic5.png';
import boxingPic6 from '@/assets/boxingPic6.jpg';
import { useState } from 'react';

interface Replay {
  id: number;
  thumbnail: string;
  title: string;
  fighters: string;
  date: string;
}

const replays: Replay[] = [
  {
    id: 1,
    thumbnail: boxingPic1,
    title: '世界拳王爭霸戰 - 精彩重播',
    fighters: '林育廷 vs 周建宏',
    date: '2025-06-02',
  },
  {
    id: 2,
    thumbnail: boxingPic2,
    title: '亞洲新秀挑戰賽 - 精彩重播',
    fighters: '張偉 vs 黃俊',
    date: '2025-07-16',
  },
  {
    id: 3,
    thumbnail: boxingPic3,
    title: '慈善拳擊夜 - 精彩重播',
    fighters: '陳志豪 vs 李國強',
    date: '2025-08-22',
  },
  {
    id: 4,
    thumbnail: boxingPic4,
    title: '女子冠軍賽 - 精彩重播',
    fighters: '王心凌 vs 蔡依林',
    date: '2025-09-11',
  },
  {
    id: 5,
    thumbnail: boxingPic5,
    title: '青少年盃 - 精彩重播',
    fighters: '許凱 vs 林俊傑',
    date: '2025-10-06',
  },
  {
    id: 6,
    thumbnail: boxingPic6,
    title: '跨年特別賽 - 精彩重播',
    fighters: '蕭敬騰 vs 周湯豪',
    date: '2026-01-01',
  },
  {
    id: 7,
    thumbnail: boxingPic1,
    title: '春季邀請賽 - 精彩重播',
    fighters: '林書豪 vs 郭泓志',
    date: '2026-03-13',
  },
  {
    id: 8,
    thumbnail: boxingPic2,
    title: '全國錦標賽 - 精彩重播',
    fighters: '陳信安 vs 吳岱豪',
    date: '2026-04-19',
  },
  {
    id: 9,
    thumbnail: boxingPic3,
    title: '業餘挑戰賽 - 精彩重播',
    fighters: '周思齊 vs 彭政閔',
    date: '2026-05-23',
  },
  {
    id: 10,
    thumbnail: boxingPic4,
    title: '新人王爭奪戰 - 精彩重播',
    fighters: '江宏傑 vs 林昀儒',
    date: '2026-07-01',
  },
  {
    id: 11,
    thumbnail: boxingPic5,
    title: '國際對抗賽 - 精彩重播',
    fighters: '王建民 vs 陳偉殷',
    date: '2026-08-09',
  },
  {
    id: 12,
    thumbnail: boxingPic6,
    title: '菁英邀請賽 - 精彩重播',
    fighters: '郭泓志 vs 張泰山',
    date: '2026-09-15',
  },
];

export function EventReplays() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const pageCount = Math.ceil(replays.length / pageSize);
  const start = (page - 1) * pageSize;
  const visible = replays.slice(start, start + pageSize);

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

      <h2 className="text-2xl mb-6">賽事重播</h2>

      <div className="space-y-4">
        {visible.map((rep) => (
          <div
            key={rep.id}
            className="flex items-center gap-6 bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg overflow-hidden hover:border-[var(--boxing-blue)] hover:bg-[var(--charcoal)] transition-all group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-48 h-28 flex-shrink-0 overflow-hidden">
              <img
                src={rep.thumbnail}
                alt={rep.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 py-4 pr-4">
              <h3 className="text-lg font-semibold group-hover:text-[var(--boxing-blue)] mb-1">
                {rep.title}
              </h3>
              <p className="text-gray-400 text-sm mb-1">選手：{rep.fighters}</p>
              <p className="text-gray-500 text-xs">日期：{rep.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-2 text-sm">
        <Button
          size="sm"
          variant="outline"
          className="border-[var(--charcoal-lighter)] text-gray-300 hover:bg-[var(--charcoal)]"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          上一頁
        </Button>
        <span>
          第 {page} / {pageCount} 頁
        </span>
        <Button
          size="sm"
          variant="outline"
          className="border-[var(--charcoal-lighter)] text-gray-300 hover:bg-[var(--charcoal)]"
          disabled={page === pageCount}
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
        >
          下一頁
        </Button>
      </div>
    </div>
  );
} 