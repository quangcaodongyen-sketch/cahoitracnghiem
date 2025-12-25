
import React from 'react';

interface ResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, total, onRestart }) => {
  const percentage = (score / total) * 100;
  
  let message = "Good job! Keep practicing! 💪";
  let icon = "⭐";

  if (percentage === 100) {
    message = "Perfect Score! You're a Master! 🏆";
    icon = "👑";
  } else if (percentage >= 80) {
    message = "Excellent work! Almost perfect! 🌟";
    icon = "🥇";
  } else if (percentage < 50) {
    message = "Don't give up! Let's try again. 📚";
    icon = "✏️";
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100 transform transition-all animate-bounce-short">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-3xl font-black text-gray-800 mb-2">Quiz Finished!</h2>
      <p className="text-gray-500 font-medium mb-6">{message}</p>
      
      <div className="relative h-48 w-48 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="16"
            fill="transparent"
            className="text-gray-100"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={502.6}
            strokeDashoffset={502.6 - (502.6 * percentage) / 100}
            strokeLinecap="round"
            className="text-indigo-600 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-indigo-700">{score}</span>
          <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Score / {total}</span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
