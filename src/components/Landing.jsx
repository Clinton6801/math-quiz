import React from 'react';
import { Play } from 'lucide-react';
import { QUIZ_CONFIG } from '../config/settings';

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white font-sans">
      <div className="max-w-4xl border-4 border-blue-500 p-10 rounded-3xl bg-slate-800/50 backdrop-blur-md shadow-2xl">
      
  <img 
    src="/logo.jpeg" 
    alt="School Logo" 
    className="h-16 w-auto object-contain rounded-lg shadow-lg"
    onError={(e) => {
      e.target.style.display = 'none';
    }}
  />

        <h2 className="text-blue-400 font-bold tracking-widest mb-2 uppercase text-sm md:text-base">
          {QUIZ_CONFIG.SCHOOL_NAME}
        </h2>
        <h3 className="text-lg md:text-xl font-light mb-8 text-slate-300 italic">
          {QUIZ_CONFIG.COLLABORATORS}
        </h3>
        
        <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter text-white">
          MATHOPEDIA
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-blue-200 mb-12">
          {QUIZ_CONFIG.EVENT_TITLE}
        </p>

        <button 
          onClick={onStart}
          className="flex items-center gap-3 mx-auto bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold py-5 px-14 rounded-full transition-all transform hover:scale-105 shadow-lg"
        >
          <Play fill="white" size={28} />
          CONTINUE TO QUIZ
        </button>
      </div>
    </div>
  );
}