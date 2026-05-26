import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star } from 'lucide-react';

export default function ClosingView({ studentInfo, topic, onHome }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center max-w-lg mx-auto mt-10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yellow-100 to-transparent opacity-50 pointer-events-none" />
      
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="inline-flex p-6 rounded-full bg-yellow-100 mb-6 relative z-10"
      >
        <Award className="w-16 h-16 text-yellow-600" />
      </motion.div>

      <h2 className="text-3xl font-bold text-slate-800 mb-4">Luar Biasa, {studentInfo?.name}!</h2>
      <p className="text-slate-600 mb-8 text-lg">
        Selamat anda telah menyelesaikan materi <span className="font-bold text-[#315588]">{topic?.title || 'ini'}</span>. Suaramu sangat berarti untuk menjaga bumi kita!
      </p>

      <div className="flex justify-center space-x-2 mb-8">
        {[1, 2, 3].map((star, i) => (
          <motion.div
            key={star}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + (i * 0.2), type: "spring" }}
          >
            <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHome}
        className="px-8 py-4 rounded-full bg-[#315588] text-white font-bold shadow-lg hover:bg-[#233f66] transition-colors"
      >
        Kembali ke Menu Materi
      </motion.button>
    </motion.div>
  );
}
