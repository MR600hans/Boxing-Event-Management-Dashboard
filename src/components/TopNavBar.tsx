import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function TopNavBar() {
  // 已移除語系切換功能
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--charcoal-light)] border-b border-[var(--charcoal-lighter)] flex items-center justify-between px-6 z-40">
      {/* Search Section */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜尋賽事、拳手、對戰..."
            className="pl-10 bg-[var(--charcoal)] border-[var(--charcoal-lighter)] text-white placeholder:text-gray-400 focus:border-[var(--boxing-blue)]"
          />
        </div>
      </div>

      {/* Title Section */}
      <div className="flex-1 text-center">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-[var(--boxing-red)]">Fight</span>
          <span className="text-[var(--boxing-blue)]">Zone</span>
        </h1>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4 flex-1 justify-end">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white hover:bg-[var(--charcoal)]">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--boxing-red)] text-white text-xs flex items-center justify-center p-0">
            3
          </Badge>
        </Button>

        {/* Profile */}
        <div className="flex items-center space-x-2 bg-[var(--charcoal)] rounded-lg px-3 py-2 cursor-pointer hover:bg-[var(--charcoal-lighter)] transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--boxing-red)] to-[var(--boxing-blue)] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm">
            <div className="text-white">Alex Thompson</div>
            <div className="text-gray-400 text-xs">Event Manager</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}