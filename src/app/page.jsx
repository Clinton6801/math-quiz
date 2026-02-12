"use client";
import React, { useState } from 'react';
import Landing from '../components/Landing';
import SelectionGrid from '../components/SelectionGrid';
import QuizView from '../components/QuizView';

/**
 * MATHOPEDIA MAIN CONTROLLER
 * Manages Category Selection (JSS vs SSS) and state across the quiz.
 */
export default function MathopediaPage() {
  const [view, setView] = useState('landing'); // 'landing', 'category', 'grid', 'quiz'
  const [category, setCategory] = useState(null); // 'JSS' or 'SSS'
  const [selectedId, setSelectedId] = useState(null);
  
  // Track used questions for both categories separately
  const [usedQuestions, setUsedQuestions] = useState({
    JSS: [],
    SSS: []
  });

  // 1. Landing -> Category Selection
  const handleStart = () => setView('category');

  // 2. Select Category (JSS/SSS) -> Grid
  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setView('grid');
  };

  // 3. Grid -> Quiz
  const handleSelectQuestion = (id) => {
    setSelectedId(id);
    setView('quiz');
  };

  // 4. Quiz -> Grid (Mark as complete)
  const handleComplete = () => {
    if (category && !usedQuestions[category].includes(selectedId)) {
      setUsedQuestions(prev => ({
        ...prev,
        [category]: [...prev[category], selectedId]
      }));
    }
    setView('grid');
    setSelectedId(null);
  };

  // Back button logic to navigate through states
  const handleBack = () => {
    if (view === 'quiz') setView('grid');
    else if (view === 'grid') setView('category');
    else if (view === 'category') setView('landing');
    setSelectedId(null);
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* VIEW: LANDING PAGE */}
      {view === 'landing' && <Landing onStart={handleStart} />}

      {/* VIEW: CATEGORY SELECTION */}
      {view === 'category' && (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white">
          <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tight text-blue-400 text-center uppercase">
            Choose Category
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
            {/* JSS BUTTON */}
            <button 
              onClick={() => handleCategorySelect('JSS')}
              className="flex-1 bg-white text-slate-900 p-12 rounded-[2.5rem] shadow-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 group border-b-8 border-slate-200 hover:border-blue-800"
            >
              <h2 className="text-6xl font-black mb-2 tracking-tighter">JSS</h2>
              <p className="text-xl font-bold opacity-60 group-hover:opacity-100 uppercase tracking-widest">
                Junior Secondary
              </p>
            </button>
            
            {/* SSS BUTTON */}
            <button 
              onClick={() => handleCategorySelect('SSS')}
              className="flex-1 bg-white text-slate-900 p-12 rounded-[2.5rem] shadow-2xl hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 group border-b-8 border-slate-200 hover:border-purple-800"
            >
              <h2 className="text-6xl font-black mb-2 tracking-tighter">SSS</h2>
              <p className="text-xl font-bold opacity-60 group-hover:opacity-100 uppercase tracking-widest">
                Senior Secondary
              </p>
            </button>
          </div>
          
          <button 
            onClick={handleBack}
            className="mt-12 text-slate-400 hover:text-white font-bold transition-colors underline underline-offset-8 decoration-2"
          >
            ← Back to Home
          </button>
        </div>
      )}

      {/* VIEW: SELECTION GRID */}
      {view === 'grid' && (
        <SelectionGrid 
          usedQuestions={usedQuestions[category]} 
          onSelect={handleSelectQuestion}
          categoryName={category}
        />
      )}

      {/* VIEW: ACTIVE QUIZ */}
      {view === 'quiz' && (
        <QuizView 
          id={selectedId} 
          category={category}
          onComplete={handleComplete} 
          onBack={handleBack}
        />
      )}
    </main>
  );
}