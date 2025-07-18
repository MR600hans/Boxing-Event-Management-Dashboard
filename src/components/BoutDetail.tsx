import { useParams, useNavigate } from 'react-router-dom';
import { bouts, Bout } from './OngoingBouts';
import { ArrowLeft, User, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';

export function BoutDetail() {
  const { boutId } = useParams<{ boutId: string }>();
  const navigate = useNavigate();
  const bout = bouts.find((b) => b.id === Number(boutId));

  if (!bout) {
    return (
      <div className="container mx-auto px-6 py-8 text-white text-center">
        <h2 className="text-2xl">找不到比賽資訊</h2>
        <Button onClick={() => navigate('/live')} className="mt-4">返回列表</Button>
      </div>
    );
  }

  const renderPreMatchInfo = (bout: Bout) => (
    <div className="bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6 text-yellow-400">賽前準備狀態</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fighter 1 */}
        <div className="text-center">
          <User className="w-12 h-12 mx-auto mb-2 text-red-400" />
          <p className="font-bold text-lg">{bout.fighter1.name}</p>
          <div className={`flex items-center justify-center gap-2 mt-2 ${bout.fighter1.checkInStatus === '已檢錄' ? 'text-green-400' : 'text-gray-500'}`}>
            {bout.fighter1.checkInStatus === '已檢錄' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span>{bout.fighter1.checkInStatus}</span>
          </div>
        </div>
        {/* Fighter 2 */}
        <div className="text-center">
          <User className="w-12 h-12 mx-auto mb-2 text-blue-400" />
          <p className="font-bold text-lg">{bout.fighter2.name}</p>
          <div className={`flex items-center justify-center gap-2 mt-2 ${bout.fighter2.checkInStatus === '已檢錄' ? 'text-green-400' : 'text-gray-500'}`}>
            {bout.fighter2.checkInStatus === '已檢錄' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span>{bout.fighter2.checkInStatus}</span>
          </div>
        </div>
        {/* Referee */}
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="font-bold text-lg">裁判: {bout.referee.name}</p>
          <div className="mt-2">
            {bout.referee.loginStatus === '已登入' ? (
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>{bout.referee.loginStatus}</span>
              </div>
            ) : (
              <Button 
                onClick={() => navigate(`/live/${bout.id}/score`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                點擊登錄
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLiveMatchInfo = (bout: Bout) => (
    <div className="bg-[var(--charcoal-light)] border border-[var(--charcoal-lighter)] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-red-500">{bout.fighter1.name}</div>
        <div className="text-xl text-gray-400">vs</div>
        <div className="text-2xl font-bold text-blue-500">{bout.fighter2.name}</div>
      </div>
      <div className="text-center mb-6">
        <div className="text-6xl font-bold tracking-tighter">
          <span className="text-red-500">{bout.redScore}</span>
          <span className="mx-4 text-gray-600">-</span>
          <span className="text-blue-500">{bout.blueScore}</span>
        </div>
        <div className="text-yellow-400 text-2xl mt-2">{bout.round} - {bout.time}</div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8 text-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/live')}
        className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回對戰列表
      </Button>
      <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
              <img src={bout.thumbnail} alt="Bout" className="rounded-lg w-full object-cover shadow-lg" />
              <h2 className="text-3xl font-bold mt-4">{bout.fighter1.name} vs {bout.fighter2.name}</h2>
              <p className="text-gray-400">{bout.status === 'LIVE' ? '正在直播' : '即將開始'}</p>
          </div>
          <div className="md:w-2/3">
              {bout.status === '即將開始' ? renderPreMatchInfo(bout) : renderLiveMatchInfo(bout)}
          </div>
      </div>
    </div>
  );
} 