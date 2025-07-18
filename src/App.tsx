import { TopNavBar } from './components/TopNavBar';
import { DashboardHome } from './components/DashboardHome';
import { EventManagement } from './components/EventManagement';
import { EventDetail } from './components/EventDetail';
import { EventReplays } from './components/EventReplays';
import { OngoingBouts } from './components/OngoingBouts';
import { StaffManagement } from './components/StaffManagement';
import { CheckIn } from './components/CheckIn';
import { BoutDetail } from './components/BoutDetail';
import { RefereeScoring } from './components/RefereeScoring';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--charcoal)] text-white">
        {/* Sidebar removed */}

        {/* Main Content Area */}
        <div>
          {/* Fixed Top Navigation */}
          <TopNavBar />

          {/* Scrollable Content */}
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/events" element={<EventManagement />} />
              <Route path="/replays" element={<EventReplays />} />
              <Route path="/live" element={<OngoingBouts />} />
              <Route path="/live/:boutId" element={<BoutDetail />} />
              <Route path="/live/:boutId/score" element={<RefereeScoring />} />
              <Route path="/staff" element={<StaffManagement />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/check-in" element={<CheckIn />} />
            </Routes>

            {/* Footer */}
            <footer className="border-t border-[var(--charcoal-lighter)] py-8">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-[var(--boxing-red)] mb-4">FightZone Dashboard</h3>
                    <p className="text-gray-400 text-sm">
                      Professional boxing event management system for live events, 
                      fighter coordination, and real-time audience engagement.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white mb-4">Quick Stats</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>Active Events</span>
                        <span className="text-[var(--boxing-blue)]">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Fighters</span>
                        <span className="text-[var(--boxing-blue)]">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Staff On Duty</span>
                        <span className="text-[var(--boxing-blue)]">48</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Live Audience</span>
                        <span className="text-[var(--boxing-red)]">37,010</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white mb-4">System Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-400">All Systems Operational</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[var(--boxing-blue)] rounded-full animate-pulse"></div>
                        <span className="text-gray-400">Live Streaming Active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[var(--boxing-red)] rounded-full animate-pulse"></div>
                        <span className="text-gray-400">4 Matches in Progress</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--charcoal-lighter)] text-center text-gray-500 text-sm">
                  <p>&copy; 2025 FightZone Dashboard. Professional Boxing Event Management System.</p>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}