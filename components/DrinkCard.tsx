'use client';

import { Drink } from '@/lib/types';

interface DrinkCardProps {
  drink: Drink;
  isSelected: boolean;
  onSelect: (drink: Drink) => void;
}

const getDrinkEmoji = (drink: Drink): string => {
  if (drink.includes('banana')) {
    if (drink.includes('berries')) return '🍓';
    if (drink.includes('cocoa')) return '🍫';
    return '🍌';
  }
  if (drink.includes('coffee')) {
    if (drink.includes('goat')) return '🐐';
    return '☕';
  }
  return '🥤';
};

const getDrinkColor = (drink: Drink): string => {
  if (drink.includes('banana')) {
    if (drink.includes('berries')) return 'border-food-pink';
    if (drink.includes('cocoa')) return 'border-food-berry';
    return 'border-food-yellow';
  }
  if (drink.includes('coffee')) {
    return 'border-food-orange';
  }
  return 'border-food-green';
};

export default function DrinkCard({ drink, isSelected, onSelect }: DrinkCardProps) {
  const emoji = getDrinkEmoji(drink);
  const borderColor = getDrinkColor(drink);
  
  return (
    <button
      onClick={() => onSelect(drink)}
      className={`
        relative w-full p-6 rounded-3xl text-left transition-all duration-300
        food-card
        ${isSelected
          ? `border-4 ${borderColor} scale-105 shadow-xl`
          : 'border-2 border-gray-200 hover:border-food-orange hover:scale-[1.02]'
        }
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl animate-bounce-slow" style={{ animationDelay: '0s' }}>
            {emoji}
          </span>
          <span className={`text-lg font-semibold ${isSelected ? 'text-food-orange' : 'text-warm-text'}`}>
            {drink}
          </span>
        </div>
        {isSelected && (
          <div className="w-8 h-8 rounded-full bg-food-orange flex items-center justify-center animate-pulse">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {isSelected && (
        <div className="mt-4 pt-4 border-t-2 border-food-orange/30">
          <p className="text-sm text-warm-textLight flex items-center gap-2">
            <span>✨</span>
            <span>Výborná volba! Tento drink je plný chuti a energie!</span>
          </p>
        </div>
      )}
    </button>
  );
}

