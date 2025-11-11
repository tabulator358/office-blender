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
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Blender Drink Service
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Revoluční způsob, jak si objednat zdravé a chutné drinky přímo do vaší kanceláře
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>100% přírodní ingredience</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Rychlé doručení</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Přesný čas doručení</span>
            </div>
          </div>
        </div>

        {/* Marketing Text */}
        <div className="glass rounded-2xl p-8 mb-12 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Proč si vybrat naše drinky?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-neon-cyan mb-2">Zdraví na prvním místě</h3>
              <p>
                Naše smoothie jsou plná vitamínů, proteinů a přírodních antioxidantů. 
                Perfektní pro podporu vašeho zdraví a energie během pracovního dne.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neon-purple mb-2">Kvalitní kancelářský servis</h3>
              <p>
                Spolehlivý a profesionální servis přímo do vaší kanceláře. 
                Ušetřete čas a užijte si prémiové drinky bez opuštění pracoviště.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neon-pink mb-2">Čerstvé ingredience</h3>
              <p>
                Používáme pouze ty nejčerstvější ovoce, zeleninu a prémiové proteiny. 
                Každý drink je připraven na objednávku podle vašich preferencí.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neon-blue mb-2">Energie na celý den</h3>
              <p>
                Naše bulletproof káva a proteinové smoothie vám dodají potřebnou energii 
                pro produktivní pracovní den bez zbytečného cukru.
              </p>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Vytvořte objednávku</h2>

          {/* Drink Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-white mb-4">
              Vyberte drink:
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
            <label className="block text-lg font-semibold text-white mb-4">
              Čas doručení:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DELIVERY_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`
                    py-3 px-4 rounded-lg font-medium transition-all duration-300
                    ${selectedTime === time
                      ? 'bg-neon-cyan text-dark-bg border-2 border-neon-cyan shadow-lg shadow-neon-cyan/50'
                      : 'glass border border-white/10 text-white hover:border-neon-purple/50 hover:bg-white/5'
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
            <label className="block text-lg font-semibold text-white mb-4">
              Vaše jméno:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Zadejte vaše jméno"
              className="w-full px-4 py-3 rounded-lg glass border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan rounded-lg text-white font-bold text-lg hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Vytváření objednávky...' : 'Vytvořit objednávku'}
          </button>
        </form>

        {/* Link to Waiter Page */}
        <div className="mt-8 text-center">
          <a
            href="/waiter"
            className="text-neon-cyan hover:text-neon-purple transition-colors duration-300"
          >
            Jste obsluha? Klikněte zde →
          </a>
        </div>
      </div>
    </main>
  );
}

