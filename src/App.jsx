/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Search, Trophy, ArrowLeft, Maximize2, Star, Share2, LayoutGrid } from 'lucide-react';
import gamesData from './data/games.json';

// Components
const Navbar = () => (
  <nav className="border-b border-black/5 dark:border-white/5 px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
    <Link to="/" className="flex items-center gap-3 group">
      <motion.div 
        whileHover={{ rotate: 180 }}
        className="bg-black dark:bg-[#00FF00] p-2 rounded-lg"
      >
        <Gamepad2 className="w-5 h-5 text-white dark:text-black" />
      </motion.div>
      <span className="font-display text-2xl font-black uppercase tracking-tight italic">MEX CRAFT</span>
    </Link>
    
    <div className="flex items-center gap-6">
      <Link to="/" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-[#00FF00] transition-colors">
        LIBRARY
      </Link>
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-black/40">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input 
          type="text" 
          placeholder="DISCOVER GAMES..." 
          className="bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/10 dark:focus:border-[#00FF00]/30 rounded-full py-2 pl-9 pr-4 text-[10px] font-mono outline-none w-48 md:w-64 transition-all focus:ring-4 focus:ring-[#00FF00]/10"
        />
      </div>
    </div>
  </nav>
);

const GameCard = ({ game, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
  >
    <Link 
      to={`/play/${game.id}`}
      className="group block relative rounded-2xl overflow-hidden bg-white dark:bg-[#0f0f0f] border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-[#00FF00]/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase font-bold px-2 py-1 rounded-md tracking-wider">
            {game.category}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-[10px] text-white/70 font-mono line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-display text-xl font-bold uppercase tracking-tight group-hover:text-[#00FF00] transition-colors">
          {game.title}
        </h3>
      </div>
    </Link>
  </motion.div>
);

const HomePage = () => {
  const [games] = useState(gamesData);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-12 bg-[#00FF00]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#00FF00]">MEX CRAFT // EST 2026</span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] italic mb-6">
          PRIME <br />
          <span className="text-transparent border-text-stroke">GAMING</span>
        </h1>
        <p className="max-w-xl text-black/50 dark:text-white/50 text-sm leading-relaxed font-medium">
          A high-performance portal for the most refined web games. Zero latency, 
          unlocked access, and a seamless interface designed for the modern desktop enthusiast.
        </p>
      </motion.header>

      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 border-2 border-dashed border-black/5 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center text-center gap-4"
        >
          <div className="bg-black/5 dark:bg-white/5 p-6 rounded-full">
            <LayoutGrid className="w-8 h-8 text-black/20 dark:text-white/20" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-2xl font-black uppercase tracking-tight">Library Offline</h3>
            <p className="text-sm font-mono text-black/40 dark:text-white/40 uppercase tracking-widest">Awaiting intake instructions...</p>
          </div>
        </motion.div>
      )}
      
      <footer className="mt-32 pb-12 border-t border-black/5 dark:border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] text-black/30 dark:text-white/30 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
          <span>MEX CRAFT CORE VERSION 1.0.4</span>
        </div>
        <div className="flex gap-12">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">System Status</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Source Code</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

const GamePlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = gamesData.find(g => g.id === id);

  if (!game) return <div>Game not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-73px)] flex flex-col bg-[#050505]"
    >
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase font-mono text-[10px] tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            EXIT_GAME
          </button>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">NOW_PLAYING</span>
            <h2 className="text-[#00FF00] text-sm font-black uppercase tracking-tight italic leading-tight">{game.title}</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <button className="text-white/30 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest">
              <Share2 className="w-3.5 h-3.5" />
              SHARE
            </button>
            <button className="text-white/30 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest">
              <Star className="w-3.5 h-3.5" />
              SAVE
            </button>
          </div>
          <button className="bg-[#00FF00] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Maximize2 className="w-3 h-3" />
            FULLSCREEN
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full max-w-[1400px] mx-auto shadow-2xl shadow-[#00FF00]/5"
        >
          <iframe 
            src={game.iframeUrl} 
            className="w-full h-full border-none rounded-sm"
            title={game.title}
            allowFullScreen
          />
        </motion.div>
        
        <div className="absolute bottom-6 left-6 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-xl px-5 py-3 border border-white/5 rounded-2xl flex items-center gap-4">
            <div className="flex flex-col">
              <p className="text-[8px] font-mono text-white/40 uppercase tracking-[0.3em]">Status</p>
              <p className="text-[10px] text-[#00FF00] font-black uppercase tracking-widest">ENCRYPTED_STREAM</p>
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <p className="text-[8px] font-mono text-white/40 uppercase tracking-[0.3em]">Latency</p>
              <p className="text-[10px] text-white font-black uppercase tracking-widest">0.02MS</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white font-sans selection:bg-[#00FF00] selection:text-black">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play/:id" element={<GamePlayerPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
