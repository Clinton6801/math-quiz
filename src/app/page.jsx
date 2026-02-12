"use client";
import React, { useState } from 'react';
import Landing from '../components/Landing';
import SelectionGrid from '../components/SelectionGrid';
import QuizView from '../components/QuizView';

/**
 * MATHOPEDIA MAIN CONTROLLER
 * This file manages the overall state and navigation between the
 * Landing screen, the Question Selection Grid, and the Active Quiz view.
 */
export default function MathopediaPage() {
  const [view, setView] = useState('landing');
  const [selectedId, setSelectedId] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [category, setCategory] = useState(null); // 'JSS' or 'SSS'

  // Transition to the Grid
  const handleStart = () => setView('grid');

  // Handle number selection from the Grid
  const handleSelect = (id) => {
    setSelectedId(id);
    setView('quiz');
  };

  // Logic for completing a question (saving state)
  const handleComplete = () => {
    if (!usedQuestions.includes(selectedId)) {
      setUsedQuestions(prev => [...prev, selectedId]);
    }
    setView('grid');
    setSelectedId(null);
  };

  // Back to grid without marking as complete
  const handleBack = () => {
    setView('grid');
    setSelectedId(null);
  };

  return (
    <main className="min-h-screen bg-white">
      {view === 'landing' && <Landing onStart={handleStart} />}
      {view === 'grid' && (
        <SelectionGrid 
          usedQuestions={usedQuestions} 
          onSelect={handleSelect} 
        />
      )}
      {view === 'quiz' && (
        <QuizView 
          id={selectedId} 
          onComplete={handleComplete} 
          onBack={handleBack}
        />
      )}
    </main>
  );
}