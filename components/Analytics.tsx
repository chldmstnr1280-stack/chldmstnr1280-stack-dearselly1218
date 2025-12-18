import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { Letter, EmotionType } from '../types';
import { format, parseISO } from 'date-fns';
import { MOOD_CONFIG } from '../constants';

interface AnalyticsProps {
  letters: Letter[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ letters }) => {
  // Prepare data for charts
  const data = letters
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(letter => ({
      date: format(parseISO(letter.date), 'MM/dd'),
      intensity: letter.intensity,
      emotion: letter.emotion,
    }))
    .slice(-7); // Last 7 entries

  const emotionCounts = letters.reduce((acc, letter) => {
    acc[letter.emotion] = (acc[letter.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      <header className="p-6">
        <h2 className="text-2xl font-serif text-slate-800">마음 날씨</h2>
        <p className="text-sm text-slate-500">당신의 감정 변화를 기록합니다.</p>
      </header>

      <main className="p-6 space-y-8">
        {/* Mood Intensity Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-4 text-sm">감정의 강도 (최근 7일)</h3>
          <div className="h-48 w-full">
            {data.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#475569" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 6]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="intensity" 
                    stroke="#475569" 
                    fillOpacity={1} 
                    fill="url(#colorIntensity)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-400 text-center">
                아직 데이터가 충분하지 않아요.<br/>편지를 더 써주세요!
              </div>
            )}
          </div>
        </div>

        {/* Emotion Distribution */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-4 text-sm">감정 분포</h3>
          <div className="space-y-3">
             {Object.entries(emotionCounts).map(([emotion, count]) => {
                const total = letters.length;
                const percentage = Math.round(((count as number) / total) * 100);
                const emotionLabel = MOOD_CONFIG[emotion as EmotionType]?.label || emotion;
                const emotionColor = MOOD_CONFIG[emotion as EmotionType]?.color.split(' ')[0] || 'bg-slate-200';
                
                return (
                  <div key={emotion} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span className="capitalize">{emotionLabel}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${emotionColor} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
             })}
             {letters.length === 0 && (
               <p className="text-xs text-slate-400 text-center py-4">아직 기록된 감정이 없어요.</p>
             )}
          </div>
        </div>
      </main>
    </div>
  );
};