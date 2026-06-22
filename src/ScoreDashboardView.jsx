import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAssessments, getStudents } from './db';
import { Trophy, ChevronLeft, Medal, Star } from 'lucide-react';
import { topics } from './data';

export default function ScoreDashboardView({ onBack }) {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScores();
    // Optional: Refresh periodically
    const interval = setInterval(() => {
      loadScores();
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  const loadScores = async () => {
    try {
      const assessments = await getAssessments();
      const students = await getStudents();

      const studentMap = {};
      students.forEach(s => {
        studentMap[s.id] = {
          ...s,
          totalScore: 0,
          assessments: []
        };
      });

      assessments.forEach(a => {
        if (a.studentId && studentMap[a.studentId]) {
          studentMap[a.studentId].assessments.push(a);
          if (a.graded) {
            studentMap[a.studentId].totalScore += a.score || 0;
          }
        }
      });

      const sortedStudents = Object.values(studentMap)
        .filter(student => student.assessments.length > 0)
        .sort((a, b) => b.totalScore - a.totalScore);
      setStudentsData(sortedStudents);
    } catch (err) {
      console.error("Error loading scores:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (index) => {
    if (index === 0) return 'text-yellow-500 bg-yellow-50 border-yellow-200';
    if (index === 1) return 'text-slate-400 bg-slate-50 border-slate-200';
    if (index === 2) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-[#315588] bg-blue-50 border-blue-100';
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-slate-400" />;
    if (index === 2) return <Medal className="w-6 h-6 text-amber-700" />;
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-[#315588]">{index + 1}</span>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#e0f2fe] p-4 md:p-8 relative"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 w-full relative pt-2 md:pt-4">
          {/* Back Button Container */}
          <div className="w-full flex justify-start mb-4">
            <button 
              onClick={onBack}
              className="p-2 md:p-3 rounded-full bg-[#315588] hover:bg-[#233f66] text-white shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={3} />
            </button>
          </div>

          {/* Title Container */}
          <div className="flex flex-col items-center justify-center text-center w-full">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center justify-center gap-2 flex-wrap"
            >
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 shrink-0" />
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#315588] tracking-widest uppercase"
                  style={{ fontFamily: '"Kent", sans-serif' }}>
                Klasemen Nilai
              </h1>
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 shrink-0" />
            </motion.div>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-500 mt-2 tracking-wider">
              UPDATE LIVE - HASIL TEST SEBAB AKIBAT
            </p>
          </div>
        </div>

        {/* Board */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-4 md:p-6 overflow-hidden mt-6 md:mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-[#315588] rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-500 font-medium">Memuat data klasemen...</p>
            </div>
          ) : studentsData.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Star className="w-16 h-16 mx-auto mb-4 text-slate-200" />
              <p className="text-lg font-medium">Belum ada nilai yang masuk.</p>
              <p className="text-sm">Ayo kerjakan misi dan tunggu guru memberikan nilai!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {studentsData.map((student, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={student.id}
                  className={`flex items-center p-4 md:p-6 rounded-2xl border ${getRankColor(index)} shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform`}
                >
                  {/* Decorative background number */}
                  <div className="absolute -right-4 -bottom-8 text-8xl font-black opacity-[0.03] select-none pointer-events-none">
                    {index + 1}
                  </div>

                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white rounded-full shadow-sm shrink-0 mr-4 md:mr-6 z-10">
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="flex-1 z-10">
                    <h3 className="text-lg md:text-2xl font-bold text-slate-800 line-clamp-1">
                      {student.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs md:text-sm font-bold opacity-70">
                        Absen: {student.absen}
                      </span>
                      {student.assessments.length > 0 && (
                        <span className="text-[10px] md:text-xs bg-white/50 px-2 py-0.5 rounded-full font-semibold text-[#315588]">
                          {student.assessments.length} Misi Selesai
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right z-10 ml-4">
                    <div className="text-sm font-bold opacity-70 mb-1">Total Nilai</div>
                    <div className="text-3xl md:text-4xl font-black font-mono tracking-tight drop-shadow-sm">
                      {student.totalScore}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
