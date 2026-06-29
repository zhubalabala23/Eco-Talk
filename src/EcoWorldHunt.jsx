import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Info, AlertCircle, ArrowRight } from 'lucide-react';

const challengeData = {
  banjir: {
    title: 'Banjir',
    instruction: 'Pilih semua kata yang berhubungan dengan banjir!',
    tip: 'Tips: Pilih semua kata yang menurutmu berkaitan dengan banjir.',
    words: [
      { id: 'w1', text: 'Sampah', related: true, emoji: '🗑️', imageName: 'sampah' },
      { id: 'w2', text: 'Hujan', related: true, emoji: '🌧️', imageName: 'hujan' },
      { id: 'w3', text: 'Selokan', related: true, emoji: '🛣️', imageName: 'selokan' },
      { id: 'w4', text: 'Banjir', related: true, emoji: '🌊', imageName: 'banjir' },
      { id: 'w5', text: 'Pohon', related: true, emoji: '🌳', imageName: 'pohon' },
      { id: 'w6', text: 'Matahari', related: false, emoji: '☀️', imageName: 'matahari' },
      { id: 'w7', text: 'Sepeda', related: false, emoji: '🚲', imageName: 'sepeda' },
      { id: 'w8', text: 'Asap', related: false, emoji: '💨', imageName: 'asap' },
      { id: 'w9', text: 'Nyamuk', related: true, emoji: '🦟', imageName: 'nyamuk' },
      { id: 'w10', text: 'Ikan', related: false, emoji: '🐟', imageName: 'ikan' },
      { id: 'w11', text: 'Mobil', related: false, emoji: '🚗', imageName: 'mobil' },
      { id: 'w12', text: 'Rumah', related: true, emoji: '🏠', imageName: 'rumah' }
    ]
  },
  sampah: {
    title: 'Sampah',
    instruction: 'Pilih semua kata yang berhubungan dengan sampah!',
    tip: 'Tips: Pilih semua kata yang menurutmu berkaitan dengan penumpukan sampah.',
    words: [
      { id: 'w1', text: 'Plastik', related: true, emoji: '🥤', imageName: 'plastik' },
      { id: 'w2', text: 'Organik', related: true, emoji: '🍎', imageName: 'organik' },
      { id: 'w3', text: 'Sungai', related: true, emoji: '🏞️', imageName: 'sungai' },
      { id: 'w4', text: 'Lalat', related: true, emoji: '🪰', imageName: 'lalat' },
      { id: 'w5', text: 'Bau', related: true, emoji: '🤢', imageName: 'bau' },
      { id: 'w6', text: 'Kertas', related: true, emoji: '📄', imageName: 'kertas' },
      { id: 'w7', text: 'Angin', related: false, emoji: '💨', imageName: 'angin' },
      { id: 'w8', text: 'Bintang', related: false, emoji: '⭐', imageName: 'bintang' },
      { id: 'w9', text: 'Pasir', related: false, emoji: '⏳', imageName: 'pasir' },
      { id: 'w10', text: 'Awan', related: false, emoji: '☁️', imageName: 'awan' },
      { id: 'w11', text: 'Gunung', related: false, emoji: '🏔️', imageName: 'gunung' },
      { id: 'w12', text: 'Bersih', related: true, emoji: '✨', imageName: 'bersih' }
    ]
  },
  polusi: {
    title: 'Polusi',
    instruction: 'Pilih semua kata yang berhubungan dengan polusi!',
    tip: 'Tips: Pilih semua kata yang menurutmu berkaitan dengan pencemaran lingkungan.',
    words: [
      { id: 'w1', text: 'Asap', related: true, emoji: '💨', imageName: 'asap' },
      { id: 'w2', text: 'Pabrik', related: true, emoji: '🏭', imageName: 'pabrik' },
      { id: 'w3', text: 'Batuk', related: true, emoji: '😷', imageName: 'batuk' },
      { id: 'w4', text: 'Kendaraan', related: true, emoji: '🚗', imageName: 'kendaraan' },
      { id: 'w5', text: 'Kotor', related: true, emoji: '🪰', imageName: 'kotor' },
      { id: 'w6', text: 'Air Keruh', related: true, emoji: '🧪', imageName: 'air_keruh' },
      { id: 'w7', text: 'Sesak Napas', related: true, emoji: '🫁', imageName: 'sesak_napas' },
      { id: 'w8', text: 'Mainan', related: false, emoji: '🧸', imageName: 'mainan' },
      { id: 'w9', text: 'Boneka', related: false, emoji: '🪆', imageName: 'boneka' },
      { id: 'w10', text: 'Bulan', related: false, emoji: '🌙', imageName: 'bulan' },
      { id: 'w11', text: 'Cokelat', related: false, emoji: '🍫', imageName: 'cokelat' },
      { id: 'w12', text: 'Bunga', related: false, emoji: '🌸', imageName: 'bunga' }
    ]
  },
  pohon: {
    title: 'Menanam Pohon',
    instruction: 'Pilih semua kata yang berhubungan dengan menanam pohon!',
    tip: 'Tips: Pilih semua kata yang menurutmu berkaitan dengan pentingnya menanam pohon.',
    words: [
      { id: 'w1', text: 'Oksigen', related: true, emoji: '💨', imageName: 'oksigen' },
      { id: 'w2', text: 'Akar', related: true, emoji: '🌱', imageName: 'akar' },
      { id: 'w3', text: 'Sejuk', related: true, emoji: '🍃', imageName: 'sejuk' },
      { id: 'w4', text: 'Tanah', related: true, emoji: '🪵', imageName: 'tanah' },
      { id: 'w5', text: 'Longsor', related: true, emoji: '⛰️', imageName: 'longsor' },
      { id: 'w6', text: 'Burung', related: true, emoji: '🐦', imageName: 'burung' },
      { id: 'w7', text: 'Teduh', related: true, emoji: '⛱️', imageName: 'teduh' },
      { id: 'w8', text: 'Plastik', related: false, emoji: '🥤', imageName: 'plastik' },
      { id: 'w9', text: 'Kaca', related: false, emoji: '🔍', imageName: 'kaca' },
      { id: 'w10', text: 'Besi', related: false, emoji: '🔩', imageName: 'besi' },
      { id: 'w11', text: 'Semen', related: false, emoji: '🧱', imageName: 'semen' },
      { id: 'w12', text: 'Asap', related: false, emoji: '🏭', imageName: 'asap' }
    ]
  },
  air: {
    title: 'Air Bersih',
    instruction: 'Pilih semua kata yang berhubungan dengan air bersih!',
    tip: 'Tips: Pilih semua kata yang menurutmu berkaitan dengan menjaga air bersih.',
    words: [
      { id: 'w1', text: 'Sungai', related: true, emoji: '🏞️', imageName: 'sungai' },
      { id: 'w2', text: 'Keran', related: true, emoji: '🚰', imageName: 'keran' },
      { id: 'w3', text: 'Minum', related: true, emoji: '🥛', imageName: 'minum' },
      { id: 'w4', text: 'Jernih', related: true, emoji: '💧', imageName: 'jernih' },
      { id: 'w5', text: 'Kuman', related: true, emoji: '🦠', imageName: 'kuman' },
      { id: 'w6', text: 'Penyakit', related: true, emoji: '🤢', imageName: 'penyakit' },
      { id: 'w7', text: 'Diare', related: true, emoji: '🤮', imageName: 'diare' },
      { id: 'w8', text: 'Kereta', related: false, emoji: '🚂', imageName: 'kereta' },
      { id: 'w9', text: 'Handphone', related: false, emoji: '📱', imageName: 'handphone' },
      { id: 'w10', text: 'Sepatu', related: false, emoji: '👟', imageName: 'sepatu' },
      { id: 'w11', text: 'Buku', related: false, emoji: '📚', imageName: 'buku' },
      { id: 'w12', text: 'Pensil', related: false, emoji: '✏', imageName: 'pensil' }
    ]
  }
};

function WordItem({ word, isSelected, onClick }) {
  const [imageError, setImageError] = useState(false);
  const imagePath = `/challenge/${word.imageName || word.text.toLowerCase().replace(/\s+/g, '_')}.webp`;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 md:p-5 rounded-2xl border-2 transition-all aspect-square text-center gap-2 relative overflow-hidden ${
        isSelected
          ? 'border-blue-400 bg-blue-50/50 shadow-md shadow-blue-100'
          : 'border-slate-150 hover:border-slate-300 bg-slate-50/30'
      }`}
    >
      {/* Active check indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-0.5 shadow-sm z-20">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
      )}
      
      {!imageError ? (
        <img 
          src={imagePath} 
          alt={word.text} 
          onError={() => setImageError(true)}
          className="w-12 h-12 md:w-16 md:h-16 object-contain mb-1 transition-transform" 
        />
      ) : (
        <span className="text-3xl md:text-4xl mb-1">{word.emoji}</span>
      )}
      
      <span className="text-xs md:text-sm font-bold text-slate-700 leading-tight">
        {word.text}
      </span>
    </motion.button>
  );
}

export default function EcoWorldHunt({ topicId, onNext, onBack }) {
  const data = challengeData[topicId] || challengeData.banjir;
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null); // 'success' or 'error'

  const handleToggleWord = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
    setShowFeedback(null);
  };

  const handleCheckAnswers = () => {
    const correctIds = data.words.filter(w => w.related).map(w => w.id);
    const incorrectSelected = data.words.filter(w => !w.related && selectedIds.includes(w.id));
    const correctMissing = correctIds.filter(id => !selectedIds.includes(id));

    if (incorrectSelected.length === 0 && correctMissing.length === 0) {
      setShowFeedback('success');
    } else {
      setShowFeedback('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 relative overflow-hidden"
    >
      {/* Left Column: Progress Info & Instructions */}
      <div className="w-full md:w-[35%] flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Langkah 1 dari 3
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                1
              </span>
              <h2 className="text-2xl font-black text-slate-800 tracking-wide uppercase">
                Eco Word Hunt
              </h2>
            </div>
            <p className="text-slate-600 text-sm font-semibold leading-relaxed">
              {data.instruction}
            </p>
          </div>

          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex gap-3 text-slate-600 text-xs">
            <Info className="w-4 h-4 text-[#315588] shrink-0" />
            <p className="font-medium leading-relaxed">{data.tip}</p>
          </div>
        </div>

        <div className="mt-8 pt-4">
          <AnimatePresence mode="wait">
            {showFeedback === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 text-xs font-semibold space-y-3 shadow-inner"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Keren! Kamu menemukan semua kata yang tepat.</span>
                </div>
                <button
                  onClick={onNext}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  Lanjut Langkah 2 <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : showFeedback === 'error' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 text-xs font-semibold space-y-2 shadow-inner"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Kurang tepat. Coba cek kata terpilih lagi ya!</span>
                </div>
                <p className="text-[10px] text-red-600/80 leading-normal font-normal">
                  Pastikan memilih semua kata yang berkaitan dengan {data.title.toLowerCase()} dan tidak memilih kata yang tidak berhubungan.
                </p>
              </motion.div>
            ) : (
              <button
                onClick={handleCheckAnswers}
                disabled={selectedIds.length === 0}
                className={`w-full font-bold py-3 px-6 rounded-2xl shadow-md transition-colors text-sm ${
                  selectedIds.length > 0
                    ? 'bg-[#315588] hover:bg-[#233f66] text-white cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Periksa Jawaban
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Words Grid */}
      <div className="w-full md:w-[65%] flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
          {data.words.map((word) => (
            <WordItem 
              key={word.id}
              word={word}
              isSelected={selectedIds.includes(word.id)}
              onClick={() => handleToggleWord(word.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
