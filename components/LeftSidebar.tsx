import { Home, Users, Settings, BarChart3, Calendar, Trophy, Shield, Headphones } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { icon: Home, label: '儀表板', path: '/' },
  { icon: Trophy, label: '賽事', path: '/events' },
  { icon: Users, label: '拳手', path: '#' },
  { icon: Calendar, label: '賽程', path: '#' },
  { icon: BarChart3, label: '分析', path: '#' },
  { icon: Shield, label: '安全', path: '#' },
  { icon: Headphones, label: '支援', path: '#' },
  { icon: Settings, label: '設定', path: '#' },
];

export function LeftSidebar() {
  return (
    <TooltipProvider>
      <div className="fixed left-0 top-0 h-full w-16 bg-[var(--charcoal-light)] border-r border-[var(--charcoal-lighter)] flex flex-col items-center py-6 z-50">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--boxing-red)] to-[var(--boxing-blue)] rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-4 flex-1">
          {sidebarItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path ?? '#'}
                  className={({ isActive }) =>
                    `w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                      isActive ? 'bg-[var(--boxing-red)] text-white animate-pulse-red' : 'text-gray-400 hover:text-white hover:bg-[var(--charcoal-lighter)]'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[var(--charcoal-light)] border-[var(--charcoal-lighter)]">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Bottom accent */}
        <div className="w-8 h-1 bg-gradient-to-r from-[var(--boxing-red)] to-[var(--boxing-blue)] rounded-full"></div>
      </div>
    </TooltipProvider>
  );
}