export enum EmotionType {
  JOY = 'JOY',
  CALM = 'CALM',
  ANXIOUS = 'ANXIOUS',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  TIRED = 'TIRED'
}

export enum ContextType {
  WORK = 'WORK',           // 일/학업
  RELATIONSHIP = 'RELATIONSHIP', // 인간관계
  HEALTH = 'HEALTH',       // 건강
  FUTURE = 'FUTURE',       // 미래/진로
  MONEY = 'MONEY',         // 재정
  FAMILY = 'FAMILY',       // 가족
  DAILY = 'DAILY',         // 일상
  MYSELF = 'MYSELF'        // 나 자신
}

export enum StatusType {
  INSOMNIA = 'INSOMNIA',   // 불면/수면부족
  STRESS = 'STRESS',       // 스트레스
  HEADACHE = 'HEADACHE',   // 두통/통증
  LETHARGY = 'LETHARGY',   // 무기력
  CONFUSION = 'CONFUSION', // 생각 과다
  APPETITE = 'APPETITE',   // 식욕 변화
  FOCUS = 'FOCUS',         // 집중력 저하
  OK = 'OK'                // 신체 양호
}

export interface UserProfile {
  name: string;
  isOnboarded: boolean;
  streak: number;
}

export interface Letter {
  id: string;
  date: string; // ISO string
  content: string;
  emotion: EmotionType;
  intensity: number; // 1-5
  contexts: ContextType[]; // New: Situation context
  status: StatusType[];    // New: Physical/Mental status
  replyId?: string;
  isRead: boolean;
}

export interface Reply {
  id: string;
  letterId: string;
  date: string;
  content: string;
  summary: string; // "Cloudy then sunny"
  giftSeed: PlantType;
  advice: string;
}

export enum PlantType {
  SUNFLOWER = 'SUNFLOWER', // Joy
  LAVENDER = 'LAVENDER',   // Calm
  CACTUS = 'CACTUS',       // Anxious (Resilience)
  FORGET_ME_NOT = 'FORGET_ME_NOT', // Sad
  ROSE = 'ROSE',           // Angry
  CHAMOMILE = 'CHAMOMILE', // Tired
  UNKNOWN = 'UNKNOWN'
}

export interface Plant {
  id: string;
  type: PlantType;
  plantedDate: string;
  growthStage: 'seed' | 'sprout' | 'blooming' | 'mature';
  sourceLetterId: string;
}

export interface DailyStats {
  date: string;
  moodScore: number; // 1-5
}