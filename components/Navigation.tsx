import React from 'react';
import { Home, PenTool, Flower2, BarChart2 } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
  hasUnreadReply: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, hasUnreadReply }) => {
  const navItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'write', label: '기록', icon: PenTool },
    { id: 'garden', label: '정원', icon: Flower2 },
    { id: 'analytics', label: '마음', icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 safe-area-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.id === 'home' && hasUnreadReply && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};