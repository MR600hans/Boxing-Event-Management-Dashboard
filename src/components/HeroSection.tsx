import { Play, Users, Trophy, Timer } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import boxingPic1 from '@/assets/boxingPic1.jpg';
import boxingPic2 from '@/assets/boxingPic2.jpg';
import boxingPic3 from '@/assets/boxingPic3.jpg';
import boxingPic4 from '@/assets/boxingPic4.jpg';
import boxingPic5 from '@/assets/boxingPic5.jpg';
import boxingPic6 from '@/assets/boxingPic6.jpg';

export function HeroSection() {
  const boxingImages = [
    boxingPic1,
    boxingPic2,
    boxingPic3,
    boxingPic4,
    boxingPic5,
    boxingPic6,
  ];

  const boxingRings = [
    {
      id: 1,
      title: 'Championship Ring A',
      status: '進行中',
      fighters: 'Rodriguez vs. Thompson',
      round: 'Round 8/12',
      audience: '15,240',
    },
    {
      id: 2,
      title: 'Training Ring B',
      status: '即將開始',
      fighters: 'Martinez vs. Johnson',
      round: 'Scheduled 8:30 PM',
      audience: '12,850',
    },
    {
      id: 3,
      title: 'Exhibition Ring C',
      status: '熱身',
      fighters: 'Davis vs. Wilson',
      round: 'Starting Soon',
      audience: '8,920',
    },
    {
      id: 4,
      title: 'Practice Ring D',
      status: '可用',
      fighters: 'Open for Training',
      round: 'Ready',
      audience: '0',
    },
  ];

  return (
    <div className="relative h-80 bg-gradient-to-br from-[var(--charcoal)] via-[var(--charcoal-light)] to-[var(--charcoal)] overflow-hidden">
      
      {/* Boxing Photos in Moving Blocks */}
      <div className="absolute inset-0 opacity-40">
        <div className="animate-boxing-ring flex h-full">
          {boxingImages.map((imageUrl, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-96 h-full relative overflow-hidden transition-transform duration-500"
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={imageUrl}
                  alt={`Boxing action ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/80 via-transparent to-[var(--charcoal)]/60"></div>
                
                {/* 去除彩色方框與角落圓點，改為純圖片顯示 */}
              </div>
            </div>
          ))}
          
          {/* Duplicate images for seamless loop */}
          {boxingImages.map((imageUrl, index) => (
            <div 
              key={`duplicate-${index}`} 
              className="flex-shrink-0 w-96 h-full relative overflow-hidden transition-transform duration-500"
            >
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={imageUrl}
                  alt={`Boxing action duplicate ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/80 via-transparent to-[var(--charcoal)]/60"></div>
                
                {/* 去除彩色方框與角落圓點，改為純圖片顯示 */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center bg-[var(--charcoal)]/20 backdrop-blur-none">
        <div className="container mx-auto px-6">
          <div className="flex items-start py-8">
            {/* Left Content */}
            <div className="bg-[var(--charcoal)]/60 backdrop-blur-lg rounded-xl p-6 flex flex-col justify-between w-full lg:w-1/3 transform transition-transform duration-300 hover:scale-105 hover:bg-[var(--charcoal)]/70 cursor-pointer border border-transparent hover:border-[var(--boxing-blue)]">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-[var(--boxing-red)] text-white hover:bg-[var(--boxing-red-light)] animate-pulse-red">
                  <Play className="w-3 h-3 mr-1" />
                  直播賽事
                </Badge>
                <Badge variant="outline" className="border-[var(--boxing-blue)] text-[var(--boxing-blue)] animate-pulse-blue">
                  4 個賽場進行中
                </Badge>
              </div>
              
              <h1 className="text-4xl text-white mb-4 drop-shadow-lg">
                <span className="text-[var(--boxing-red)]">冠軍</span>{' '}
                <span className="text-[var(--boxing-blue)]">之夜</span>
              </h1>
              
              <p className="text-gray-200 text-lg mb-6 drop-shadow-md">
                同時管理 4 場拳擊賽，提供即時監控與現場觀眾互動。
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-white drop-shadow-md">
                  <Users className="w-5 h-5 text-[var(--boxing-blue)]" />
                  <span>37,010 現場觀眾</span>
                </div>
                <div className="flex items-center space-x-2 text-white drop-shadow-md">
                  <Trophy className="w-5 h-5 text-[var(--boxing-red)]" />
                  <span>3 場頭銜戰</span>
                </div>
                <div className="flex items-center space-x-2 text-white drop-shadow-md">
                  <Timer className="w-5 h-5 text-green-400" />
                  <span>直播開始於 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* 右側小方塊已移除 */}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--charcoal)] to-transparent z-5"></div>
    </div>
  );
}