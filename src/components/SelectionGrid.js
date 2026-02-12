import React from 'react';
import { QUIZ_CONFIG } from '../config/settings';

export default function SelectionGrid({ usedQuestions, onSelect }) {
  // Generate array [1, 2, ..., TOTAL_QUESTIONS]
  const nums = Array.from({ length: QUIZ_CONFIG?.TOTAL_QUESTIONS || 40 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-center md:text-left">
          <div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Select a Number</h1>
            <p className="text-slate-500 font-medium">Click a question number to begin the challenge</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-slate-400 mr-2">Progress:</span>
            <span className="text-2xl font-bold text-blue-600">{usedQuestions.length}</span>
            <span className="text-slate-400"> / {QUIZ_CONFIG?.TOTAL_QUESTIONS || 40}</span>
          </div>
        </header>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {nums.map((n) => {
            const isUsed = usedQuestions.includes(n);
            return (
              <button
                key={n}
                disabled={isUsed}
                onClick={() => onSelect(n)}
                className={`h-24 rounded-2xl font-black text-3xl transition-all shadow-md transform
                  ${isUsed 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed scale-95 opacity-60' 
                    : 'bg-white text-blue-700 hover:bg-blue-600 hover:text-white border-b-8 border-blue-100 active:border-b-0 hover:-translate-y-1'
                  }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}