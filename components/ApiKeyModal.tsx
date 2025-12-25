
import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: (key: string) => void;
  currentKey: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, currentKey }) => {
  const [key, setKey] = useState(currentKey);

  useEffect(() => {
    setKey(currentKey);
  }, [currentKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <span className="text-3xl">🔑</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Cấu hình API Key</h3>
              <p className="text-sm text-gray-500">Để AI có thể giải thích bài tập cho bạn</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Google Gemini API Key</label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Dán API Key của bạn vào đây..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-xl space-y-2 text-sm">
              <p className="font-semibold text-blue-800 flex items-center">
                <span className="mr-2">💡</span> Hướng dẫn:
              </p>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>
                  Lấy key miễn phí tại: <a href="https://aistudio.google.com/api-keys" target="_blank" rel="noopener noreferrer" className="font-bold underline">Google AI Studio</a>
                </li>
                <li>
                  Xem video hướng dẫn chi tiết: <a href="https://tinyurl.com/hdsdpmTHT" target="_blank" rel="noopener noreferrer" className="font-bold underline">Click để xem</a>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => onClose(key)}
            className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Lưu cấu hình
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
