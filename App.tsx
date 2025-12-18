import React, { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import { LetterWriter } from './components/LetterWriter';
import { MindGarden } from './components/MindGarden';
import { Analytics } from './components/Analytics';
import { ReplyView } from './components/ReplyView';
import { 
  getStoredUser, saveUser, 
  getStoredLetters, saveLetter, 
  getStoredPlants, savePlant, savePlants,
  getStoredReplies, saveReply 
} from './services/storageService';
import { generateSellyReply } from './services/geminiService';
import { UserProfile, Letter, Reply, Plant, EmotionType, PlantType, ContextType, StatusType } from './types';
import { GROWTH_LEVELS } from './constants';
import { v4 as uuidv4 } from 'uuid'; // Need to add uuid logic or simpler ID generator

// Simple ID generator since we can't easily add packages
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState('home'); // home, write, garden, analytics
  const [letters, setLetters] = useState<Letter[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  
  // UX States
  const [showReply, setShowReply] = useState<Reply | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingLetter, setPendingLetter] = useState(false);

  // Initialize
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setLetters(getStoredLetters());
      setPlants(getStoredPlants());
      setReplies(getStoredReplies());
    }
  }, []);

  // Growth Logic System - Optimized
  useEffect(() => {
    const checkGrowth = () => {
      setPlants(currentPlants => {
        if (currentPlants.length === 0) return currentPlants;
        
        const now = new Date().getTime();
        let hasChanges = false;
        
        const updatedPlants = currentPlants.map(plant => {
          // Skip fully mature plants
          if (plant.growthStage === 'mature') return plant;

          const plantedTime = new Date(plant.plantedDate).getTime();
          const age = now - plantedTime;
          
          let newStage: Plant['growthStage'] = plant.growthStage;

          // Check thresholds (Order matters: check highest threshold first)
          if (age >= GROWTH_LEVELS.MATURE.threshold) {
            newStage = 'mature';
          } else if (age >= GROWTH_LEVELS.BLOOMING.threshold) {
            newStage = 'blooming';
          } else if (age >= GROWTH_LEVELS.SPROUT.threshold) {
            newStage = 'sprout';
          } else {
            newStage = 'seed';
          }
          
          if (newStage !== plant.growthStage) {
            hasChanges = true;
            return { ...plant, growthStage: newStage };
          }
          return plant;
        });

        if (hasChanges) {
          savePlants(updatedPlants);
          return updatedPlants;
        }
        return currentPlants;
      });
    };

    // Check every 2 seconds for smooth demo experience
    const interval = setInterval(checkGrowth, 2000);
    
    // Also run immediately
    checkGrowth();

    return () => clearInterval(interval);
  }, []); // Empty dependency array prevents interval reset

  const handleOnboardingComplete = (newUser: UserProfile) => {
    saveUser(newUser);
    setUser(newUser);
    setView('home');
  };

  const handleSendLetter = async (
    content: string, 
    emotion: EmotionType, 
    intensity: number,
    contexts: ContextType[],
    status: StatusType[]
  ) => {
    if (!user) return;
    setIsProcessing(true);

    const newLetter: Letter = {
      id: generateId(),
      date: new Date().toISOString(),
      content,
      emotion,
      intensity,
      contexts,
      status,
      isRead: false
    };

    saveLetter(newLetter);
    setLetters(prev => [newLetter, ...prev]);
    setPendingLetter(true);
    setView('home');

    // Simulate "Night Passing" - usually this would happen on a server or next visit
    // For the MVP demo, we'll process it after a short delay to show the feature.
    
    try {
      const aiResponse = await generateSellyReply({
        userName: user.name,
        letterContent: content,
        emotion,
        intensity,
        contexts,
        status
      });

      const newReply: Reply = {
        id: generateId(),
        letterId: newLetter.id,
        date: new Date().toISOString(),
        content: aiResponse.reply,
        summary: aiResponse.summary,
        giftSeed: aiResponse.plantType as PlantType,
        advice: aiResponse.advice
      };

      // Add a slight delay to simulate "thinking" or time passing
      setTimeout(() => {
        saveReply(newReply);
        setReplies(prev => [newReply, ...prev]);
        setPendingLetter(false); // Reply arrived
        setIsProcessing(false);
      }, 3000); // 3 seconds delay

    } catch (e) {
      console.error("Failed to generate reply", e);
      setIsProcessing(false);
      setPendingLetter(false);
    }
  };

  const handleReadReply = () => {
    // Find the unread reply (simplified logic: get the latest one if unread concept is loose)
    // For MVP, just show the latest reply that corresponds to the latest letter
    if (replies.length > 0) {
      setShowReply(replies[0]);
    }
  };

  const handleCloseReply = () => {
    if (showReply) {
      // Plant the seed
      const newPlant: Plant = {
        id: generateId(),
        type: showReply.giftSeed,
        plantedDate: new Date().toISOString(),
        growthStage: 'seed',
        sourceLetterId: showReply.letterId
      };
      
      // We append to local storage via savePlant, but also need to update state correctly
      savePlant(newPlant);
      setPlants(prev => [newPlant, ...prev]);
      
      setShowReply(null);
      setView('garden');
    }
  };

  // Determine unread status
  // Logic: If there are more replies than plants, we have an unplanted seed/unread reply
  const hasUnread = replies.length > plants.length;

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 mx-auto max-w-md relative shadow-2xl overflow-hidden flex flex-col">
      {/* View Router */}
      <div className="flex-1 overflow-hidden relative">
        {view === 'home' && (
          <Home 
            user={user} 
            lastReply={replies[0]} 
            unreadCount={hasUnread ? 1 : 0}
            onReadReply={handleReadReply}
            onWrite={() => setView('write')}
            pendingLetter={pendingLetter || isProcessing}
          />
        )}
        {view === 'write' && (
          <LetterWriter 
            onSend={handleSendLetter} 
            onCancel={() => setView('home')} 
          />
        )}
        {view === 'garden' && <MindGarden plants={plants} />}
        {view === 'analytics' && <Analytics letters={letters} />}
      </div>

      {/* Overlay for Reply */}
      {showReply && (
        <ReplyView reply={showReply} onClose={handleCloseReply} />
      )}

      {/* Navigation - hidden on write view or if reading reply */}
      {view !== 'write' && !showReply && (
        <Navigation 
          currentView={view} 
          setView={setView} 
          hasUnreadReply={hasUnread} 
        />
      )}

      {/* Loading Overlay */}
      {isProcessing && view === 'home' && (
        <div className="absolute top-4 right-4 animate-pulse">
           <span className="text-xs text-slate-400 font-medium">셀리가 듣고 있어요...</span>
        </div>
      )}
    </div>
  );
};

export default App;