import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Zap, 
  PlayCircle, 
  Users, 
  Settings, 
  Sliders 
} from 'lucide-react';
import { Card } from './ui/card';

const dashboardCards = [
  {
    id: 'checkin',
    icon: UserCheck,
    title: '選手檢錄',
    description: '管理選手抵達、稱重與賽前流程',
    status: '啟用',
    count: '24',
    color: 'red',
    gradient: 'from-[var(--boxing-red)] to-[var(--boxing-red-light)]'
  },
  {
    id: 'ongoing',
    icon: Zap,
    title: '進行中對戰',
    description: '監控現場比賽、比分及即時數據',
    status: '直播',
    count: '4',
    color: 'blue',
    gradient: 'from-[var(--boxing-blue)] to-[var(--boxing-blue-light)]'
  },
  {
    id: 'replays',
    icon: PlayCircle,
    title: '賽事重播',
    description: '存取賽事錄影、精華與分析',
    status: '可用',
    count: '156',
    color: 'red',
    gradient: 'from-[var(--boxing-red-light)] to-[var(--boxing-red)]'
  },
  {
    id: 'staff',
    icon: Users,
    title: '人員管理',
    description: '協調裁判、評審、醫護與工作人員',
    status: '上班',
    count: '48',
    color: 'blue',
    gradient: 'from-[var(--boxing-blue-light)] to-[var(--boxing-blue)]'
  },
  {
    id: 'administration',
    icon: Settings,
    title: '賽事管理',
    description: '處理排程、合約、費用與文件',
    status: '啟用',
    count: '12',
    color: 'red',
    gradient: 'from-[var(--boxing-red)] to-[var(--boxing-blue)]'
  },
  {
    id: 'advanced',
    icon: Sliders,
    title: '進階設定',
    description: '設定系統偏好、整合與自訂',
    status: '準備就緒',
    count: '8',
    color: 'blue',
    gradient: 'from-[var(--boxing-blue)] to-[var(--boxing-red)]'
  }
];

export function DashboardCards() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl text-white mb-2">賽事管理總覽</h2>
        <p className="text-gray-400">快速存取重要賽事操作</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Card
            key={card.id}
            onClick={() => {
              if (card.id === 'administration') navigate('/events');
              if (card.id === 'replays') navigate('/replays');
              if (card.id === 'ongoing') navigate('/live');
              if (card.id === 'staff') navigate('/staff');
            }}
            className="bg-[var(--charcoal-light)] border-[var(--charcoal-lighter)] hover:border-[var(--boxing-blue)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            {/* Background Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl text-white group-hover:text-[var(--boxing-${card.color})] transition-colors`}>
                    {card.count}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    {card.status}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-white group-hover:text-[var(--boxing-blue)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action Indicator */}
              <div className="mt-4 flex items-center justify-between">
                <div className={`w-2 h-2 rounded-full bg-[var(--boxing-${card.color})] animate-pulse`}></div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  點擊進入
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}