import React from 'react';
import { Reply } from '../types';
import { PLANT_ASSETS } from '../constants';
import { ArrowRight } from 'lucide-react';

interface ReplyViewProps {
  reply: Reply;
  onClose: () => void;
}

export const ReplyView: React.FC<ReplyViewProps> = ({ reply, onClose }) => {
  const plantAsset = PLANT_ASSETS[reply.giftSeed];

  return (
    <div className="fixed inset-0 z-50 bg-[#fdfbf7] flex flex-col animate-fade-in overflow-y-auto">
      <div className="p-8 max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex-1 space-y-8">
          <header className="border-b border-stone-200 pb-6 mt-8">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">From Selly</span>
            <h2 className="text-3xl font-serif text-slate-800 mt-2">좋은 아침이에요.</h2>
          </header>

          <div className="prose prose-slate prose-lg">
            <p className="whitespace-pre-wrap font-serif leading-relaxed text-slate-700">
              {reply.content}
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 space-y-2">
            <span className="text-xs font-bold text-stone-400 uppercase">작은 발걸음</span>
            <p className="text-slate-600 italic">{reply.advice}</p>
          </div>

          <div className="py-8 flex flex-col items-center justify-center space-y-4 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <p className="text-sm text-slate-500 uppercase tracking-wide">씨앗이 도착했습니다</p>
            <div className="w-24 h-24 bg-selly-garden rounded-full flex items-center justify-center text-5xl shadow-inner">
              {plantAsset.emoji}
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-700">{plantAsset.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{plantAsset.desc}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-800 text-white rounded-xl font-medium shadow-lg hover:bg-slate-700 transition-all flex items-center justify-center space-x-2 mt-8 mb-4"
        >
          <span>정원에 심기</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};