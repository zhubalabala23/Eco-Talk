import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import bgRegistration from '../assets/background_registration/background_registration.webp';

export default function TeacherLoginView({ onLogin, onBack }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default PIN for teacher access
  const TEACHER_PIN = '987654';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate small network delay for UX
    setTimeout(() => {
      if (pin === TEACHER_PIN) {
        onLogin();
      } else {
        setError('PIN yang dimasukkan salah. Silakan coba lagi.');
        setPin('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image reused from Registration */}
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url(${bgRegistration})`, zIndex: 0 }}
      />

      {/* Header with Back button */}
      <header className="absolute top-0 left-0 w-full py-6 px-4 md:px-8 flex items-center z-20">
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
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-center max-w-md w-full mx-4"
      >
        <div className="inline-flex p-4 rounded-full bg-slate-100 mb-6">
          <Lock className="w-8 h-8 text-slate-700" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">Akses Guru</h2>
        <p className="text-slate-500 mb-8">Masukkan PIN keamanan untuk mengakses halaman penilaian.</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">PIN Akses</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-[#315588] focus:border-[#315588] shadow-sm"
                placeholder="Masukkan PIN..."
                maxLength={6}
                pattern="\d*"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || pin.length < 4}
            className={`w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#315588] mt-4 ${isLoading || pin.length < 4 ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#315588] hover:bg-[#233f66]'}`}
          >
            {isLoading ? 'Memverifikasi...' : <span className="flex items-center">Masuk <ArrowRight className="ml-2 w-5 h-5" /></span>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
