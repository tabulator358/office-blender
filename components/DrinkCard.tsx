'use client';

import { Drink } from '@/lib/types';

interface DrinkCardProps {
  drink: Drink;
  isSelected: boolean;
  onSelect: (drink: Drink) => void;
}

export default function DrinkCard({ drink, isSelected, onSelect }: DrinkCardProps) {
  return (
    <button
      onClick={() => onSelect(drink)}
      className={`
        relative w-full p-6 rounded-2xl text-left transition-all duration-300
        ${isSelected
          ? 'glass-strong border-2 border-neon-cyan shadow-lg shadow-neon-cyan/50 scale-105'
          : 'glass border border-white/10 hover:border-neon-purple/50 hover:scale-[1.02]'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className={`text-lg font-medium ${isSelected ? 'text-neon-cyan' : 'text-white'}`}>
          {drink}
        </span>
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-neon-cyan flex items-center justify-center">
            <svg className="w-4 h-4 text-dark-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl bg-neon-cyan/10 animate-pulse-slow pointer-events-none" />
      )}
    </button>
  );
}

