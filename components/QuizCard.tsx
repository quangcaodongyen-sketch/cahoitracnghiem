
import React, { useState, useEffect } from 'react';
import { Question, ExplanationResponse } from '../types';
import { getDetailedExplanation } from '../services/geminiService';

interface QuizCardProps {
  question: Question;
  onSelect: (index: number) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onSelect, currentIndex, totalQuestions }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<ExplanationResponse | null>(null);

  useEffect(() => {
    setSelectedIdx(null);
    setIsAnswered(false);
    setAiExplanation(null);
  }, [question]);

  const handleOptionClick = async (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    
    // Call AI if wrong or just to explain
    setAiLoading(true);
    const explanation = await getDetailedExplanation(
      question.text,
      question.options[question.correctAnswer],
      question.options[idx]
    );
    setAiExplanation(explanation);
    setAiLoading(false);

    // Wait a bit then move to next (optional, but we'll use a manual 'Next' button or auto-timer)
    setTimeout(() => {
      onSelect(idx);
    }, 5000); // 5 seconds to read explanation
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300">
      <div className="bg-indigo-600 p-6 text-white relative">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-indigo-500 text-indigo-100 px-3 py-1 rounded-full text-sm font-bold">
            Question {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="h-2 w-32 bg-indigo-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold leading-tight">{question.text}</h2>
      </div>

      <div className="p-6 space-y-3">
        {question.options.map((option, idx) => {
          let bgColor = "bg-gray-50 hover:bg-indigo-50 border-gray-200";
          let textColor = "text-gray-700";
          
          if (isAnswered) {
            if (idx === question.correctAnswer) {
              bgColor = "bg-green-100 border-green-500";
              textColor = "text-green-800";
            } else if (idx === selectedIdx) {
              bgColor = "bg-red-100 border-red-500";
              textColor = "text-red-800";
            } else {
              bgColor = "bg-gray-50 opacity-50 border-gray-200";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionClick(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all duration-200 flex items-center justify-between group ${bgColor} ${textColor}`}
            >
              <span>{option}</span>
              {isAnswered && idx === question.correctAnswer && (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isAnswered && idx === selectedIdx && idx !== question.correctAnswer && (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="p-6 bg-indigo-50 border-t border-indigo-100">
          <div className="flex items-start space-x-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="flex-1">
              <p className="text-indigo-900 font-bold mb-1">AI Teacher Explains:</p>
              {aiLoading ? (
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="h-2 w-24 bg-indigo-200 rounded"></div>
                  <div className="h-2 w-16 bg-indigo-200 rounded"></div>
                </div>
              ) : (
                <div className="text-indigo-800 text-sm space-y-2">
                  <p>{aiExplanation?.explanation || question.explanation}</p>
                  {aiExplanation && (
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 mt-2 italic">
                      <p>Example: {aiExplanation.example}</p>
                      <p className="text-indigo-500 text-xs">({aiExplanation.translation})</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
