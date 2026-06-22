import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Trophy } from 'lucide-react';
import bgLanding from './assets/background_landingpage/background_landingpage.webp';
import imgPerahu from './assets/charachters_landing/perahu.webp';
import imgNaikSepeda from './assets/charachters_landing/naik_sepeda.webp';
import imgPriaSampah from './assets/charachters_landing/pria_membuang_sampah.webp';
import imgPriaMenanam from './assets/charachters_landing/pria_menanam.webp';
import imgWanitaSampah from './assets/charachters_landing/wanita_membuang_sampah.webp';
import imgWanitaMenanam from './assets/charachters_landing/wanita_menanam.webp';

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

export default function LandingPage({ onStudentStart, onTeacherStart, onScoreDashboard }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Custom Background Image */}
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-[length:100%_100%]"
        style={{ backgroundImage: `url(${bgLanding})`, zIndex: 0 }}
      />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
        
        {/* Sun (Static) */}
        <div className="absolute top-[10%] right-[10%] w-24 h-24 md:w-40 md:h-40">
          <Sun className="w-full h-full" />
        </div>

        {/* Animated Clouds */}
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
        
        {/* Animated Boat */}
        <motion.div 
          animate={{ x: ['-2vw', '2vw', '-2vw'] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[14%] left-[45%] w-[8%] md:w-[6%] lg:w-[5%] z-10 drop-shadow-md"
        >
          <img src={imgPerahu} alt="Perahu" className="w-full h-auto" />
        </motion.div>

        {/* Character: Wanita Menanam (Left, mid-high) */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute bottom-[30%] left-[6%] w-[7%] md:w-[6%] lg:w-[5%] z-10 drop-shadow-md"
        >
          <img src={imgWanitaMenanam} alt="Wanita Menanam" className="w-full h-auto" />
        </motion.div>

        {/* Character: Pria Menanam (Left, mid) */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[26%] left-[16%] w-[8%] md:w-[7%] lg:w-[6%] z-10 drop-shadow-md"
        >
          <img src={imgPriaMenanam} alt="Pria Menanam" className="w-full h-auto" />
        </motion.div>

        {/* Character: Pria Membuang Sampah (Bottom Left) */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute bottom-[6%] left-[20%] w-[9%] md:w-[8%] lg:w-[7%] z-20 drop-shadow-md"
        >
          <img src={imgPriaSampah} alt="Pria Membuang Sampah" className="w-full h-auto" />
        </motion.div>

        {/* Character: Wanita Membuang Sampah (Bottom Right) */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          className="absolute bottom-[4%] right-[24%] w-[8%] md:w-[7%] lg:w-[6%] z-20 drop-shadow-md"
        >
          <img src={imgWanitaSampah} alt="Wanita Membuang Sampah" className="w-full h-auto" />
        </motion.div>

        {/* Character: Naik Sepeda (Far Right) */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          className="absolute bottom-[18%] right-[5%] w-[9%] md:w-[8%] lg:w-[6%] z-10 drop-shadow-md"
        >
          <img src={imgNaikSepeda} alt="Naik Sepeda" className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center px-4 mt-[-5vh]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center"
        >
          <motion.h1 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="text-6xl md:text-8xl tracking-widest mb-4 uppercase drop-shadow-xl"
            style={{ 
              fontFamily: '"Kent", sans-serif',
              color: "#315588",
              WebkitTextStroke: "6px white",
              paintOrder: "stroke fill"
            }} >
            Eco Talk
          </motion.h1>
          <p className="text-sm md:text-base font-bold text-[#315588] tracking-widest bg-white/70 px-6 py-2 rounded-full shadow-sm backdrop-blur-sm">
            MENCARI SEBAB AKIBAT DENGAN ALAM
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStudentStart}
            className="px-6 py-4 rounded-2xl bg-white text-[#315588] shadow-lg hover:shadow-xl border-2 border-[#315588] transition-all flex items-center justify-center gap-3 font-bold"
          >
            <BookOpen className="w-6 h-6" />
            <span>Masuk sebagai Siswa</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTeacherStart}
            className="px-6 py-4 rounded-2xl bg-[#315588] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 font-bold"
          >
            <GraduationCap className="w-6 h-6" />
            <span>Masuk sebagai Guru</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
