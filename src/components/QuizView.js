import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { QUIZ_CONFIG } from '../config/settings';

export default function QuizView({ id, onComplete, onBack }) {
  // Use a fallback value in case the config isn't loaded yet
  const defaultTime = QUIZ_CONFIG?.DEFAULT_TIME ?? 90;
  
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [showSolution, setShowSolution] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !showSolution && !isPaused) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !showSolution) {
      setShowSolution(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft, showSolution, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-6xl flex justify-between items-center mb-6 bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ChevronLeft size={32} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-blue-400">Question #{id}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold italic">Mathopedia Challenge</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 text-5xl font-mono font-black ${timeLeft < 11 && !showSolution ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          <Clock size={40} className={timeLeft < 11 && !showSolution ? 'text-red-500' : 'text-blue-500'} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="relative w-full max-w-6xl aspect-[16/9] bg-slate-50 rounded-[2.5rem] overflow-hidden border-8 border-slate-100 shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img 
            // Update the image path to include the category folder
            src={`/images/${category}/${showSolution ? 'solutions/s' : 'questions/q'}${id}.png`}
            alt={showSolution ? "Solution" : "Question"}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x450?text=Image+Not+Found+Check+Public+Folder";
            }}
          />
        </div>
        
        {showSolution && (
          <div className="absolute top-0 w-full bg-green-600 text-white text-center font-black py-4 text-3xl tracking-[0.3em] uppercase shadow-lg flex items-center justify-center gap-3">
            <CheckCircle size={32} />
            Official Solution
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center gap-6">
        {!showSolution && (
          <>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="px-8 py-4 bg-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-300 transition-all text-xl"
            >
              {isPaused ? "RESUME" : "PAUSE"}
            </button>
            <button 
              onClick={() => setTimeLeft(0)} 
              className="px-8 py-4 bg-red-100 text-red-600 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all text-xl flex items-center gap-2"
            >
              <AlertCircle size={24} />
              REVEAL SOLUTION
            </button>
          </>
        )}

        {showSolution && (
          <button 
            onClick={onComplete} 
            className="px-20 py-6 bg-blue-700 text-white rounded-3xl font-black text-3xl shadow-2xl hover:bg-blue-800 transform hover:scale-105 transition-all"
          >
            FINISH & RETURN →
          </button>
        )}
      </div>
    </div>
  );
}