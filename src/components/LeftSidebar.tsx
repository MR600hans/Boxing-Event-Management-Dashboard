import {
  Home,
  Calendar,
  Users,
  Video,
  ClipboardList,
  Flame,
  UserCheck,
  Settings,
  BarChart3,
  Trophy,
  Shield,
  Headphones,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { icon: Home, label: '首頁', path: '/' },
  { icon: Calendar, label: '賽事管理', path: '/events' },
  { icon: BarChart3, label: '數據分析', path: '#' },
  { icon: Trophy, label: '排行榜', path: '#' },
  { icon: Shield, label: '規則說明', path: '#' },
  { icon: Headphones, label: '支援', path: '#' },
  { icon: Settings, label: '設定', path: '#' },
  { icon: Video, label: '賽事重播', path: '/replays' },
  { icon: Users, label: '工作人員管理', path: '/staff' },
  { icon: Flame, label: '進行中賽事', path: '/live' },
  { icon: UserCheck, label: '選手檢錄', path: '/check-in' },
];

export function LeftSidebar() {
  const { t } = useTranslation();

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <NavLink
            to="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Trophy className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">拳擊賽事管理</span>
          </NavLink>
          {sidebarItems.map(({ icon: Icon, label, path }) => (
            <Tooltip key={path}>
              <TooltipTrigger asChild>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      isActive ? 'bg-accent text-accent-foreground' : ''
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  );
}