'use client';

import { useState } from 'react';
import DrinkCard from '@/components/DrinkCard';
import { Drink, DRINKS, DELIVERY_TIMES } from '@/lib/types';

export default function Home() {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedDrink) {
      setError('Prosím vyberte drink');
      return;
    }

    if (!selectedTime) {
      setError('Prosím vyberte čas doručení');
      return;
    }

    if (!name.trim()) {
      setError('Prosím zadejte jméno');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drink: selectedDrink,
          name: name.trim(),
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Nepodařilo se vytvořit objednávku');
      }

      // Reset form
      setSelectedDrink(null);
      setSelectedTime('');
      setName('');
      
      // Show success message (you could add a toast notification here)
      alert('Objednávka byla úspěšně vytvořena!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nepodařilo se vytvořit objednávku');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="text-6xl animate-float" style={{ animationDelay: '0s' }}>🥤</span>
            <span className="text-6xl animate-float" style={{ animationDelay: '0.5s' }}>🍌</span>
            <span className="text-6xl animate-float" style={{ animationDelay: '1s' }}>☕</span>
            <span className="text-6xl animate-float" style={{ animationDelay: '1.5s' }}>🍓</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-food-orange via-food-yellow to-food-green bg-clip-text text-transparent">
              Office Blender
            </span>
            <span className="ml-4 text-4xl animate-wiggle inline-block">🍹</span>
          </h1>
          <p className="text-2xl text-warm-text font-semibold mb-6">
            Čerstvé a chutné drinky přímo do vaší kanceláře! 🎉
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-base font-medium">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md">
              <span className="text-2xl">🌱</span>
              <span className="text-warm-text">100% přírodní</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md">
              <span className="text-2xl">⚡</span>
              <span className="text-warm-text">Rychlé doručení</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md">
              <span className="text-2xl">⏰</span>
              <span className="text-warm-text">Přesný čas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md">
              <span className="text-2xl">💪</span>
              <span className="text-warm-text">Plné energie</span>
            </div>
          </div>
        </div>

        {/* Marketing Text */}
        <div className="glass rounded-3xl p-8 mb-12 border-2 border-food-orange/30 shadow-xl">
          <h2 className="text-4xl font-bold text-warm-text mb-6 text-center flex items-center justify-center gap-3">
            <span>🤔</span>
            <span>Proč si vybrat naše drinky?</span>
            <span>🤔</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-warm-text">
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-food-yellow/30 hover:border-food-yellow transition-all">
              <h3 className="text-xl font-bold text-food-orange mb-3 flex items-center gap-2">
                <span>🌿</span>
                <span>Zdraví na prvním místě</span>
              </h3>
              <p className="text-warm-textLight">
                Naše smoothie jsou plná vitamínů, proteinů a přírodních antioxidantů. 
                Perfektní pro podporu vašeho zdraví a energie během pracovního dne! 💚
              </p>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-food-green/30 hover:border-food-green transition-all">
              <h3 className="text-xl font-bold text-food-green mb-3 flex items-center gap-2">
                <span>🚀</span>
                <span>Kvalitní kancelářský servis</span>
              </h3>
              <p className="text-warm-textLight">
                Spolehlivý a profesionální servis přímo do vaší kanceláře. 
                Ušetřete čas a užijte si prémiové drinky bez opuštění pracoviště! 📦
              </p>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-food-pink/30 hover:border-food-pink transition-all">
              <h3 className="text-xl font-bold text-food-pink mb-3 flex items-center gap-2">
                <span>🍓</span>
                <span>Čerstvé ingredience</span>
              </h3>
              <p className="text-warm-textLight">
                Používáme pouze ty nejčerstvější ovoce, zeleninu a prémiové proteiny. 
                Každý drink je připraven na objednávku podle vašich preferencí! 🥬
              </p>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-food-berry/30 hover:border-food-berry transition-all">
              <h3 className="text-xl font-bold text-food-berry mb-3 flex items-center gap-2">
                <span>⚡</span>
                <span>Energie na celý den</span>
              </h3>
              <p className="text-warm-textLight">
                Naše bulletproof káva a proteinové smoothie vám dodají potřebnou energii 
                pro produktivní pracovní den bez zbytečného cukru! 🔋
              </p>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 border-2 border-food-orange/40 shadow-2xl">
          <h2 className="text-4xl font-bold text-warm-text mb-8 text-center flex items-center justify-center gap-3">
            <span>📝</span>
            <span>Vytvořte objednávku</span>
            <span>🎯</span>
          </h2>

          {/* Drink Selection */}
          <div className="mb-8">
            <label className="block text-xl font-bold text-warm-text mb-4 flex items-center gap-2">
              <span>🥤</span>
              <span>Vyberte drink:</span>
            </label>
            <div className="grid gap-4">
              {DRINKS.map((drink) => (
                <DrinkCard
                  key={drink}
                  drink={drink}
                  isSelected={selectedDrink === drink}
                  onSelect={setSelectedDrink}
                />
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <label className="block text-xl font-bold text-warm-text mb-4 flex items-center gap-2">
              <span>⏰</span>
              <span>Čas doručení:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DELIVERY_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`
                    py-4 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105
                    ${selectedTime === time
                      ? 'bg-food-orange text-white border-4 border-food-orange shadow-xl shadow-food-orange/50 scale-105'
                      : 'bg-white border-2 border-food-orange/30 text-warm-text hover:border-food-orange hover:bg-food-orange/10 hover:shadow-md'
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-8">
            <label className="block text-xl font-bold text-warm-text mb-4 flex items-center gap-2">
              <span>👤</span>
              <span>Vaše jméno:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Zadejte vaše jméno"
              className="w-full px-5 py-4 rounded-xl bg-white border-2 border-food-orange/30 text-warm-text placeholder-warm-textLight focus:outline-none focus:border-food-orange focus:ring-4 focus:ring-food-orange/20 transition-all duration-300 text-lg font-medium shadow-md"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-xl text-red-700 font-semibold flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 px-6 food-gradient rounded-xl text-white font-extrabold text-xl hover:shadow-2xl hover:shadow-food-orange/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin-slow">⏳</span>
                <span>Vytváření objednávky...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Vytvořit objednávku</span>
                <span>🎉</span>
              </>
            )}
          </button>
        </form>

        {/* Link to Waiter Page */}
        <div className="mt-8 text-center">
          <a
            href="/waiter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 rounded-full text-warm-text font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-food-orange/30 hover:border-food-orange"
          >
            <span>👨‍💼</span>
            <span>Jste obsluha? Klikněte zde</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </main>
  );
}

