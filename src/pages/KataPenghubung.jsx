import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Lightbulb, CheckCircle2 } from 'lucide-react';

const wordsData = {
  banjir: ['karena', 'sehingga', 'akibatnya', 'oleh sebab itu', 'maka'],
  sampah: ['karena itu', 'akibatnya', 'oleh karena itu', 'sehingga', 'maka'],
  polusi: ['akibatnya', 'oleh karena itu', 'karena', 'sehingga', 'maka'],
  pohon: ['sehingga', 'akibatnya', 'karena', 'oleh karena itu', 'maka'],
  air: ['akibatnya', 'oleh karena itu', 'karena', 'sehingga', 'maka']
};

export default function KataPenghubung({ topicId, onCompleteChallenge, onBack }) {
  const words = wordsData[topicId] || wordsData.banjir;

  const bgStyles = [
    'bg-pink-50 border-pink-200 text-pink-700',
    'bg-amber-50 border-amber-200 text-amber-700',
    'bg-green-50 border-green-200 text-green-700',
    'bg-purple-50 border-purple-200 text-purple-700',
    'bg-sky-50 border-sky-200 text-sky-700'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto flex flex-col gap-8 relative overflow-hidden"
    >
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Langkah 3 dari 3
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
            3
          </span>
          <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-wide uppercase">
            Kata Penghubung
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <p className="text-slate-700 font-bold text-base md:text-lg">
            Gunakan kata penghubung berikut saat kamu berbicara!
          </p>
        </div>

        {/* Conjunction Words List */}
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          {words.map((word, index) => {
            const style = bgStyles[index % bgStyles.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 font-bold text-lg md:text-xl tracking-wide ${style} shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500 animate-pulse" />
                  <span>{word}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tips Box */}
        <div className="bg-[#fef8e7] border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-800 text-xs max-w-md mx-auto">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="font-semibold leading-relaxed">
            Tips: Gunakan minimal 2 kata penghubung agar ceritamu lebih runtut dan jelas.
          </p>
        </div>

        {/* Tantangan Selesai Banner and Action */}
        <div className="pt-6 border-t border-slate-100 text-center space-y-6">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex flex-col sm:flex-row items-center gap-3 bg-green-50 border-2 border-green-400 text-green-800 px-6 py-4 rounded-3xl shadow-sm text-sm font-bold max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <span className="uppercase text-green-700 tracking-wider font-extrabold">Tantangan Selesai!</span>
            </div>
            <span className="text-xs font-medium text-green-600 text-center sm:text-left">
              Kamu sudah siap untuk menjelaskan hubungan sebab-akibat menggunakan kosakata di atas.
            </span>
          </motion.div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCompleteChallenge}
              className="bg-green-500 hover:bg-green-600 text-white font-black text-base px-10 py-4 rounded-2xl shadow-lg shadow-green-200 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Selesaikan Tantangan!
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
