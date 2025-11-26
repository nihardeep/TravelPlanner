import React from 'react';
import Header from '../components/Header';

export default function ComingSoon({ navigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d1b69] to-[#1a1530]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="mb-8 text-white text-sm font-semibold hover:text-purple-200 transition"
          >
            ← Back to Home
          </button>

          <div className="bg-black bg-opacity-30 rounded-2xl px-8 py-16 shadow-2xl border border-purple-500/40 max-w-2xl mx-auto">
            <h2 className="text-4xl font-semibold text-white mb-4">Coming Soon</h2>
            <p className="text-purple-200 text-lg">
              We're working hard to bring you the best travel search experience. Check back soon!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}