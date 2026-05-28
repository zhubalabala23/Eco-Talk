import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Hash, ArrowRight } from 'lucide-react';
import { saveStudent } from './db';

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

export default function RegistrationView({ onComplete }) {
  const [name, setName] = useState('');
  const [absen, setAbsen] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && absen) {
      setIsLoading(true);
      try {
        const studentData = {
          name,
          absen,
        };
        const savedStudent = await saveStudent(studentData);
        onComplete(savedStudent);
      } catch (error) {
        console.error("Firebase Error:", error);
        alert("Gagal menyimpan data! Pesan Error: " + error.message + "\n\nPastikan Rules Firebase sudah diubah menjadi 'true' (allow read, write: if true;)");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Custom Background for Login Page */}
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
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-center max-w-md mx-auto mt-10"
      >
        <div className="inline-flex p-4 rounded-full bg-blue-100 mb-6">
          <User className="w-8 h-8 text-blue-700" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">Halo, Sobat Bumi!</h2>
        <p className="text-slate-500 mb-8">Sebelum mulai berpetualang, isi data dirimu dulu ya!</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Siswa (Kelas 5)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Masukkan namamu..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nomor Absen</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="number"
                required
                value={absen}
                onChange={(e) => setAbsen(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Nomor absen..."
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#315588] hover:bg-[#233f66]'}`}
          >
            {isLoading ? 'Memuat Data...' : <span className="flex items-center">Mulai Belajar <ArrowRight className="ml-2 w-5 h-5" /></span>}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
}
