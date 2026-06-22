import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, ClipboardCheck } from 'lucide-react';

import bgGuide from './assets/images/background/background_guideview.webp';

const Cloud = ({ className }) => (
  <svg viewBox="0 0 100 50" className={className} xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
    <circle cx="30" cy="25" r="15" fill="white" />
    <circle cx="50" cy="20" r="20" fill="white" />
    <circle cx="70" cy="25" r="15" fill="white" />
    <rect x="30" y="20" width="40" height="20" fill="white" />
  </svg>
);

const rubricData = [
  { aspect: "Ketepatan Isi", indicator: "Sebab dan akibat disampaikan dengan tepat" },
  { aspect: "Keruntutan", indicator: "Penyampaian disampaikan dengan runtut dan logis" },
  { aspect: "Kelancaran", indicator: "Berbicara dengan lancar tanpa banyak jeda" },
  { aspect: "Kejelasan Artikulasi", indicator: "Pengucapan disampaikan dengan jelas dan mudah dipahami" },
  { aspect: "Kepercayaan Diri", indicator: "Berbicara dengan percaya diri tanpa ragu-ragu" }
];

export default function RubricPage({ onNext, onBack }) {
  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-[length:100%_100%]"
        style={{ backgroundImage: `url(${bgGuide})`, zIndex: 0 }}
      />
      
      {/* Animated Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
        <motion.div 
          animate={{ x: ['-10vw', '120vw'] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] w-32 h-16 md:w-48 md:h-24 opacity-80"
        >
          <Cloud className="w-full h-full" />
        </motion.div>
        <motion.div 
          animate={{ x: ['-10vw', '120vw'] }} 
          transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-[15%] w-24 h-12 md:w-32 md:h-16 opacity-60"
        >
          <Cloud className="w-full h-full" />
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

        {/* Middle-Right Next Button */}
        <motion.div 
          className="fixed top-1/2 -translate-y-1/2 right-2 md:right-8 lg:right-12 z-50 flex flex-col items-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="p-3 rounded-full bg-[#315588] hover:bg-[#233f66] text-white shadow-lg transition-colors flex items-center justify-center animate-bounce"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={3} />
          </motion.button>
        </motion.div>

        {/* Middle-Left Back Button */}
        {onBack && (
          <motion.div 
            className="fixed top-1/2 -translate-y-1/2 left-2 md:left-8 lg:left-12 z-50 flex flex-col items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
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
      </motion.div>
    </>
  );
}
