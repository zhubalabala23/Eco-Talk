import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAssessments, updateAssessment, getStudents, deleteAssessment, deleteStudentAndAssessments } from '../db';
import { Play, Pause, CheckCircle2, ChevronRight, Save, LogOut, Trash2, ChevronLeft, Home } from 'lucide-react';
import { topics } from '../data';

export default function TeacherView({ onLogout, onHome }) {
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState({});
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [criteria, setCriteria] = useState({
    c1: false, // Saya sudah menjelaskan penyebab peristiwa
    c2: false, // Saya sudah menjelaskan akibat peristiwa
    c3: false, // Saya berbicara dengan suara yang jelas
    c4: false, // Saya berbicara dengan lancar
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getAssessments();
    const studentsData = await getStudents();
    
    const studentMap = {};
    studentsData.forEach(s => {
      studentMap[s.id] = s;
    });
    setStudents(studentMap);
    setAssessments(data);
  };

  const handleSelect = (assessment) => {
    setSelectedAssessment(assessment);
    setCriteria(assessment.criteria || {
      c1: false, c2: false, c3: false, c4: false
    });
  };

  const handleCheckboxChange = (key) => {
    setCriteria(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateScore = () => {
    let score = 0;
    if (criteria.c1) score += 25;
    if (criteria.c2) score += 25;
    if (criteria.c3) score += 25;
    if (criteria.c4) score += 25;
    return score;
  };

  const saveScore = async () => {
    if (!selectedAssessment) return;
    const score = calculateScore();
    const updated = {
      ...selectedAssessment,
      criteria,
      score,
      graded: true
    };
    await updateAssessment(updated);
    alert('Nilai berhasil disimpan!');
    loadData();
    setSelectedAssessment(updated); // Refresh current view
  };

  const handleDelete = async () => {
    if (!selectedAssessment) return;
    const student = students[selectedAssessment.studentId];
    const studentName = student ? student.name : 'Siswa';
    const confirmDelete = window.confirm(
      student 
        ? `Apakah Anda yakin ingin menghapus data penilaian dan mereset data siswa "${studentName}"? Siswa akan dapat mengisi kembali nama dan nomor absen mereka.`
        : "Apakah Anda yakin ingin menghapus data penilaian ini?"
    );
    if (confirmDelete) {
      if (selectedAssessment.studentId && selectedAssessment.studentId !== 'anonymous') {
        await deleteStudentAndAssessments(selectedAssessment.studentId);
      } else {
        await deleteAssessment(selectedAssessment.id);
      }
      setSelectedAssessment(null);
      loadData();
    }
  };

  const getTopicName = (id) => {
    const t = topics.find(topic => topic.id === id);
    return t ? t.title : id;
  };

  return (
    <div className="flex h-screen bg-[#e0f2fe] text-slate-800">
      {/* Sidebar */}
      <div className={`${selectedAssessment ? 'hidden md:block' : 'block'} w-full md:w-1/3 lg:w-80 border-r border-slate-200 bg-white overflow-y-auto flex-shrink-0`}>
        <div className="p-3 md:p-4 bg-[#315588] text-white sticky top-0 z-10 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold truncate">Daftar Penilaian</h2>
          </div>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-xs md:text-sm font-bold transition-colors shadow-sm flex-shrink-0"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
        <div className="divide-y divide-slate-100">
          {assessments.length === 0 && (
            <p className="p-4 text-slate-500 text-center">Belum ada rekaman.</p>
          )}
          {assessments.map(item => {
            const student = students[item.studentId];
            const isSelected = selectedAssessment?.id === item.id;
            return (
              <div 
                key={item.id} 
                onClick={() => handleSelect(item)}
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-[#315588]' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800">
                      {student ? `${student.name} (Absen: ${student.absen})` : 'Anonim'}
                    </h3>
                    <p className="text-sm text-slate-500">Topik: {getTopicName(item.topicId)}</p>
                  </div>
                  {item.graded && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      {item.score}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className={`${!selectedAssessment ? 'hidden md:block' : 'block'} flex-1 p-4 md:p-8 overflow-y-auto bg-[#e0f2fe]/50`}>
        
        {/* Top Action Bar (Aligned with Card) */}
        <div className="max-w-2xl mx-auto w-full flex justify-end mb-4">
        </div>

        {selectedAssessment ? (
          <div className="max-w-2xl mx-auto bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 md:gap-4 mb-6">
              <button 
                className="md:hidden p-2 rounded-full hover:bg-slate-100 flex-shrink-0" 
                onClick={() => setSelectedAssessment(null)}
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-[#315588]">Penilaian Siswa</h2>
            </div>
            
            <div className="bg-slate-100 p-4 rounded-xl mb-6 md:mb-8">
              <p className="text-sm text-slate-500 mb-2">Suara Siswa:</p>
              {selectedAssessment.audioBlob ? (
                <audio controls src={URL.createObjectURL(selectedAssessment.audioBlob)} className="w-full h-10 md:h-14" />
              ) : (
                <p className="text-red-500">Audio tidak tersedia.</p>
              )}
            </div>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <h3 className="font-bold text-slate-700 mb-2 md:mb-4">Indikator (25% per poin):</h3>
              <label className="flex items-start md:items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" checked={criteria.c1} onChange={() => handleCheckboxChange('c1')} className="mt-1 md:mt-0 w-5 h-5 text-[#315588] rounded border-slate-300 focus:ring-[#315588] flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-700">Saya sudah menjelaskan penyebab peristiwa</span>
              </label>
              <label className="flex items-start md:items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" checked={criteria.c2} onChange={() => handleCheckboxChange('c2')} className="mt-1 md:mt-0 w-5 h-5 text-[#315588] rounded border-slate-300 focus:ring-[#315588] flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-700">Saya sudah menjelaskan akibat peristiwa</span>
              </label>
              <label className="flex items-start md:items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" checked={criteria.c3} onChange={() => handleCheckboxChange('c3')} className="mt-1 md:mt-0 w-5 h-5 text-[#315588] rounded border-slate-300 focus:ring-[#315588] flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-700">Saya berbicara dengan suara yang jelas</span>
              </label>
              <label className="flex items-start md:items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" checked={criteria.c4} onChange={() => handleCheckboxChange('c4')} className="mt-1 md:mt-0 w-5 h-5 text-[#315588] rounded border-slate-300 focus:ring-[#315588] flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-700">Saya berbicara dengan lancar</span>
              </label>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-200 gap-4">
              <div className="text-lg md:text-xl font-bold w-full md:w-auto text-center md:text-left">
                Total Nilai: <span className="text-[#315588]">{calculateScore()}/100</span>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={handleDelete}
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-3 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors border border-red-200 md:border-none"
                >
                  <Trash2 className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">Hapus</span>
                </button>
                <button 
                  onClick={saveScore}
                  className="flex-[2] md:flex-none flex items-center justify-center px-4 md:px-6 py-3 bg-[#315588] text-white font-bold rounded-xl hover:bg-[#233f66] transition-colors"
                >
                  <Save className="w-5 h-5 mr-2" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            <p>Pilih rekaman siswa dari sidebar untuk memulai penilaian.</p>
          </div>
        )}
      </div>
    </div>
  );
}
