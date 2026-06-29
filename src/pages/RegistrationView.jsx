import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Hash, ArrowRight, ChevronLeft } from 'lucide-react';
import { saveStudent } from '../db';
import bgRegistration from '../assets/background_registration/background_registration.webp';

export default function RegistrationView({ onComplete, onBack }) {
  const [name, setName] = useState('');
  const [absen, setAbsen] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedAbsen = String(absen).trim();
    
    if (!trimmedName || !trimmedAbsen) {
      alert("Nama dan Nomor Absen tidak boleh kosong atau hanya berupa spasi!");
      return;
    }

    setIsLoading(true);
    try {
      const studentData = {
        name: trimmedName,
        absen: trimmedAbsen,
      };
      const savedStudent = await saveStudent(studentData);
      onComplete(savedStudent);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Custom Background Image for Registration Page */}
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url(${bgRegistration})`, zIndex: 0 }}
      />

      {/* Header with Back button */}
      <header className="fixed top-0 left-0 w-full py-6 px-4 md:px-8 flex items-center z-50">
        <motion.button 
          onClick={onBack}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-[#315588] hover:bg-[#233f66] shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-center max-w-md mx-auto mt-10"
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
