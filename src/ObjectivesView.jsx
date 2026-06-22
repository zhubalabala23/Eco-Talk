import React from 'react';
import { motion } from 'framer-motion';
import { Search, Link as LinkIcon, Edit3, Mic, ChevronLeft } from 'lucide-react';
import bgObjectives from './assets/background_tujuan/background_tujuan_pembelajaran.webp';

// Characters
import char1 from './assets/background_tujuan/karakter_pria.webp';
import char2 from './assets/background_tujuan/karakter_wanita.webp';
import char3 from './assets/background_tujuan/karakter_pria1.webp';
import char4 from './assets/background_tujuan/karakter_wanita2.webp';

const Cloud = ({ className }) => (
  <svg viewBox="0 0 100 50" className={className} xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
    <circle cx="30" cy="25" r="15" fill="white" />
    <circle cx="50" cy="20" r="20" fill="white" />
    <circle cx="70" cy="25" r="15" fill="white" />
    <rect x="30" y="20" width="40" height="20" fill="white" />
  </svg>
);

const objectives = [
  {
    id: 1,
    color: 'bg-[#388e3c]', 
    borderColor: 'border-[#81c784]', 
    icon: Search,
    character: char1,
  },
  {
    id: 2,
    color: 'bg-[#1976d2]',
    borderColor: 'border-[#64b5f6]',
    icon: LinkIcon,
    character: char2,
  },
  {
    id: 3,
    color: 'bg-[#f57c00]',
    borderColor: 'border-[#ffb74d]',
    icon: Edit3,
    character: char3,
    badges: [
      { text: "karena", color: "bg-[#4caf50]", align: "self-end", tail: "rounded-br-sm" },
      { text: "sehingga", color: "bg-[#2196f3]", align: "self-end mr-6", tail: "rounded-bl-sm" },
      { text: "akibatnya", color: "bg-[#ff9800]", align: "self-end", tail: "rounded-br-sm" }
    ]
  },
  {
    id: 4,
    color: 'bg-[#7b1fa2]',
    borderColor: 'border-[#ba68c8]',
    icon: Mic,
    character: char4,
  }
];

export default function ObjectivesView({ onNext, onBack }) {
  const renderText = (id) => {
    switch (id) {
      case 1:
        return <>Menemukan <br/><span className="text-[#2e7d32] font-bold">penyebab dan akibat</span><br/> suatu peristiwa.</>;
      case 2:
        return <>Menjelaskan hubungan <br/><span className="text-[#1565c0] font-bold">sebab dan akibat</span><br/> dengan urut dan jelas.</>;
      case 3:
        return <>Menggunakan <br/><span className="text-[#e65100] font-bold">kata penghubung<br/>sebab-akibat</span><br/> dengan tepat.</>;
      case 4:
        return <>Menyampaikan <br/><span className="text-[#6a1b9a] font-bold">pendapat atau<br/>penjelasan secara lisan</span><br/> dengan percaya diri.</>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background */}
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-[length:100%_100%]"
        style={{ backgroundImage: `url(${bgObjectives})`, zIndex: 0 }}
      />

      {/* Animated Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
        <motion.div 
          animate={{ x: ['25vw', '45vw', '25vw'] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[2%] md:top-[4%] w-32 h-16 md:w-48 md:h-24 opacity-80"
        >
          <Cloud className="w-full h-full" />
        </motion.div>
        <motion.div 
          animate={{ x: ['65vw', '45vw', '65vw'] }} 
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[8%] md:top-[10%] w-24 h-12 md:w-36 md:h-18 opacity-60"
        >
          <Cloud className="w-full h-full" />
        </motion.div>
        <motion.div 
          animate={{ x: ['40vw', '60vw', '40vw'] }} 
          transition={{ duration: 60, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[5%] md:top-[6%] w-40 h-20 md:w-56 md:h-28 opacity-40"
        >
          <Cloud className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col justify-center min-h-full py-12">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center flex flex-col items-center mb-12 md:mb-16"
        >
          <motion.h1 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl md:text-5xl lg:text-6xl tracking-widest mb-2 uppercase"
            style={{ 
              fontFamily: '"Kent", sans-serif',
              color: "#315588",
              WebkitTextStroke: "6px #94a3b8",
              paintOrder: "stroke fill"
            }} >
            Tujuan Pembelajaran
          </motion.h1>
          <p className="text-[10px] md:text-xs font-bold text-[#315588] tracking-wider uppercase">
            MENCARI SEBAB AKIBAT DENGAN ALAM...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-6 mt-8 md:mt-0 px-4">
          {objectives.map((obj) => (
            <motion.div 
              key={obj.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: obj.id * 0.15 }}
              className={`relative rounded-[2rem] border-[6px] md:border-8 ${obj.borderColor} bg-[#fef9eb] px-4 md:px-6 pb-0 pt-12 flex flex-col items-center text-center shadow-xl h-full ring-4 ring-white/40 ring-inset`}
            >
              {/* Leaf Number Badge */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 z-30 flex items-center justify-center">
                <div className={`absolute inset-0 ${obj.color} rounded-tl-[60%] rounded-br-[60%] rounded-tr-md rounded-bl-md rotate-45 shadow-md border-2 border-white/20`} />
                <span className="relative text-white font-black text-2xl md:text-3xl z-10">{obj.id}</span>
              </div>
              
              {/* Icon Circle */}
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${obj.color} text-white flex items-center justify-center mb-4 md:mb-6 shadow-md border-[3px] border-white/50 relative z-20`}>
                <obj.icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
              </div>

              {/* Text Content */}
              <div className="text-slate-800 font-bold text-[15px] md:text-[17px] leading-snug w-full relative z-20 mb-4">
                <p>{renderText(obj.id)}</p>
              </div>

              {/* Character and Badges Container */}
              <div className="w-full mt-auto relative flex flex-col justify-end items-center">
                {/* Badges for Card 3 */}
                {obj.badges && (
                  <div className="absolute top-[10%] right-[-10px] flex flex-col gap-1.5 z-30">
                    {obj.badges.map((badge, idx) => (
                      <div 
                        key={idx} 
                        className={`${badge.color} ${badge.align} text-white px-2.5 py-0.5 rounded-full ${badge.tail} font-bold text-[10px] md:text-xs shadow-sm max-w-fit`}
                      >
                        {badge.text}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Character Image */}
                {obj.character && (
                  <motion.img 
                    animate={obj.id === 2 || obj.id === 3 ? { scale: [1, 1.05, 1] } : { scale: [0.95, 1, 0.95] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: obj.id * 0.2 }}
                    src={obj.character} 
                    alt={`Karakter ${obj.id}`}
                    className={`relative h-36 md:h-44 lg:h-48 object-contain object-bottom z-10 pointer-events-none drop-shadow-xl origin-bottom ${
                      obj.id === 2 || obj.id === 3 
                        ? "w-[110%] max-w-none -ml-[5%] -mb-4 md:-mb-6" 
                        : "w-full"
                    }`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      {onBack && (
        <motion.div 
          className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-50 flex flex-col items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-3 rounded-full bg-[#315588] hover:bg-[#233f66] text-white shadow-lg transition-colors flex items-center justify-center animate-bounce"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={3} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
