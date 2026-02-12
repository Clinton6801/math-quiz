import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { QUIZ_CONFIG } from '../config/settings';

/**
 * QUIZ VIEW COMPONENT
 * Handles the question display, timer logic, and manual solution reveal.
 */
export default function QuizView({ id, category, onComplete, onBack }) {
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.DEFAULT_TIME);
  const [showSolution, setShowSolution] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let timer;
    // Timer runs only if there is time left, not paused, and solution not yet shown
    if (timeLeft > 0 && !showSolution && !isPaused) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !showSolution) {
      setIsTimeUp(true);
      setIsPaused(true); // Stop everything when time is up
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
      {/* HEADER SECTION */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6 bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ChevronLeft size={32} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-blue-400">{category} - Question #{id}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Mathopedia Competition</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 text-5xl font-mono font-black 
          ${isTimeUp && !showSolution ? 'text-red-500 animate-pulse' : 'text-white'}
          ${timeLeft < 11 && timeLeft > 0 ? 'text-orange-500' : ''}`}
        >
          <Clock size={40} className={isTimeUp ? 'text-red-500' : 'text-blue-500'} />
          {isTimeUp && !showSolution ? "TIME UP!" : formatTime(timeLeft)}
        </div>
      </div>

      {/* IMAGE DISPLAY BOX */}
      <div className="relative w-full max-w-6xl aspect-[16/9] bg-slate-50 rounded-[2.5rem] overflow-hidden border-8 border-slate-100 shadow-2xl flex items-center justify-center">
        <img 
          src={`/images/${category}/${showSolution ? 'solutions/s' : 'questions/q'}${id}.png`}
          alt={showSolution ? "Solution" : "Question"}
          className="max-w-full max-h-full object-contain p-8 transition-opacity duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x450?text=Question+Image+Not+Found";
          }}
        />
        
        {showSolution && (
          <div className="absolute top-0 w-full bg-green-600 text-white text-center font-black py-4 text-3xl tracking-[0.3em] uppercase shadow-lg flex items-center justify-center gap-3 animate-bounce-in">
            <CheckCircle size={32} />
            Official Solution
          </div>
        )}
      </div>

      {/* CONTROL BUTTONS */}
      <div className="mt-8 flex items-center gap-6">
        {!showSolution && (
          <>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all shadow-md
                ${isPaused ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
              disabled={isTimeUp}
            >
              {isPaused ? "RESUME" : "PAUSE"}
            </button>
            
            <button 
              onClick={() => setShowSolution(true)} 
              className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all text-xl flex items-center gap-3 shadow-lg transform hover:scale-105"
            >
              <Eye size={24} />
              REVEAL SOLUTION
            </button>
          </>
        )}

        {showSolution && (
          <button 
            onClick={onComplete} 
            className="px-20 py-6 bg-blue-700 text-white rounded-3xl font-black text-4xl shadow-2xl hover:bg-blue-800 transform hover:scale-105 transition-all border-b-8 border-blue-900 active:border-b-0"
          >
            FINISH QUESTION →
          </button>
        )}
      </div>
    </div>
  );
}