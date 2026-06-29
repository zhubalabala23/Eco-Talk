import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Check, AlertCircle, ArrowRight } from 'lucide-react';

const sequenceData = {
  banjir: {
    initial: 'Sampah',
    initialEmoji: '🗑️',
    initialImageName: 'sampah',
    tip: 'Ingat! Setiap peristiwa saling berhubungan. Susun urutan dari penyebab hingga akibat.',
    options: [
      { id: 'opt1', text: 'Selokan Tersumbat', emoji: '🛣️', imageName: 'selokan_tersumbat' },
      { id: 'opt2', text: 'Hujan Deras', emoji: '🌧️', imageName: 'hujan_deras' },
      { id: 'opt3', text: 'Banjir', emoji: '🌊', imageName: 'banjir' },
      { id: 'opt4', text: 'Pohon Menyerap Air', emoji: '🌳', imageName: 'pohon_menyerap_air' }
    ],
    correctOrder: ['Selokan Tersumbat', 'Hujan Deras', 'Banjir']
  },
  sampah: {
    initial: 'Membuang Sampah Sembarangan',
    initialEmoji: '🗑️',
    initialImageName: 'membuang_sampah',
    tip: 'Ingat! Setiap peristiwa saling berhubungan. Susun urutan dari penyebab hingga akibat.',
    options: [
      { id: 'opt1', text: 'Menumpuk di Selokan', emoji: '📦', imageName: 'sampah_menumpuk' },
      { id: 'opt2', text: 'Saluran Air Tersumbat', emoji: '🛣️', imageName: 'saluran_tersumbat' },
      { id: 'opt3', text: 'Banjir Saat Hujan', emoji: '🌊', imageName: 'banjir' },
      { id: 'opt4', text: 'Daur Ulang Kertas', emoji: '📄', imageName: 'daur_ulang' }
    ],
    correctOrder: ['Menumpuk di Selokan', 'Saluran Air Tersumbat', 'Banjir Saat Hujan']
  },
  polusi: {
    initial: 'Asap Kendaraan & Pabrik',
    initialEmoji: '🏭',
    initialImageName: 'asap_kendaraan',
    tip: 'Ingat! Setiap peristiwa saling berhubungan. Susun urutan dari penyebab hingga akibat.',
    options: [
      { id: 'opt1', text: 'Udara Tercemar', emoji: '🌫️', imageName: 'udara_tercemar' },
      { id: 'opt2', text: 'Menghirup Udara Kotor', emoji: '😷', imageName: 'menghirup_udara' },
      { id: 'opt3', text: 'Batuk & Sesak Napas', emoji: '🫁', imageName: 'sesak_napas' },
      { id: 'opt4', text: 'Berjalan Kaki', emoji: '🚶', imageName: 'berjalan_kaki' }
    ],
    correctOrder: ['Udara Tercemar', 'Menghirup Udara Kotor', 'Batuk & Sesak Napas']
  },
  pohon: {
    initial: 'Penebangan Pohon Liar',
    initialEmoji: '🪓',
    initialImageName: 'penebangan_pohon',
    tip: 'Ingat! Setiap peristiwa saling berhubungan. Susun urutan dari penyebab hingga akibat.',
    options: [
      { id: 'opt1', text: 'Akar Penahan Hilang', emoji: '🌱', imageName: 'akar_hilang' },
      { id: 'opt2', text: 'Hujan Deras Turun', emoji: '🌧️', imageName: 'hujan_deras' },
      { id: 'opt3', text: 'Tanah Longsor', emoji: '⛰️', imageName: 'longsor' },
      { id: 'opt4', text: 'Udara Menjadi Sejuk', emoji: '🍃', imageName: 'udara_sejuk' }
    ],
    correctOrder: ['Akar Penahan Hilang', 'Hujan Deras Turun', 'Tanah Longsor']
  },
  air: {
    initial: 'Membuang Limbah ke Sungai',
    initialEmoji: '🧪',
    initialImageName: 'limbah_sungai',
    tip: 'Ingat! Setiap peristiwa saling berhubungan. Susun urutan dari penyebab hingga akibat.',
    options: [
      { id: 'opt1', text: 'Air Menjadi Kotor & Tercemar', emoji: '💧', imageName: 'air_tercemar' },
      { id: 'opt2', text: 'Mengonsumsi Air Tercemar', emoji: '🥛', imageName: 'minum_air' },
      { id: 'opt3', text: 'Sakit Perut & Diare', emoji: '🤢', imageName: 'sakit_perut' },
      { id: 'opt4', text: 'Menghemat Keran Air', emoji: '🚰', imageName: 'menghemat_air' }
    ],
    correctOrder: ['Air Menjadi Kotor & Tercemar', 'Mengonsumsi Air Tercemar', 'Sakit Perut & Diare']
  }
};

function SequenceCard({ text, emoji, imageName, isSlot = false }) {
  const [imageError, setImageError] = useState(false);
  const imagePath = `/challenge/${imageName}.webp`;

  return (
    <div className="flex flex-col items-center justify-center text-center w-full h-full p-2 select-none">
      {!imageError && imageName ? (
        <img 
          src={imagePath} 
          alt={text} 
          onError={() => setImageError(true)}
          className={`${isSlot ? 'w-12 h-12 md:w-16 md:h-16' : 'w-16 h-16 md:w-20 md:h-20'} object-contain mb-1 transition-transform`}
          draggable={false}
        />
      ) : (
        <span className={`${isSlot ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} mb-1`}>{emoji}</span>
      )}
      <span className="text-[10px] md:text-xs font-bold text-slate-700 leading-tight">
        {text}
      </span>
    </div>
  );
}

export default function HubunganSebab({ topicId, onNext, onBack }) {
  const data = sequenceData[topicId] || sequenceData.banjir;
  const [slots, setSlots] = useState([null, null, null]);
  const [showFeedback, setShowFeedback] = useState(null); // 'success' or 'error'
  const [draggedOverSlot, setDraggedOverSlot] = useState(null);

  const handleOptionClick = (option) => {
    // Check if it is already placed
    const isAlreadyPlaced = slots.some(s => s && s.id === option.id);
    if (isAlreadyPlaced) return;

    // Find first empty slot
    const firstEmptyIndex = slots.findIndex(slot => slot === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmptyIndex] = option;
      setSlots(newSlots);
      setShowFeedback(null);
    }
  };

  const handleSlotClick = (index) => {
    if (slots[index] !== null) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setShowFeedback(null);
    }
  };

  const handleCheck = () => {
    // Check if slots match correctOrder exactly
    const filledTexts = slots.map(s => s ? s.text : '');
    const isCorrect = 
      filledTexts[0] === data.correctOrder[0] &&
      filledTexts[1] === data.correctOrder[1] &&
      filledTexts[2] === data.correctOrder[2];

    if (isCorrect) {
      setShowFeedback('success');
    } else {
      setShowFeedback('error');
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e, optionId, sourceIndex = null) => {
    e.dataTransfer.setData("text/plain", optionId);
    if (sourceIndex !== null) {
      e.dataTransfer.setData("sourceIndex", sourceIndex.toString());
    } else {
      e.dataTransfer.setData("sourceIndex", "");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropSlot = (e, targetIndex) => {
    e.preventDefault();
    const optionId = e.dataTransfer.getData("text/plain");
    const sourceIndexStr = e.dataTransfer.getData("sourceIndex");
    
    const option = data.options.find(o => o.id === optionId);
    if (!option) return;

    const newSlots = [...slots];

    // If source slot exists, clear it
    if (sourceIndexStr !== "") {
      const sourceIndex = parseInt(sourceIndexStr, 10);
      newSlots[sourceIndex] = null;
    } else {
      // It came from pool, check if it's already in another slot
      const existingSlotIndex = slots.findIndex(s => s && s.id === optionId);
      if (existingSlotIndex !== -1) {
        newSlots[existingSlotIndex] = null;
      }
    }

    // Place option in target slot (displaces existing item if any back to pool)
    newSlots[targetIndex] = option;
    setSlots(newSlots);
    setShowFeedback(null);
    setDraggedOverSlot(null);
  };

  const handleDropPool = (e) => {
    e.preventDefault();
    const optionId = e.dataTransfer.getData("text/plain");
    const sourceIndexStr = e.dataTransfer.getData("sourceIndex");

    if (sourceIndexStr !== "") {
      const sourceIndex = parseInt(sourceIndexStr, 10);
      const newSlots = [...slots];
      newSlots[sourceIndex] = null;
      setSlots(newSlots);
      setShowFeedback(null);
    }
  };

  const placedOptionIds = slots.filter(s => s !== null).map(s => s.id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-8 max-w-5xl mx-auto flex flex-col gap-8 relative overflow-hidden"
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
            Langkah 2 dari 3
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
            2
          </span>
          <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-wide uppercase">
            Hubungan Sebab-Akibat
          </h2>
        </div>
      </div>

      {/* Main Grid: Slots & Options */}
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-slate-700 font-bold text-base md:text-lg">
            Seret (drag) gambar ke kolom kosong atau klik untuk mengurutkan sebab-akibat!
          </p>
        </div>

        {/* Cause-Effect Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
          {/* Initial fixed cause */}
          <div className="flex items-center w-full md:w-auto">
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-2 flex flex-col items-center justify-center w-full md:w-44 aspect-square shadow-sm">
              <SequenceCard 
                text={data.initial}
                emoji={data.initialEmoji}
                imageName={data.initialImageName}
                isSlot={true}
              />
            </div>
            <div className="text-slate-400 font-black text-xl px-4 md:px-2 block md:hidden">↓</div>
            <div className="text-slate-400 font-black text-2xl px-3 hidden md:block">➔</div>
          </div>

          {/* Slots */}
          {slots.map((slot, index) => {
            const hasItem = slot !== null;
            const isHovered = draggedOverSlot === index;
            return (
              <React.Fragment key={index}>
                <div className="flex items-center w-full md:w-auto">
                  <motion.div
                    onDragOver={handleDragOver}
                    onDragEnter={() => setDraggedOverSlot(index)}
                    onDragLeave={() => setDraggedOverSlot(null)}
                    onDrop={(e) => handleDropSlot(e, index)}
                    whileHover={hasItem ? { scale: 1.02 } : {}}
                    onClick={() => handleSlotClick(index)}
                    className={`rounded-2xl p-2 flex flex-col items-center justify-center w-full md:w-44 aspect-square border-2 border-dashed transition-all relative cursor-pointer ${
                      hasItem
                        ? 'border-blue-400 bg-blue-50/20 shadow-md'
                        : isHovered
                        ? 'border-blue-500 bg-blue-50/40 scale-105'
                        : 'border-slate-350 bg-slate-50/50 hover:border-slate-400'
                    }`}
                  >
                    {hasItem ? (
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, slot.id, index)}
                        className="w-full h-full flex flex-col items-center justify-center"
                      >
                        <SequenceCard 
                          text={slot.text}
                          emoji={slot.emoji}
                          imageName={slot.imageName}
                          isSlot={true}
                        />
                        <div className="absolute top-2 right-2 bg-slate-200 text-slate-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                          ✕
                        </div>
                      </div>
                    ) : (
                      <span className="text-3xl font-black text-slate-400 select-none">?</span>
                    )}
                  </motion.div>
                  
                  {index < slots.length - 1 && (
                    <>
                      <div className="text-slate-400 font-black text-xl px-4 md:px-2 block md:hidden">↓</div>
                      <div className="text-slate-400 font-black text-2xl px-3 hidden md:block">➔</div>
                    </>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Options to Choose From */}
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDropPool}
          className="space-y-4 pt-6 border-t border-slate-100"
        >
          <p className="text-slate-600 text-xs font-bold text-center uppercase tracking-wider select-none">
            Seret gambar di bawah ini ke dalam kotak "?" di atas!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {data.options.map((option) => {
              const isPlaced = placedOptionIds.includes(option.id);
              return (
                <motion.div
                  key={option.id}
                  draggable={!isPlaced}
                  onDragStart={(e) => handleDragStart(e, option.id)}
                  whileHover={!isPlaced ? { scale: 1.05 } : {}}
                  whileTap={!isPlaced ? { scale: 0.95 } : {}}
                  onClick={() => handleOptionClick(option)}
                  className={`rounded-2xl p-2 flex flex-col items-center justify-center aspect-square border-2 transition-all ${
                    isPlaced
                      ? 'border-slate-150 bg-slate-50/50 opacity-40 cursor-not-allowed'
                      : 'border-slate-200 hover:border-blue-400 bg-white hover:shadow-md cursor-grab active:cursor-grabbing'
                  }`}
                >
                  <SequenceCard 
                    text={option.text}
                    emoji={option.emoji}
                    imageName={option.imageName}
                    isSlot={false}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tip Box & Feedback */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <div className="bg-[#fef8e7] border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-800 text-xs w-full md:max-w-xl">
            <span className="text-xl shrink-0 select-none">⭐</span>
            <p className="font-semibold leading-relaxed">{data.tip}</p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <AnimatePresence mode="wait">
              {showFeedback === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-3 text-xs font-semibold space-y-2 shadow-inner"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Hebat! Urutan sebab akibat sudah benar.</span>
                  </div>
                  <button
                    onClick={onNext}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    Lanjut Langkah 3 <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : showFeedback === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-3 text-xs font-semibold space-y-2 shadow-inner"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span>Urutan masih belum tepat. Coba lagi!</span>
                  </div>
                  <button
                    onClick={() => {
                      setSlots([null, null, null]);
                      setShowFeedback(null);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 px-3 rounded-lg shadow-sm transition-colors"
                  >
                    Reset Urutan
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={handleCheck}
                  disabled={slots.includes(null)}
                  className={`w-full font-bold py-3 px-8 rounded-2xl shadow-md transition-colors text-sm ${
                    !slots.includes(null)
                      ? 'bg-[#315588] hover:bg-[#233f66] text-white cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Periksa Urutan
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
