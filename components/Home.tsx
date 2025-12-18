import React from 'react';
import { UserProfile, Reply, Letter } from '../types';
import { Mail, Moon, Sun } from 'lucide-react';
import { SellyMascot } from './SellyMascot';

interface HomeProps {
  user: UserProfile;
  lastReply: Reply | null;
  unreadCount: number;
  onReadReply: () => void;
  onWrite: () => void;
  pendingLetter: boolean;
}

export const Home: React.FC<HomeProps> = ({ 
  user, 
  lastReply, 
  unreadCount, 
  onReadReply,
  onWrite,
  pendingLetter
}) => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return '좋은 아침이에요';
    if (hours < 18) return '좋은 오후예요';
    return '안녕하세요';
  };

  const getMascotEmotion = () => {
    if (unreadCount > 0) return 'excited';
    if (pendingLetter) return 'calm';
    return 'happy';
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 pb-24 overflow-y-auto">
      <header className="mb-2 mt-2 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-slate-800 mb-1">{getGreeting()},<br/>{user.name}님.</h1>
        </div>
      </header>
      
      {/* Mascot Section */}
      <div className="flex justify-center -mt-4 mb-4 relative z-10">
        <SellyMascot emotion={getMascotEmotion()} size={180} />
      </div>

      <div className="space-y-6 relative z-20">
        {/* Morning Reply Card */}
        {unreadCount > 0 ? (
          <div 
            onClick={onReadReply}
            className="bg-selly-dark text-white rounded-2xl p-6 shadow-xl cursor-pointer transform transition-transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Mail size={80} />
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/10 rounded-full">
                <Sun className="text-yellow-300" size={20} />
              </div>
              <span className="font-medium text-blue-100">아침 답장</span>
            </div>
            <h3 className="text-xl font-serif mb-2">셀리로부터 편지가 도착했어요.</h3>
            <p className="text-slate-300 text-sm">터치해서 편지를 읽고 씨앗을 받으세요.</p>
            <div className="mt-4 inline-flex items-center text-xs font-bold text-yellow-300 uppercase tracking-wider">
              지금 읽기 →
            </div>
          </div>
        ) : pendingLetter ? (
          <div className="bg-slate-200 text-slate-500 rounded-2xl p-6 shadow-inner flex flex-col items-center justify-center text-center space-y-4">
             <Moon size={32} className="text-slate-400" />
             <div>
               <h3 className="font-medium">셀리가 생각하고 있어요...</h3>
               <p className="text-sm mt-1">편지가 전송되었습니다. 아침에 다시 확인해주세요.</p>
             </div>
          </div>
        ) : (
          <div 
            onClick={onWrite}
            className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-slate-50 hover:border-slate-400 transition-colors py-8"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
               <span className="text-2xl">✍️</span>
            </div>
            <h3 className="text-slate-600 font-medium">오늘의 밤 편지 쓰기</h3>
            <p className="text-slate-400 text-sm max-w-xs">당신의 마음을 털어놓으세요.<br/>셀리가 듣고 있답니다.</p>
          </div>
        )}

        {/* Quick Quote / Insight */}
        {lastReply && !unreadCount && (
          <div className="bg-[#fdfbf7] p-6 rounded-2xl border border-stone-200 shadow-sm">
             <p className="font-serif italic text-slate-700 text-lg leading-relaxed">"{lastReply.summary}"</p>
             <div className="mt-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-lime-50 border border-lime-200 flex items-center justify-center overflow-hidden shrink-0">
                  <SellyMascot emotion="calm" size={40} className="mt-1" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700">Selly</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">마음 정원사</span>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};