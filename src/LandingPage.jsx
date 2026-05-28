import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Tree = ({ className }) => (
  <svg viewBox="0 0 100 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="42" y="80" width="16" height="40" fill="#8B4513" rx="4" />
    <circle cx="50" cy="40" r="35" fill="#22c55e" />
    <circle cx="30" cy="60" r="25" fill="#16a34a" />
    <circle cx="70" cy="60" r="25" fill="#15803d" />
  </svg>
);

const SmallPlant = ({ className }) => (
  <svg viewBox="0 0 50 50" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M25 50 L25 20" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
    <path d="M25 35 Q15 35 15 25 Q25 25 25 35" fill="#22c55e" />
    <path d="M25 30 Q35 30 35 20 Q25 20 25 30" fill="#4ade80" />
    <path d="M25 25 Q18 15 25 10 Q32 15 25 25" fill="#16a34a" />
  </svg>
);

const Cloud = ({ className }) => (
  <svg viewBox="0 0 100 50" className={className} xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
    <circle cx="30" cy="25" r="15" fill="white" />
    <circle cx="50" cy="20" r="20" fill="white" />
    <circle cx="70" cy="25" r="15" fill="white" />
    <rect x="30" y="20" width="40" height="20" fill="white" />
  </svg>
);

const Sun = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="25" fill="#facc15" />
    <circle cx="50" cy="50" r="35" fill="#facc15" opacity="0.3" />
    <circle cx="50" cy="50" r="45" fill="#facc15" opacity="0.1" />
  </svg>
);

const CharacterPlanting = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Ground patch */}
    <ellipse cx="140" cy="180" rx="30" ry="8" fill="#78350f" opacity="0.5" />
    
    {/* Plant */}
    <path d="M140 180 L140 140" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M140 160 Q120 160 125 145 Q140 150 140 160" fill="#22c55e" />
    <path d="M140 150 Q160 150 155 135 Q140 140 140 150" fill="#4ade80" />
    <path d="M140 140 Q130 120 140 110 Q150 120 140 140" fill="#15803d" />
    
    {/* Character Body */}
    <rect x="50" y="80" width="40" height="60" rx="15" fill="#3b82f6" />
    {/* Overalls */}
    <path d="M50 110 L90 110 L90 140 Q90 145 85 145 L55 145 Q50 145 50 140 Z" fill="#1e40af" />
    
    {/* Head */}
    <circle cx="70" cy="55" r="25" fill="#fcd34d" />
    {/* Face */}
    <circle cx="62" cy="50" r="3" fill="#334155" />
    <circle cx="76" cy="50" r="3" fill="#334155" />
    <ellipse cx="69" cy="56" rx="2" ry="3" fill="#b45309" opacity="0.6" />
    <path d="M60 62 Q69 68 78 62" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Hat */}
    <path d="M30 40 Q70 0 110 40 Q70 50 30 40 Z" fill="#eab308" />
    
    {/* Arms bending towards plant */}
    <path d="M80 95 Q110 110 125 130" stroke="#fcd34d" strokeWidth="12" fill="none" strokeLinecap="round" />
    <path d="M60 95 Q80 120 115 135" stroke="#fcd34d" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.8" />

    {/* Watering can */}
    <rect x="100" y="115" width="20" height="25" rx="4" fill="#94a3b8" />
    <path d="M120 130 L135 120" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
    <circle cx="138" cy="118" r="4" fill="#cbd5e1" />
    {/* Water drops */}
    <circle cx="140" cy="125" r="1.5" fill="#38bdf8" />
    <circle cx="145" cy="128" r="1.5" fill="#38bdf8" />
    <circle cx="142" cy="132" r="1.5" fill="#38bdf8" />
    
    {/* Legs */}
    <rect x="55" y="140" width="12" height="35" rx="6" fill="#1e40af" />
    <rect x="73" y="140" width="12" height="35" rx="6" fill="#1e40af" />
    {/* Shoes */}
    <ellipse cx="55" cy="175" rx="10" ry="6" fill="#475569" />
    <ellipse cx="78" cy="175" rx="10" ry="6" fill="#475569" />
  </svg>
);

const Lake = ({ className }) => (
  <svg viewBox="0 0 200 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="50" rx="90" ry="35" fill="#38bdf8" />
    <ellipse cx="100" cy="50" rx="80" ry="25" fill="#0ea5e9" opacity="0.6" />
    <path d="M40 45 Q70 35 100 45 T160 45" stroke="#bae6fd" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
    <path d="M50 55 Q80 45 110 55 T150 55" stroke="#bae6fd" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const CharacterSitting = ({ className }) => (
  <svg viewBox="0 0 150 150" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <rect x="60" y="70" width="30" height="40" rx="10" fill="#f87171" />
    {/* Head */}
    <circle cx="75" cy="50" r="22" fill="#fcd34d" />
    {/* Face */}
    <circle cx="68" cy="46" r="2.5" fill="#334155" />
    <circle cx="82" cy="46" r="2.5" fill="#334155" />
    <ellipse cx="75" cy="52" rx="1.5" ry="2.5" fill="#b45309" opacity="0.6" />
    <path d="M68 57 Q75 62 82 57" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Hair/Hat */}
    <path d="M50 45 Q75 10 100 45 Z" fill="#b45309" />
    
    {/* Legs sitting forward */}
    <path d="M80 100 L110 100 L110 120" stroke="#0284c7" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M70 100 L100 100 L100 120" stroke="#0284c7" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    
    {/* Arms holding something */}
    <path d="M65 80 L90 95" stroke="#fcd34d" strokeWidth="10" fill="none" strokeLinecap="round" />
    
    {/* Book */}
    <rect x="85" y="85" width="20" height="15" rx="2" fill="#f8fafc" transform="rotate(15 85 85)" />
    <rect x="88" y="88" width="14" height="2" fill="#94a3b8" transform="rotate(15 85 85)" />
    <rect x="88" y="94" width="14" height="2" fill="#94a3b8" transform="rotate(15 85 85)" />
  </svg>
);

const CharacterWaving = ({ className }) => (
  <svg viewBox="0 0 150 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <rect x="55" y="80" width="40" height="50" rx="12" fill="#a78bfa" />
    
    {/* Head */}
    <circle cx="75" cy="55" r="25" fill="#fcd34d" />
    {/* Face */}
    <circle cx="67" cy="50" r="3" fill="#334155" />
    <circle cx="83" cy="50" r="3" fill="#334155" />
    <ellipse cx="75" cy="57" rx="2" ry="3" fill="#b45309" opacity="0.6" />
    <path d="M66 64 Q75 70 84 64" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Hair */}
    <path d="M45 55 Q75 10 105 55 Q75 30 45 55 Z" fill="#1e293b" />
    
    {/* Legs */}
    <rect x="60" y="120" width="12" height="40" rx="6" fill="#0f172a" />
    <rect x="78" y="120" width="12" height="40" rx="6" fill="#0f172a" />
    {/* Shoes */}
    <ellipse cx="60" cy="160" rx="10" ry="6" fill="#ef4444" />
    <ellipse cx="83" cy="160" rx="10" ry="6" fill="#ef4444" />
    
    {/* Arm Waving */}
    <path d="M90 90 Q120 70 115 40" stroke="#fcd34d" strokeWidth="12" fill="none" strokeLinecap="round" />
    {/* Other Arm */}
    <path d="M60 90 Q40 110 50 130" stroke="#fcd34d" strokeWidth="12" fill="none" strokeLinecap="round" />
  </svg>
);

export default function LandingPage({ onStart }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-[#7dd3fc] to-[#3b82f6] overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        
        {/* Sun */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[10%] w-24 h-24 md:w-40 md:h-40"
        >
          <Sun className="w-full h-full" />
        </motion.div>

        {/* Clouds */}
        <motion.div 
          animate={{ x: ['-20vw', '120vw'] }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] w-32 h-16 md:w-48 md:h-24 opacity-80"
        >
          <Cloud className="w-full h-full" />
        </motion.div>
        <motion.div 
          animate={{ x: ['-20vw', '120vw'] }} 
          transition={{ duration: 80, repeat: Infinity, ease: "linear", delay: 15 }}
          className="absolute top-[25%] w-24 h-12 md:w-32 md:h-16 opacity-60"
        >
          <Cloud className="w-full h-full" />
        </motion.div>

        {/* The Hills */}
        <div className="absolute bottom-0 left-0 w-[150%] h-[40%] -ml-[25%] bg-gradient-to-t from-green-500 to-[#4ade80] rounded-t-[100%]" />
        <div className="absolute bottom-0 left-0 w-[120%] h-[30%] -ml-[10%] bg-gradient-to-t from-green-600 to-[#22c55e] rounded-t-[100%] opacity-50" />

        {/* Trees */}
        <Tree className="absolute bottom-[25%] left-[5%] w-20 h-28 md:w-28 md:h-36 opacity-90" />
        <Tree className="absolute bottom-[35%] left-[80%] w-16 h-24 md:w-20 md:h-28 opacity-70" />
        <Tree className="absolute bottom-[15%] right-[5%] w-28 h-36 md:w-40 md:h-48" />

        {/* Lake */}
        <Lake className="absolute bottom-[2%] md:bottom-[4%] left-[50%] -ml-[200px] md:-ml-[350px] w-[400px] h-40 md:w-[700px] md:h-60 opacity-90 z-0" />

        {/* Small Plants near the lake edge */}
        <SmallPlant className="absolute bottom-[22%] md:bottom-[28%] left-[18%] md:left-[22%] w-8 h-8 md:w-12 md:h-12 z-10" />
        <SmallPlant className="absolute bottom-[20%] md:bottom-[26%] right-[18%] md:right-[22%] w-10 h-10 md:w-14 md:h-14 z-10" />

        {/* Character 1 (Left of lake, waving) */}
        <motion.div 
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[8%] left-[10%] md:left-[15%] w-24 h-32 md:w-32 md:h-40 drop-shadow-md z-10"
        >
          <CharacterWaving className="w-full h-full" />
        </motion.div>

        {/* Character 2 (Left edge of lake, sitting) */}
        <motion.div 
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[5%] left-[25%] md:left-[35%] w-20 h-20 md:w-28 md:h-28 drop-shadow-md z-10"
        >
          <CharacterSitting className="w-full h-full" />
        </motion.div>

        {/* Character Planting (Right edge of lake) */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[15%] md:right-[20%] w-32 h-32 md:w-48 md:h-48 drop-shadow-lg z-10"
        >
          <CharacterPlanting className="w-full h-full" />
        </motion.div>
      </div>

      <div className="z-10 flex flex-col items-center px-4 mt-[-10vh]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center"
        >
          <h1 
            className="text-6xl md:text-8xl tracking-widest mb-4 uppercase drop-shadow-xl"
            style={{ 
              fontFamily: '"Kent", sans-serif',
              color: "#315588",
              WebkitTextStroke: "6px white",
              paintOrder: "stroke fill"
            }} >
            Eco Talk
          </h1>
          <p className="text-sm md:text-base font-bold text-[#315588] tracking-widest bg-white/70 px-6 py-2 rounded-full shadow-sm backdrop-blur-sm">
            MENCARI SEBAB AKIBAT DENGAN ALAM
          </p>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-12 p-5 rounded-full bg-[#315588] text-white shadow-[0_10px_25px_rgba(49,85,136,0.5)] hover:bg-[#233f66] hover:shadow-[0_15px_30px_rgba(49,85,136,0.6)] transition-all flex items-center justify-center animate-bounce"
        >
          <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
        </motion.button>
      </div>
    </motion.div>
  );
}
