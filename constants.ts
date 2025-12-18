import { EmotionType, PlantType, ContextType, StatusType } from './types';
import { 
  CloudRain, Sun, Zap, Wind, Smile, BatteryLow, 
  Briefcase, Heart, Activity, TrendingUp, DollarSign, Home, Coffee, User,
  Moon, AlertCircle, Frown, ZapOff, HelpCircle, Utensils, Target, CheckCircle
} from 'lucide-react';

export const MOOD_CONFIG = {
  [EmotionType.JOY]: { 
    label: '기쁨', 
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800', 
    activeColor: 'bg-yellow-200 ring-yellow-300',
    chipColor: 'bg-yellow-100 border-yellow-300 text-yellow-900',
    icon: Sun, 
    plant: PlantType.SUNFLOWER 
  },
  [EmotionType.CALM]: { 
    label: '평온', 
    color: 'bg-emerald-100 border-emerald-300 text-emerald-800', 
    activeColor: 'bg-emerald-200 ring-emerald-300',
    chipColor: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    icon: Wind, 
    plant: PlantType.LAVENDER 
  },
  [EmotionType.ANXIOUS]: { 
    label: '불안', 
    color: 'bg-violet-100 border-violet-300 text-violet-800', 
    activeColor: 'bg-violet-200 ring-violet-300',
    chipColor: 'bg-violet-100 border-violet-300 text-violet-900',
    icon: Zap, 
    plant: PlantType.CACTUS 
  },
  [EmotionType.SAD]: { 
    label: '슬픔', 
    color: 'bg-blue-100 border-blue-300 text-blue-800', 
    activeColor: 'bg-blue-200 ring-blue-300',
    chipColor: 'bg-blue-100 border-blue-300 text-blue-900',
    icon: CloudRain, 
    plant: PlantType.FORGET_ME_NOT 
  },
  [EmotionType.ANGRY]: { 
    label: '분노', 
    color: 'bg-rose-100 border-rose-300 text-rose-800', 
    activeColor: 'bg-rose-200 ring-rose-300',
    chipColor: 'bg-rose-100 border-rose-300 text-rose-900',
    icon: Zap, 
    plant: PlantType.ROSE 
  },
  [EmotionType.TIRED]: { 
    label: '지침', 
    color: 'bg-stone-100 border-stone-300 text-stone-800', 
    activeColor: 'bg-stone-200 ring-stone-300',
    chipColor: 'bg-stone-100 border-stone-300 text-stone-900',
    icon: BatteryLow, 
    plant: PlantType.CHAMOMILE 
  },
};

export const CONTEXT_CONFIG = {
  [ContextType.WORK]: { label: '일/학업', icon: Briefcase },
  [ContextType.RELATIONSHIP]: { label: '관계', icon: Heart },
  [ContextType.HEALTH]: { label: '건강', icon: Activity },
  [ContextType.FUTURE]: { label: '미래/진로', icon: TrendingUp },
  [ContextType.MONEY]: { label: '재정', icon: DollarSign },
  [ContextType.FAMILY]: { label: '가족', icon: Home },
  [ContextType.DAILY]: { label: '일상', icon: Coffee },
  [ContextType.MYSELF]: { label: '나 자신', icon: User },
};

export const CONTEXT_GROUPS = {
  SOCIAL: { label: '관계 & 소통', items: [ContextType.RELATIONSHIP, ContextType.FAMILY] },
  WORK_LIFE: { label: '일 & 미래', items: [ContextType.WORK, ContextType.FUTURE, ContextType.MONEY] },
  PERSONAL: { label: '나 & 일상', items: [ContextType.HEALTH, ContextType.DAILY, ContextType.MYSELF] },
};

export const STATUS_CONFIG = {
  [StatusType.INSOMNIA]: { label: '잠 못 드는', icon: Moon },
  [StatusType.STRESS]: { label: '스트레스', icon: AlertCircle },
  [StatusType.HEADACHE]: { label: '두통/통증', icon: ZapOff },
  [StatusType.LETHARGY]: { label: '무기력', icon: BatteryLow },
  [StatusType.CONFUSION]: { label: '생각 복잡', icon: HelpCircle },
  [StatusType.APPETITE]: { label: '식욕 변화', icon: Utensils },
  [StatusType.FOCUS]: { label: '집중 안됨', icon: Target },
  [StatusType.OK]: { label: '몸은 괜찮아요', icon: CheckCircle },
};

export const STATUS_GROUPS = {
  MENTAL: { label: '마음 상태', items: [StatusType.STRESS, StatusType.CONFUSION, StatusType.LETHARGY, StatusType.FOCUS] },
  PHYSICAL: { label: '신체 반응', items: [StatusType.INSOMNIA, StatusType.HEADACHE, StatusType.APPETITE] },
  GENERAL: { label: '전반적', items: [StatusType.OK] },
};

export const PLANT_ASSETS = {
  [PlantType.SUNFLOWER]: { name: '빛나는 해바라기', emoji: '🌻', desc: '기쁨의 순간에서 자라납니다.' },
  [PlantType.LAVENDER]: { name: '평온한 라벤더', emoji: '🪻', desc: '차분한 성찰 속에서 피어납니다.' },
  [PlantType.CACTUS]: { name: '단단한 선인장', emoji: '🌵', desc: '불안 속에서도 굳건히 버팁니다.' },
  [PlantType.FORGET_ME_NOT]: { name: '물망초', emoji: '🫐', desc: '지나간 슬픔을 부드럽게 기억합니다.' },
  [PlantType.ROSE]: { name: '야생 장미', emoji: '🌹', desc: '강렬한 감정에서 피어난 열정입니다.' },
  [PlantType.CHAMOMILE]: { name: '휴식의 캐모마일', emoji: '🌼', desc: '지친 마음을 치유해 줍니다.' },
  [PlantType.UNKNOWN]: { name: '신비한 씨앗', emoji: '🌱', desc: '새로운 시작입니다.' },
};

export const GROWTH_LEVELS = {
  SEED: { stage: 'seed', label: '씨앗', emoji: '🌱', threshold: 0 },
  SPROUT: { stage: 'sprout', label: '새싹', emoji: '🌿', threshold: 1000 * 10 }, // 10 seconds
  BLOOMING: { stage: 'blooming', label: '꽃봉오리', emoji: '🪴', threshold: 1000 * 30 }, // 30 seconds
  MATURE: { stage: 'mature', label: '만개', emoji: null, threshold: 1000 * 60 }, // 60 seconds
};

export const STORAGE_KEYS = {
  USER: 'dear_selly_user',
  LETTERS: 'dear_selly_letters',
  REPLIES: 'dear_selly_replies',
  GARDEN: 'dear_selly_garden',
};