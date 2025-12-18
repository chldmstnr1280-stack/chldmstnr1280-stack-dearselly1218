import React from 'react';
import { Plant, PlantType } from '../types';
import { PLANT_ASSETS, GROWTH_LEVELS } from '../constants';

interface MindGardenProps {
  plants: Plant[];
}

export const MindGarden: React.FC<MindGardenProps> = ({ plants }) => {
  // Pad the grid to make it look full
  const gridCells = Array.from({ length: Math.max(plants.length + 8, 20) });

  const getPlantDisplay = (plant: Plant) => {
    // If mature, use the specific plant asset
    if (plant.growthStage === 'mature') {
      const asset = PLANT_ASSETS[plant.type] || PLANT_ASSETS[PlantType.UNKNOWN];
      return { emoji: asset.emoji, label: asset.name, isMature: true };
    }

    // Otherwise use the growth stage generic emoji
    let stageConfig = GROWTH_LEVELS.SEED;
    if (plant.growthStage === 'sprout') stageConfig = GROWTH_LEVELS.SPROUT;
    if (plant.growthStage === 'blooming') stageConfig = GROWTH_LEVELS.BLOOMING;

    return { emoji: stageConfig.emoji, label: stageConfig.label, isMature: false };
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50 to-selly-garden/30 overflow-hidden">
      <header className="p-6 pb-2">
        <h2 className="text-2xl font-serif text-slate-800">나의 마음 정원</h2>
        <p className="text-sm text-slate-500">당신의 감정들이 아름답게 자라나는 곳입니다.</p>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-4 pb-20">
          {gridCells.map((_, index) => {
            const plant = plants[index];
            if (!plant) {
              return (
                <div key={`empty-${index}`} className="aspect-square rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-stone-300/30"></div>
                </div>
              );
            }

            const display = getPlantDisplay(plant);
            
            return (
              <div 
                key={plant.id} 
                className="aspect-square rounded-2xl bg-white/80 border border-white shadow-sm flex flex-col items-center justify-center relative animate-slide-up group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span 
                  className={`text-3xl filter drop-shadow-sm transform transition-transform cursor-pointer origin-bottom animate-grow-bounce hover:animate-sway ${display.isMature ? 'group-hover:scale-110' : ''}`}
                  key={`${plant.id}-${plant.growthStage}`} // Key change triggers animation re-run on growth
                  style={{ animationFillMode: 'both', animationDelay: '150ms' }} // Wait for card to slide up before popping
                >
                  {display.emoji}
                </span>
                {!display.isMature && (
                  <span className="absolute -bottom-2 text-[10px] bg-white/90 text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {display.label}
                  </span>
                )}
                {plant.growthStage === 'seed' && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};