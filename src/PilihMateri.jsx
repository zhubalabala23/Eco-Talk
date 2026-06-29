import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, ArrowRight, Waves, Trash2, Factory, TreePine, Droplets, HelpCircle } from 'lucide-react';
import { topics } from './data';

const iconMap = {
  Waves,
  Trash2,
  Factory,
  TreePine,
  Droplets
};

export default function PilihMateri({ onSelectTopic, onBack, progress }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
          <Trophy className="w-4 h-4" />
          Eco Challenge Warm-up
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          Pilih Tantangan Lingkungan
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base font-medium">
          Selesaikan 3 langkah tantangan pemanasan di bawah ini sebelum melanjutkan ke rekam suara!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const IconComponent = iconMap[topic.iconName] || HelpCircle;
          const topicProgress = progress[topic.id] || {};
          const isCompleted = topicProgress.challengeCompleted;

          return (
            <motion.div
              key={topic.id}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTopic(topic)}
              className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer bg-white shadow-lg hover:shadow-xl border-2 transition-all ${
                isCompleted 
                  ? 'border-green-400 bg-gradient-to-br from-white to-green-50/30' 
                  : 'border-slate-100 hover:border-blue-200'
              }`}
            >
              {/* Decorative background shape */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${topic.color} opacity-20`} />

              {isCompleted && (
                <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                  ✓ Selesai
                </div>
              )}

              <div className="flex flex-col h-full justify-between space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-2xl ${topic.color} ${topic.textColor} shadow-sm`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-slate-800`}>{topic.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Latih kosa kata dan urutan sebab akibat tentang {topic.title.toLowerCase()}.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className={`text-xs font-bold ${isCompleted ? 'text-green-600' : 'text-[#315588]'}`}>
                    {isCompleted ? 'Main Lagi' : 'Mulai Tantangan'}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isCompleted ? 'text-green-500' : 'text-[#315588]'}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-600 text-sm font-semibold transition-colors shadow-sm"
        >
          Kembali ke Menu Utama
        </button>
      </div>
    </motion.div>
  );
}
