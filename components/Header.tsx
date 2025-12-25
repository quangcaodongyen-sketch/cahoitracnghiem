
import React from 'react';

interface HeaderProps {
  onOpenSettings: () => void;
  hasKey: boolean;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings, hasKey }) => {
  return (
    <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between mb-8 px-4 py-4 bg-white/50 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm">
      <div className="flex items-center space-x-3 mb-4 sm:mb-0">
        <div className="bg-indigo-600 text-white p-2 rounded-xl text-xl font-bold">G6</div>
        <div>
          <h1 className="text-xl font-black text-indigo-900 leading-none">English 6 Master</h1>
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-1">Quiz with AI Tutor</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <button
          onClick={onOpenSettings}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            hasKey 
            ? 'bg-white border-2 border-gray-100 text-gray-700 hover:bg-gray-50' 
            : 'bg-red-50 border-2 border-red-100 text-red-600 hover:bg-red-100 animate-pulse'
          }`}
        >
          <span>⚙️ Settings (API Key)</span>
        </button>
        {!hasKey && (
          <span className="text-[11px] font-bold text-red-500 mt-1 uppercase tracking-tighter">
            Lấy API key để sử dụng app
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
