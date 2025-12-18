import React, { useState, useRef } from 'react';
import { EmotionType, ContextType, StatusType } from '../types';
import { MOOD_CONFIG, CONTEXT_CONFIG, STATUS_CONFIG, CONTEXT_GROUPS, STATUS_GROUPS } from '../constants';
import { Send, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface LetterWriterProps {
  onSend: (content: string, emotion: EmotionType, intensity: number, contexts: ContextType[], status: StatusType[]) => void;
  onCancel: () => void;
}

export const LetterWriter: React.FC<LetterWriterProps> = ({ onSend, onCancel }) => {
  const [step, setStep] = useState<1 | 2>(1); // 1: Check-in, 2: Writing
  
  // Data States
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [selectedContexts, setSelectedContexts] = useState<ContextType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<StatusType[]>([]);

  // Refs for auto-scrolling
  const contextRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const toggleContext = (ctx: ContextType) => {
    setSelectedContexts(prev => 
      prev.includes(ctx) ? prev.filter(c => c !== ctx) : [...prev, ctx]
    );
  };

  const toggleStatus = (st: StatusType) => {
    setSelectedStatus(prev => 
      prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
    );
  };

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    // Smooth scroll to next section after a brief delay
    setTimeout(() => {
      contextRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleSubmit = () => {
    if (selectedEmotion && content.trim()) {
      onSend(content, selectedEmotion, intensity, selectedContexts, selectedStatus);
    }
  };

  const getDayGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return '좋은 아침이에요';
    if (hours < 18) return '좋은 오후예요';
    return '편안한 밤 되세요';
  };

  // Helper to get active styles based on current emotion
  const getActiveTheme = () => {
    if (!selectedEmotion) return { border: 'border-slate-800', bg: 'bg-slate-800', text: 'text-slate-800', chip: 'bg-slate-800 text-white' };
    const config = MOOD_CONFIG[selectedEmotion];
    return {
      activeColor: config.activeColor,
      baseColor: config.color,
      chipColor: config.chipColor,
      label: config.label,
    };
  };

  const theme = getActiveTheme();

  // Step 1: Systematic Check-in
  if (step === 1) {
    return (
      <div className="flex flex-col h-full bg-slate-50 animate-slide-up overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b border-slate-100 z-10 shadow-sm">
          <button onClick={onCancel} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50">
            <X size={24} />
          </button>
          <div className="flex flex-col items-center">
             <span className="font-serif text-lg text-slate-800 font-bold">마음 체크인</span>
             <span className="text-xs text-slate-400">Step 1 of 2</span>
          </div>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32">
          <div className="p-6 space-y-0 relative">
            {/* Vertical Connecting Line */}
            <div className="absolute left-[35px] top-10 bottom-20 w-0.5 bg-slate-200 -z-0"></div>

            {/* 1. Emotion Section */}
            <section className="relative pb-10">
              <div className="flex items-center mb-4 bg-slate-50 z-10 w-fit pr-4">
                <div className={`w-8 h-8 rounded-full ${selectedEmotion ? 'bg-slate-800 text-white' : 'bg-white border-2 border-slate-300 text-slate-400'} flex items-center justify-center text-sm font-bold shadow-sm transition-colors z-10`}>1</div>
                <h2 className={`ml-3 text-lg font-bold ${selectedEmotion ? 'text-slate-800' : 'text-slate-400'}`}>오늘의 감정 날씨</h2>
              </div>
              
              <div className="pl-11">
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(MOOD_CONFIG) as EmotionType[]).map((emotion) => {
                    const config = MOOD_CONFIG[emotion];
                    const Icon = config.icon;
                    const isSelected = selectedEmotion === emotion;
                    
                    return (
                      <button
                        key={emotion}
                        onClick={() => handleEmotionSelect(emotion)}
                        className={`p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 border ${
                          isSelected 
                            ? `${config.activeColor} border-transparent shadow-md transform scale-[1.02]` 
                            : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${isSelected ? 'bg-white/40' : 'bg-slate-50'}`}>
                          <Icon size={24} className={isSelected ? 'text-slate-900' : 'text-slate-400'} />
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>{config.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Intensity Slider */}
                <div className={`mt-4 overflow-hidden transition-all duration-500 ${selectedEmotion ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between text-xs text-slate-500 mb-3 font-medium px-1">
                      <span>흐림 (약하게)</span>
                      <span className="text-slate-800 font-bold">강도: {intensity}</span>
                      <span>폭풍 (강하게)</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      value={intensity}
                      onChange={(e) => setIntensity(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                    />
                    <div className="flex justify-between mt-1 px-1">
                       {[1,2,3,4,5].map(i => (
                         <div key={i} className={`w-1 h-1 rounded-full ${i <= intensity ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Context Section */}
            <section ref={contextRef} className={`relative pb-10 transition-opacity duration-500 ${selectedEmotion ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="flex items-center mb-4 bg-slate-50 z-10 w-fit pr-4">
                <div className={`w-8 h-8 rounded-full ${selectedContexts.length > 0 ? 'bg-slate-800 text-white' : 'bg-white border-2 border-slate-300 text-slate-400'} flex items-center justify-center text-sm font-bold shadow-sm transition-colors z-10`}>2</div>
                <div className="ml-3">
                   <h2 className={`text-lg font-bold ${selectedEmotion ? 'text-slate-800' : 'text-slate-400'}`}>원인이 되는 상황</h2>
                   {selectedEmotion && <p className="text-xs text-slate-500">무엇이 당신을 <span className="font-bold">{theme.label}</span>으로 이끌었나요?</p>}
                </div>
              </div>

              <div className="pl-11 space-y-4">
                {Object.values(CONTEXT_GROUPS).map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{group.label}</span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((ctx) => {
                        const config = CONTEXT_CONFIG[ctx];
                        const isSelected = selectedContexts.includes(ctx);
                        const Icon = config.icon;
                        
                        return (
                          <button
                            key={ctx}
                            onClick={() => toggleContext(ctx)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center space-x-2 ${
                              isSelected
                                ? `${theme.chipColor} shadow-sm border-transparent`
                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-white'
                            }`}
                          >
                            <Icon size={14} className={isSelected ? 'opacity-100' : 'opacity-50'} />
                            <span>{config.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Status Section */}
            <section ref={statusRef} className={`relative transition-opacity duration-500 ${selectedEmotion ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="flex items-center mb-4 bg-slate-50 z-10 w-fit pr-4">
                <div className={`w-8 h-8 rounded-full ${selectedStatus.length > 0 ? 'bg-slate-800 text-white' : 'bg-white border-2 border-slate-300 text-slate-400'} flex items-center justify-center text-sm font-bold shadow-sm transition-colors z-10`}>3</div>
                <div className="ml-3">
                  <h2 className={`text-lg font-bold ${selectedEmotion ? 'text-slate-800' : 'text-slate-400'}`}>나의 몸 상태</h2>
                  {selectedEmotion && <p className="text-xs text-slate-500">몸은 어떻게 반응하고 있나요?</p>}
                </div>
              </div>

              <div className="pl-11 space-y-4">
                 {Object.values(STATUS_GROUPS).map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{group.label}</span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((st) => {
                        const config = STATUS_CONFIG[st];
                        const isSelected = selectedStatus.includes(st);
                        const Icon = config.icon;
                        
                        return (
                          <button
                            key={st}
                            onClick={() => toggleStatus(st)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center space-x-2 ${
                              isSelected
                                ? `${theme.chipColor} shadow-sm border-transparent`
                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <Icon size={14} className={isSelected ? 'opacity-100' : 'opacity-50'} />
                            <span>{config.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 z-20">
           <button
             onClick={() => setStep(2)}
             disabled={!selectedEmotion}
             className="w-full py-4 bg-slate-800 text-white rounded-2xl font-medium shadow-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
           >
             <span>이야기 들려주기</span>
             <ArrowRight size={18} />
           </button>
        </div>
      </div>
    );
  }

  // Step 2: Writing (The Letter)
  return (
    <div className="flex flex-col h-full bg-[#fdfbf7] animate-fade-in relative">
      <header className="flex justify-between items-center p-4 border-b border-stone-100 bg-[#fdfbf7] z-10">
        <button onClick={() => setStep(1)} className="text-sm text-slate-500 flex items-center space-x-1 hover:text-slate-800 transition-colors">
          <ArrowLeft size={18} />
          <span>다시 선택</span>
        </button>
        <span className="font-serif text-slate-700 font-bold text-lg">Dear Selly</span>
        <button 
          onClick={handleSubmit} 
          disabled={!content.trim()}
          className="px-4 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center space-x-2 shadow-sm"
        >
          <span className="text-sm font-medium">보내기</span>
          <Send size={14} />
        </button>
      </header>

      {/* Selected Tags Summary */}
      <div className="px-6 py-4 bg-stone-50 border-b border-stone-100">
        <div className="flex items-center space-x-2 mb-2">
           {selectedEmotion && (
             <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${MOOD_CONFIG[selectedEmotion].chipColor} border`}>
               <span>{MOOD_CONFIG[selectedEmotion].label} {intensity}/5</span>
             </span>
           )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {selectedContexts.map(c => (
            <span key={c} className="text-[10px] px-2 py-1 rounded-md bg-white border border-stone-200 text-stone-500 flex items-center">
              #{CONTEXT_CONFIG[c].label}
            </span>
          ))}
          {selectedStatus.map(s => (
            <span key={s} className="text-[10px] px-2 py-1 rounded-md bg-white border border-stone-200 text-stone-500 flex items-center">
              @{STATUS_CONFIG[s].label}
            </span>
          ))}
        </div>
      </div>

      <main className="flex-1 relative overflow-y-auto">
        {/* Lined Paper Background */}
        <div className="absolute inset-0 pointer-events-none opacity-50" 
             style={{ 
               backgroundImage: 'linear-gradient(#e7e5e4 1px, transparent 1px)', 
               backgroundSize: '100% 2.5rem', 
               marginTop: '2.5rem' 
             }}>
        </div>
        
        <div className="p-6 min-h-full">
          <p className="text-slate-400 mb-4 font-serif italic text-lg">{getDayGreeting()}, 셀리에게</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘 하루는 어땠나요? 당신의 이야기를 들려주세요..."
            className="w-full h-[calc(100%-3rem)] bg-transparent resize-none focus:outline-none text-lg leading-[2.5rem] text-slate-700 font-serif placeholder:text-slate-300"
            autoFocus
          />
        </div>
      </main>
    </div>
  );
};