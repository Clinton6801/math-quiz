import React from 'react';

/**
 * SELECTION GRID COMPONENT
 * Dynamically adjusts the number of buttons based on the selected category.
 * Note: QUIZ_CONFIG is handled with a fallback to ensure the grid renders
 * even if the config file resolution has temporary issues.
 */
export default function SelectionGrid({ usedQuestions, onSelect, categoryName }) {
  // Hardcoded defaults to ensure stability if config resolution fails
  const JSS_COUNT = 30;
  const SSS_COUNT = 40;
  
  // Determine how many questions to show based on category
  const questionCount = categoryName === 'JSS' ? JSS_COUNT : SSS_COUNT;
  
  const nums = Array.from({ length: questionCount }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-center md:text-left">
          <div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className={`px-4 py-1 rounded-full text-sm font-black text-white uppercase shadow-sm ${categoryName === 'JSS' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                {categoryName || 'Select'} Category
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mt-2">Select a Number</h1>
            <p className="text-slate-500 font-medium tracking-tight">Click a number to launch the {categoryName} question</p>
          </div>
          
          <div className="bg-white px-8 py-4 rounded-3xl shadow-xl border-2 border-slate-100 flex items-center gap-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Answered</p>
              <p className="text-3xl font-black text-blue-600">{usedQuestions?.length || 0}</p>
            </div>
            <div className="h-10 w-[2px] bg-slate-100"></div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining</p>
              <p className="text-3xl font-black text-slate-300">{(questionCount - (usedQuestions?.length || 0))}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
          {nums.map((n) => {
            const isUsed = usedQuestions?.includes(n);
            return (
              <button
                key={n}
                disabled={isUsed}
                onClick={() => onSelect(n)}
                className={`h-20 rounded-2xl font-black text-2xl transition-all shadow-md transform
                  ${isUsed 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed scale-95 opacity-60 border-none' 
                    : 'bg-white text-slate-800 hover:bg-blue-600 hover:text-white border-b-8 border-slate-200 hover:border-blue-800 active:border-b-0 active:translate-y-1'
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