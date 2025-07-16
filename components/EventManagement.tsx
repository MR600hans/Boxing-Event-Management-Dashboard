import { Search, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
}

const events: Event[] = [
  {
    id: 1,
    name: '世界拳王爭霸戰',
    location: '台北小巨蛋',
    date: '2025-06-01 19:00',
  },
  {
    id: 2,
    name: '亞洲新秀挑戰賽',
    location: '高雄巨蛋',
    date: '2025-07-15 18:30',
  },
  {
    id: 3,
    name: '年度慈善拳擊夜',
    location: '台中洲際體育館',
    date: '2025-08-21 20:00',
  },
  {
    id: 4,
    name: '女子冠軍賽',
    location: '台北和平館',
    date: '2025-09-10 18:00',
  },
  {
    id: 5,
    name: '青少年盃',
    location: '桃園巨蛋',
    date: '2025-10-05 14:00',
  },
  {
    id: 6,
    name: '跨年特別賽',
    location: '台北世貿中心',
    date: '2025-12-31 22:30',
  },
  {
    id: 7,
    name: '春季邀請賽',
    location: '新竹體育館',
    date: '2026-03-12 19:30',
  },
  {
    id: 8,
    name: '全國錦標賽',
    location: '台南成功大學體育館',
    date: '2026-04-18 17:00',
  },
  {
    id: 9,
    name: '業餘挑戰賽',
    location: '高雄流行音樂中心',
    date: '2026-05-22 16:00',
  },
  {
    id: 10,
    name: '新人王爭奪戰',
    location: '嘉義縣立體育館',
    date: '2026-06-30 18:00',
  },
  {
    id: 11,
    name: '國際對抗賽',
    location: '台北小巨蛋',
    date: '2026-08-08 19:00',
  },
  {
    id: 12,
    name: '菁英邀請賽',
    location: '台中中興大學體育館',
    date: '2026-09-14 18:30',
  },
  {
    id: 13,
    name: '雙十節紀念賽',
    location: '花蓮體育館',
    date: '2026-10-10 15:00',
  },
];

export function EventManagement() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.ceil(events.length / pageSize);
  const startIdx = (page - 1) * pageSize;
  const visible = events.slice(startIdx, startIdx + pageSize);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]">
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回
      </Button>

      <h2 className="text-2xl text-white mb-4">賽事管理</h2>
      <div className="overflow-x-auto bg-[var(--charcoal-light)] rounded-lg border border-[var(--charcoal-lighter)]">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-[var(--charcoal)] text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">賽事名稱</th>
              <th className="px-6 py-4 whitespace-nowrap">地點</th>
              <th className="px-6 py-4 whitespace-nowrap">時間</th>
              <th className="px-6 py-4 whitespace-nowrap text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((event, idx) => (
              <tr
                key={event.id}
                className={
                  idx % 2 === 0
                    ? 'bg-[var(--charcoal-light)]'
                    : 'bg-[var(--charcoal)]'
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {event.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="border-[var(--boxing-blue)] text-[var(--boxing-blue)] hover:bg-[var(--boxing-red)] hover:border-[var(--boxing-red)] hover:text-white"
                  >
                    <Search className="w-4 h-4 mr-1" /> 查看
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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