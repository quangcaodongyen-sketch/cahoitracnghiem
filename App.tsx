
import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import { QuizState } from './types';
import QuizCard from './components/QuizCard';
import Results from './components/Results';
import Header from './components/Header';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: [],
    isFinished: false,
    isExplanationVisible: false,
  });

  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('GEMINI_API_KEY') || '');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!localStorage.getItem('GEMINI_API_KEY'));

  const handleSelectAnswer = (selectedIdx: number) => {
    const isCorrect = selectedIdx === QUIZ_QUESTIONS[gameState.currentQuestionIndex].correctAnswer;
    
    setTimeout(() => {
      setGameState(prev => {
        const nextIndex = prev.currentQuestionIndex + 1;
        const finished = nextIndex >= QUIZ_QUESTIONS.length;
        
        return {
          ...prev,
          score: isCorrect ? prev.score + 1 : prev.score,
          userAnswers: [...prev.userAnswers, selectedIdx],
          currentQuestionIndex: finished ? prev.currentQuestionIndex : nextIndex,
          isFinished: finished
        };
      });
    }, 4500);
  };

  const restartQuiz = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: [],
      isFinished: false,
      isExplanationVisible: false,
    });
  };

  const handleSaveKey = (key: string) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    if (trimmedKey) {
      localStorage.setItem('GEMINI_API_KEY', trimmedKey);
    } else {
      localStorage.removeItem('GEMINI_API_KEY');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <Header 
        onOpenSettings={() => setIsModalOpen(true)} 
        hasKey={!!apiKey} 
      />

      <main className="w-full flex justify-center items-start flex-1">
        {!gameState.isFinished ? (
          <QuizCard
            question={QUIZ_QUESTIONS[gameState.currentQuestionIndex]}
            onSelect={handleSelectAnswer}
            currentIndex={gameState.currentQuestionIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
          />
        ) : (
          <Results 
            score={gameState.score} 
            total={QUIZ_QUESTIONS.length} 
            onRestart={restartQuiz} 
          />
        )}
      </main>

      <ApiKeyModal 
        isOpen={isModalOpen} 
        onClose={handleSaveKey} 
        currentKey={apiKey} 
      />

      <footer className="mt-12 text-gray-400 text-xs font-medium flex items-center space-x-2">
        <span className="animate-pulse">✨</span>
        <span>Powered by Gemini AI Teacher</span>
        <span className="animate-pulse">✨</span>
      </footer>
      
      <div className="fixed -bottom-10 -left-10 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="fixed -top-10 -right-10 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </div>
  );
};

export default App;
