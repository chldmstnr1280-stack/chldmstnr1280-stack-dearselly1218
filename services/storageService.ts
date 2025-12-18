import { STORAGE_KEYS } from '../constants';
import { UserProfile, Letter, Reply, Plant } from '../types';

export const getStoredUser = (): UserProfile | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const saveUser = (user: UserProfile) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getStoredLetters = (): Letter[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LETTERS);
  return data ? JSON.parse(data) : [];
};

export const saveLetter = (letter: Letter) => {
  const letters = getStoredLetters();
  localStorage.setItem(STORAGE_KEYS.LETTERS, JSON.stringify([letter, ...letters]));
};

export const getStoredReplies = (): Reply[] => {
  const data = localStorage.getItem(STORAGE_KEYS.REPLIES);
  return data ? JSON.parse(data) : [];
};

export const saveReply = (reply: Reply) => {
  const replies = getStoredReplies();
  localStorage.setItem(STORAGE_KEYS.REPLIES, JSON.stringify([reply, ...replies]));
};

export const getStoredPlants = (): Plant[] => {
  const data = localStorage.getItem(STORAGE_KEYS.GARDEN);
  return data ? JSON.parse(data) : [];
};

export const savePlant = (plant: Plant) => {
  const plants = getStoredPlants();
  localStorage.setItem(STORAGE_KEYS.GARDEN, JSON.stringify([plant, ...plants]));
};

export const savePlants = (plants: Plant[]) => {
  localStorage.setItem(STORAGE_KEYS.GARDEN, JSON.stringify(plants));
};

export const clearData = () => {
  localStorage.clear();
};