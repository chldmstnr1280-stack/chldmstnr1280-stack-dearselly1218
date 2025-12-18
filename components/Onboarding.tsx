import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({
        name: name.trim(),
        isOnboarded: true,
        streak: 0
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-selly-paper animate-fade-in">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-slate-800">Dear Selly</h1>
          <p className="text-slate-500 text-lg">당신을 위한 마음의 안식처</p>
        </div>

        <div className="w-32 h-32 bg-selly-garden rounded-full mx-auto flex items-center justify-center text-6xl shadow-inner">
          🌱
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-600">셀리가 당신을 어떻게 부르면 될까요?</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-center text-2xl border-b-2 border-slate-200 bg-transparent py-2 focus:outline-none focus:border-slate-400 transition-colors"
              placeholder="이름 입력"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 px-6 bg-slate-800 text-white rounded-xl font-medium shadow-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            정원으로 입장하기
          </button>
        </form>
      </div>
    </div>
  );
};