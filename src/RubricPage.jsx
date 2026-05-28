import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardCheck } from 'lucide-react';

const SimpleTree = ({ className }) => (
  <svg viewBox="0 0 100 120" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Trunk */}
    <path d="M45 120 Q45 80 40 40 L60 40 Q55 80 55 120 Z" fill="#78350f" />
    {/* Leaves */}
    <circle cx="50" cy="40" r="35" fill="#15803d" />
    <circle cx="30" cy="60" r="25" fill="#16a34a" />
    <circle cx="70" cy="60" r="25" fill="#22c55e" />
  </svg>
);

const CharacterWalking = ({ className }) => (
  <svg viewBox="0 0 150 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <rect x="55" y="80" width="40" height="50" rx="10" fill="#f43f5e" />
    {/* Head */}
    <circle cx="75" cy="55" r="22" fill="#fca5a5" />
    {/* Face */}
    <circle cx="68" cy="51" r="2.5" fill="#334155" />
    <circle cx="82" cy="51" r="2.5" fill="#334155" />
    <ellipse cx="75" cy="57" rx="1.5" ry="2.5" fill="#ef4444" opacity="0.5" />
    <path d="M68 62 Q75 67 82 62" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Hair */}
    <path d="M50 55 Q75 20 100 55 Z" fill="#475569" />
    {/* Legs walking */}
    <path d="M65 125 L55 155" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" />
    <path d="M85 125 L95 155" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" />
    {/* Shoes */}
    <ellipse cx="50" cy="160" rx="10" ry="6" fill="#1e293b" />
    <ellipse cx="100" cy="160" rx="10" ry="6" fill="#1e293b" />
    {/* Arms walking */}
    <path d="M60 90 L40 115" stroke="#fca5a5" strokeWidth="10" strokeLinecap="round" />
    <path d="M90 90 L110 115" stroke="#fca5a5" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

const rubricData = [
  { aspect: "Ketepatan Isi", indicator: "Sebab dan akibat disampaikan dengan tepat" },
  { aspect: "Keruntutan", indicator: "Penyampaian disampaikan dengan runtut dan logis" },
  { aspect: "Kelancaran", indicator: "Berbicara dengan lancar tanpa banyak jeda" },
  { aspect: "Kejelasan Artikulasi", indicator: "Pengucapan disampaikan dengan jelas dan mudah dipahami" },
  { aspect: "Kepercayaan Diri", indicator: "Berbicara dengan percaya diri tanpa ragu-ragu" }
];

export default function RubricPage({ onNext }) {
  return (
    <>
      {/* Custom Background for Rubric Page */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] pointer-events-none" style={{ zIndex: 0 }}>
        {/* Flat Ground */}
        <div className="absolute bottom-0 left-0 w-full h-[25%] bg-[#4ade80] border-t-[12px] border-[#22c55e]" />
        
        {/* Trees on the Left */}
        <SimpleTree className="absolute bottom-[20%] left-[5%] md:left-[10%] w-32 h-40 md:w-48 md:h-64 opacity-90" />
        <SimpleTree className="absolute bottom-[22%] left-[20%] md:left-[25%] w-24 h-32 md:w-32 md:h-48 opacity-70" />

        {/* Character on the Right */}
        <motion.div 
          animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[18%] right-[10%] md:right-[20%] w-28 h-40 md:w-40 md:h-56 drop-shadow-md"
        >
          <CharacterWalking className="w-full h-full" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full flex flex-col items-center justify-center relative z-10 px-4 py-2 md:py-4"
      >
        <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
          
          {/* Header Section */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 md:p-6 relative flex flex-col items-center text-center">
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-20">
              <ClipboardCheck className="w-24 h-24 text-[#315588]" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-[#315588] mb-1 md:mb-2" style={{ fontFamily: '"Kent", sans-serif', letterSpacing: '2px' }}>
              Rubrik Penilaian Guru
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium tracking-wide">
              Panduan Penilaian Keterampilan Berbicara
            </p>
          </div>

          {/* Table Section */}
          <div className="p-3 md:p-6 bg-[#dbeafe]">
            <div className="rounded-xl overflow-hidden border-2 border-slate-800 shadow-lg">
              {/* Table Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 bg-[#0f172a] text-white">
                <div className="p-3 md:p-4 text-center font-bold text-base md:text-lg md:col-span-1 border-b md:border-b-0 md:border-r border-slate-700">
                  Aspek
                </div>
                <div className="p-3 md:p-4 text-center font-bold text-base md:text-lg md:col-span-2">
                  Indikator
                </div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col gap-[2px] bg-slate-800">
                {rubricData.map((row, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    key={index} 
                    className="grid grid-cols-1 md:grid-cols-3 bg-white"
                  >
                    <div className="p-3 md:p-4 flex items-center justify-center text-center font-bold text-sm md:text-base text-slate-800 bg-[#fef3c7] md:col-span-1 md:border-r-[2px] border-slate-800">
                      {row.aspect}
                    </div>
                    <div className="p-3 md:p-4 flex items-center text-sm md:text-base text-slate-700 bg-[#fefce8] md:col-span-2">
                      {row.indicator}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Interactive Button */}
        <motion.div 
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 flex flex-col items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="p-4 rounded-full bg-[#315588] text-white shadow-2xl hover:bg-[#233f66] transition-colors flex items-center justify-center animate-bounce border-4 border-white/50"
          >
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
