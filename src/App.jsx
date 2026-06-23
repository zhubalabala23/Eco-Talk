import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Trash2, Factory, TreePine, Droplets, Play, Pause, RotateCcw, Mic, Square, Check, Home, ChevronLeft, Volume2, ArrowRight, ClipboardList, LogOut, Menu, BookOpen, Trophy, Lock } from 'lucide-react';
import { topics } from './data';
import LandingPage from './LandingPage';
import RegistrationView from './RegistrationView';
import ClosingView from './ClosingView';
import TeacherView from './TeacherView';
import TeacherLoginView from './TeacherLoginView';
import RubricPage from './RubricPage';
import ObjectivesView from './ObjectivesView';
import GuideView from './GuideView';
import ScoreDashboardView from './ScoreDashboardView';
import { saveAssessment, getStudentAssessments, updateStudentProgress, getStudent } from './db';
import ceweAudio from './assets/images/cewe_audio.webp';
import bgGuide from './assets/images/background/background_guideview.webp';
import bgLanding from './assets/background_landingpage/background_landingpage.webp';
import bgRegistration from './assets/background_registration/background_registration.webp';
import bgObjectives from './assets/background_tujuan/background_tujuan_pembelajaran.webp';

const iconMap = {
  Waves,
  Trash2,
  Factory,
  TreePine,
  Droplets
};

// Main App Component
export default function App() {
  const [studentInfo, setStudentInfo] = useState(() => {
    const saved = sessionStorage.getItem('ecoTalkStudent');
    return saved ? JSON.parse(saved) : null;
  });
  const [view, setView] = useState(() => {
    const savedStudent = sessionStorage.getItem('ecoTalkStudent');
    const savedView = sessionStorage.getItem('ecoTalkView');
    
    // Always respect these views even if student is logged in
    if (savedView === 'landing' || savedView === 'teacher-login' || savedView === 'teacher' || savedView === 'dashboard') {
      return savedView;
    }
    
    if (savedStudent && savedView && savedView !== 'register') {
      return savedView;
    }
    return savedStudent ? 'home' : 'landing';
  });
  const [selectedTopic, setSelectedTopic] = useState(() => {
    const saved = sessionStorage.getItem('ecoTalkTopic');
    return saved ? JSON.parse(saved) : null;
  });
  const [progress, setProgress] = useState(() => {
    const saved = sessionStorage.getItem('ecoTalkProgress');
    return saved ? JSON.parse(saved) : {};
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const refreshStudentProgress = async (studentId) => {
    if (!studentId) return;
    try {
      const studentData = await getStudent(studentId);
      const studentProgress = studentData?.progress || {};

      const studentAssessments = await getStudentAssessments(studentId);
      const dbProgressMap = {};
      studentAssessments.forEach(a => {
        if (a.topicId) {
          dbProgressMap[a.topicId] = true;
        }
      });

      setProgress(prev => {
        const merged = {};
        
        // 1. Populate with persistent progress from Firestore student document
        Object.keys(studentProgress).forEach(topicId => {
          merged[topicId] = {
            listened: studentProgress[topicId]?.listened || false,
            answered: studentProgress[topicId]?.answered || false
          };
        });

        // 2. Merge current local prev progress
        Object.keys(prev).forEach(topicId => {
          merged[topicId] = {
            listened: merged[topicId]?.listened || prev[topicId]?.listened || false,
            answered: merged[topicId]?.answered || prev[topicId]?.answered || false
          };
        });

        // 3. Ensure answered flags from DB are always correct (if in DB, answered is true)
        Object.keys(dbProgressMap).forEach(topicId => {
          if (!merged[topicId]) {
            merged[topicId] = {
              listened: false,
              answered: true
            };
          } else {
            merged[topicId].answered = true;
          }
        });

        sessionStorage.setItem('ecoTalkProgress', JSON.stringify(merged));
        return merged;
      });
    } catch (err) {
      console.error("Error refreshing student progress:", err);
    }
  };

  useEffect(() => {
    if (studentInfo) {
      sessionStorage.setItem('ecoTalkStudent', JSON.stringify(studentInfo));
      refreshStudentProgress(studentInfo.id);
    } else {
      sessionStorage.removeItem('ecoTalkStudent');
    }
  }, [studentInfo]);

  useEffect(() => {
    // Preload heavy background WebP images to make view transitions instant
    const backgrounds = [bgLanding, bgRegistration, bgObjectives, bgGuide];
    backgrounds.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem('ecoTalkView', view);
  }, [view]);

  useEffect(() => {
    if (selectedTopic) {
      sessionStorage.setItem('ecoTalkTopic', JSON.stringify(selectedTopic));
    } else {
      sessionStorage.removeItem('ecoTalkTopic');
    }
  }, [selectedTopic]);

  const navigateTo = (newView, topic = null) => {
    if (topic) setSelectedTopic(topic);
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh student progress from DB when going back to home
    if (newView === 'home' && studentInfo?.id) {
      refreshStudentProgress(studentInfo.id);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      sessionStorage.removeItem('ecoTalkProgress');
      sessionStorage.removeItem('ecoTalkStudent');
      sessionStorage.removeItem('ecoTalkView');
      sessionStorage.removeItem('ecoTalkTopic');
      setProgress({});
      setStudentInfo(null);
      setSelectedTopic(null);
      navigateTo('landing');
    }
  };

  const markProgress = (topicId, type) => {
    setProgress(prev => {
      const nextProgress = {
        ...prev,
        [topicId]: {
          ...(prev[topicId] || {}),
          [type]: true
        }
      };
      sessionStorage.setItem('ecoTalkProgress', JSON.stringify(nextProgress));
      
      // Persist to Firestore student document
      if (studentInfo?.id) {
        updateStudentProgress(studentInfo.id, nextProgress).catch(err => {
          console.error("Failed to sync progress to Firestore:", err);
        });
      }
      
      return nextProgress;
    });
  };


  // If in Teacher Login View
  if (view === 'teacher-login') {
    return (
      <TeacherLoginView 
        onLogin={() => navigateTo('teacher')} 
        onBack={() => navigateTo('landing')} 
      />
    );
  }

  // If in Teacher View, don't show the regular app shell
  if (view === 'teacher') {
    return (
      <div className="relative">
        <TeacherView onLogout={handleLogout} onHome={() => navigateTo('home')} />
      </div>
    );
  }

  // If in Dashboard View, don't show the regular app shell
  if (view === 'dashboard') {
    return (
      <ScoreDashboardView onBack={() => navigateTo(studentInfo ? 'home' : 'landing')} />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <LandingPage 
          key="landing" 
          onStudentStart={() => navigateTo('register')} 
          onTeacherStart={() => navigateTo('teacher-login')} 
          onScoreDashboard={() => navigateTo('dashboard')}
        />
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen pb-12 relative overflow-hidden"
        >
          {/* Background Image reused from Guide */}
          <div 
            className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${bgGuide})`, zIndex: 0 }}
          />

          {/* Header */}
          <header className="py-6 px-4 md:px-8 flex items-center justify-center relative z-20">
            {view !== 'register' && view !== 'closing' && view !== 'rubric' && view !== 'objectives' && view !== 'landing' && view !== 'guide' && (
              <button 
                onClick={() => {
                  if (view === 'answer') {
                    navigateTo('story', selectedTopic);
                  } else if (view === 'story') {
                    navigateTo('rubric');
                  } else if (view === 'rubric') {
                    navigateTo('home');
                  } else if (view === 'home') {
                    navigateTo('guide');
                  } else if (view === 'guide') {
                    navigateTo('landing');
                  } else if (view === 'objectives') {
                    navigateTo('home');
                  } else {
                    navigateTo('landing');
                  }
                }}
                className="absolute left-4 md:left-8 p-2 md:p-3 rounded-full bg-[#315588] hover:bg-[#233f66] text-white shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center z-50"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={3} />
              </button>
            )}
            
            {(view === 'story' || view === 'answer') && (
              <button 
                onClick={() => {
                  navigateTo('home');
                }}
                className="absolute right-4 md:right-8 p-2 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors z-50"
              >
                <Home className="w-6 h-6 text-slate-500" />
              </button>
            )}

            {view === 'home' && (
              <div className="absolute right-4 md:right-8 flex items-center gap-2">
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <Menu className="w-6 h-6 text-slate-500" />
                </button>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                  <div className="absolute top-12 right-0 bg-white shadow-xl border border-slate-100 rounded-xl p-2 flex flex-col gap-1 md:hidden">
                    <button 
                      onClick={() => { navigateTo('dashboard'); setIsMenuOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-yellow-600 hover:bg-yellow-50 rounded-lg whitespace-nowrap"
                    >
                      <Trophy className="w-4 h-4" />
                      Klasemen
                    </button>
                    <button 
                      onClick={() => { navigateTo('objectives'); setIsMenuOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg whitespace-nowrap"
                    >
                      <BookOpen className="w-4 h-4" />
                      Tujuan Pembelajaran
                    </button>
                    <button 
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg whitespace-nowrap"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </div>
                )}

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-2">
                  <button 
                    onClick={() => navigateTo('dashboard')}
                    className="p-2 rounded-full bg-white shadow-sm hover:bg-yellow-50 transition-colors flex flex-col items-center group relative"
                  >
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <span className="text-[10px] text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">Klasemen</span>
                  </button>
                  <button 
                    onClick={() => navigateTo('objectives')}
                    className="p-2 rounded-full bg-white shadow-sm hover:bg-green-50 transition-colors flex flex-col items-center group relative"
                  >
                    <BookOpen className="w-6 h-6 text-green-500" />
                    <span className="text-[10px] text-green-600 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">Tujuan Pembelajaran</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-white shadow-sm hover:bg-red-50 transition-colors flex flex-col items-center group relative"
                  >
                    <LogOut className="w-6 h-6 text-red-500" />
                    <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">Keluar</span>
                  </button>
                </div>
              </div>
            )}

        {view !== 'rubric' && view !== 'guide' && view !== 'objectives' && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center flex flex-col items-center"
          >
            <motion.h1 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl md:text-7xl tracking-widest mb-2 uppercase"
              style={{ 
                fontFamily: '"Kent", sans-serif',
                color: "#315588",
                WebkitTextStroke: "6px #94a3b8",
                paintOrder: "stroke fill"
              }} >
              Eco Talk
            </motion.h1>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider">
              MENCARI SEBAB AKIBAT DENGAN ALAM...
            </p>
          </motion.div>
        )}
      </header>

      <main className="w-full max-w-md mx-auto px-4 md:max-w-[90%] lg:max-w-[95%] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'register' && (
            <RegistrationView 
              key="register" 
              onComplete={(student) => {
                setStudentInfo(student);
                navigateTo('guide');
              }}
              onBack={() => navigateTo('landing')}
            />
          )}
          {view === 'guide' && (
            <GuideView
              key="guide"
              onNext={() => navigateTo('home')}
            />
          )}
          {view === 'objectives' && (
            <ObjectivesView
              key="objectives"
              onNext={() => navigateTo('home')}
              onBack={() => navigateTo('home')}
            />
          )}
          {view === 'rubric' && (
            <RubricPage
              key="rubric"
              onNext={() => navigateTo('story', selectedTopic)}
              onBack={() => navigateTo('home')}
            />
          )}

          {view === 'home' && (
            <HomeView 
              key="home" 
              studentInfo={studentInfo}
              progress={progress} 
              onSelect={(topic) => navigateTo('rubric', topic)} 
              onScoreDashboard={() => navigateTo('dashboard')}
            />
          )}
          {view === 'story' && selectedTopic && (
            <StoryPlayer 
              key="story" 
              topic={selectedTopic} 
              onComplete={() => {
                markProgress(selectedTopic.id, 'listened');
              }}
              onNext={() => {
                navigateTo('answer');
              }}
            />
          )}
          {view === 'answer' && selectedTopic && (
            <VoiceAnswer 
              key="answer" 
              topic={selectedTopic} 
              studentInfo={studentInfo}
              hasSubmitted={!!progress[selectedTopic.id]?.answered}
              onFinish={() => {
                markProgress(selectedTopic.id, 'answered');
                navigateTo('closing');
              }} 
              onHome={() => navigateTo('home')}
            />
          )}
          {view === 'closing' && (
            <ClosingView 
              key="closing"
              studentInfo={studentInfo}
              topic={selectedTopic}
              onHome={() => navigateTo('home')}
            />
          )}
        </AnimatePresence>
      </main>
    </motion.div>
    )}
    </AnimatePresence>
  );
}

// 1. Home View / Material Picker
function HomeView({ onSelect, progress, studentInfo, onScoreDashboard }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-xl font-medium text-slate-700 mb-2">
          Siap belajar, <span className="font-bold text-[#315588]">{studentInfo?.name || 'Sobat Bumi'}</span>?
        </h2>
        <div className="inline-block bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600 font-semibold">Pilih topik ajaib untuk memulai petualanganmu.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => {
          const IconComponent = iconMap[topic.iconName];
          const topicProgress = progress[topic.id] || {};
          
          return (
            <motion.div
              key={topic.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(topic)}
              className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer bg-white ${topic.shadow} shadow-lg border border-slate-100 transition-all`}
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${topic.color} opacity-20`} />
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className={`p-4 rounded-2xl ${topic.color} ${topic.textColor} shadow-sm`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${topic.textColor}`}>{topic.title}</h3>
                  
                  {/* Progress Indicators */}
                  <div className="flex space-x-2 mt-2">
                    <div className={`text-[10px] px-2 py-1 rounded-full flex items-center gap-1 ${topicProgress.listened ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                      {topicProgress.listened ? <Check className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      Materi
                    </div>
                    <div className={`text-[10px] px-2 py-1 rounded-full flex items-center gap-1 ${topicProgress.answered ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                      {topicProgress.answered ? <Check className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                      Suara
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// 2. Story / Material Player
function StoryPlayer({ topic, onComplete, onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [hasFinished, setHasFinished] = useState(false);
  const animFrameRef = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const hasSeekedRef = useRef(false);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const paragraphs = topic.material.text.split('\n').filter(p => p.trim().length > 0);
  const words = paragraphs.flatMap(p => p.split(/\s+/).filter(w => w.length > 0));
  const estimatedSeconds = Math.max((words.length / 2.5), 5); // Rough estimate of 2.5 words per second

  // Calculate timing for each word based on total duration using Natural Speech Pacing
  const wordTimings = React.useMemo(() => {
    const totalTime = duration || estimatedSeconds;
    if (!totalTime || !paragraphs.length) return [];
    
    // Calculate weights to simulate natural human dictation speed and intonation
    const wordsWithData = [];
    paragraphs.forEach((p, pIdx) => {
      const pWords = p.split(/\s+/).filter(w => w.length > 0);
      pWords.forEach((word, wIdx) => {
        const isLastWordInParagraph = wIdx === pWords.length - 1;
        
        // Clean word to get actual character length
        const textLength = word.replace(/[^a-zA-Z0-9]/g, '').length;
        const weight = Math.max(textLength, 2); 
        
        // Determine pauses after the word based on punctuation
        let pauseAfter = 0;
        if (isLastWordInParagraph) {
          pauseAfter = 30; // Jeda panjang untuk akhir paragraf
        } else if (word.endsWith(',')) {
          pauseAfter = 5; // Jeda untuk koma
        } else if (/[.?!]$/.test(word)) {
          pauseAfter = 12; // Jeda normal untuk akhir kalimat (titik)
        }
        
        wordsWithData.push({ word, weight, pauseAfter, isLastWordInParagraph });
      });
    });
    
    const totalWeight = wordsWithData.reduce((acc, curr) => acc + curr.weight + curr.pauseAfter, 0);
    
    // Provide a buffer for video intro/outro (e.g., logo, music)
    const introDelay = totalTime > 15 ? 1.0 : (totalTime > 5 ? 0.5 : 0);
    const outroDelay = totalTime > 15 ? 1.5 : 0;
    const activeTime = Math.max(totalTime - introDelay - outroDelay, 5);
    
    const timings = [];
    let currentT = introDelay;
    
    wordsWithData.forEach((data, index) => {
      const speakDuration = (data.weight / totalWeight) * activeTime;
      const pauseDuration = (data.pauseAfter / totalWeight) * activeTime;
      
      timings.push({
        word: data.word,
        start: currentT,
        end: currentT + speakDuration, // Exact time word is spoken
        chunkEnd: currentT + speakDuration + pauseDuration,
        isLastWordInParagraph: data.isLastWordInParagraph,
        index
      });
      
      currentT += (speakDuration + pauseDuration);
    });
    
    return timings;
  }, [duration, words, estimatedSeconds]);

  // Group words into subtitle chunks by paragraph
  const subtitleChunks = React.useMemo(() => {
    if (!wordTimings.length) return [];
    const totalTime = duration || estimatedSeconds;
    const result = [];
    let currentChunk = [];
    
    wordTimings.forEach((wt) => {
      currentChunk.push(wt);
      
      // Create a new chunk at the end of each paragraph
      if (wt.isLastWordInParagraph || wt.index === wordTimings.length - 1) {
        // Find the start of the next chunk for a smooth transition
        const nextWordStart = wt.index < wordTimings.length - 1 ? wordTimings[wt.index + 1].start : totalTime;
        
        result.push({
          words: currentChunk,
          start: currentChunk[0].start,
          end: Math.max(currentChunk[0].start + 0.5, nextWordStart - 0.3), // Beri jeda kosong 0.3 detik sebelum paragraf baru muncul
          id: `chunk-${result.length}`
        });
        currentChunk = [];
      }
    });
    return result;
  }, [wordTimings, duration, estimatedSeconds]);

  // Find the active chunk based on currentTime
  const activeChunkIndex = subtitleChunks.findIndex(
    chunk => currentTime >= chunk.start && currentTime <= chunk.end
  );
  const activeChunk = activeChunkIndex !== -1 ? subtitleChunks[activeChunkIndex] : (currentTime < (subtitleChunks[0]?.start || 0) ? subtitleChunks[0] : null);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [topic, onComplete]);

  useEffect(() => {
    if (topic.material.videoUrl || topic.material.localVideo) return;

    let startTime;
    let pausedTime = 0;
    let lastPauseStart = 0;

    const animateProgress = (timestamp) => {
      if (topic.material.videoUrl || topic.material.localVideo) return; // Safety check inside closure
      if (!startTime) startTime = timestamp;
      
      if (!isPlaying) {
        lastPauseStart = timestamp;
      } else {
        if (lastPauseStart > 0) {
          pausedTime += (timestamp - lastPauseStart);
          lastPauseStart = 0;
        }
        
        const elapsed = (timestamp - startTime - pausedTime) / 1000;
        let percent = (elapsed / estimatedSeconds) * 100;
        
        if (percent >= 100) {
          percent = 100;
          setProgress(percent);
          setIsPlaying(false);
          setHasFinished(true);
          if (onComplete) onComplete();
          return;
        }
        setProgress(percent);
      }
      
      animFrameRef.current = requestAnimationFrame(animateProgress);
    };

    animFrameRef.current = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, estimatedSeconds, topic.material.videoUrl, topic.material.localVideo, onComplete]);

  const togglePlay = () => {
    if (topic.material.videoUrl) return;

    if (isPlaying) {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress > 0 && progress < 100 && !hasFinished) {
        if (videoRef.current) videoRef.current.play();
      } else {
        setProgress(0);
        
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
        setHasFinished(false);
        hasSeekedRef.current = false;
      }
      setIsPlaying(true);
    }
  };

  const replay = () => {
    if (topic.material.videoUrl) return;

    setProgress(0);
    setIsPlaying(true);
    setHasFinished(false);
    hasSeekedRef.current = false;
    
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleSeek = (e) => {
    if (!topic.material.localVideo || !videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(pos * 100);
    setHasFinished(false);
    hasSeekedRef.current = true;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row w-full"
    >
      {/* Left Column: Video & Controls */}
      <div className="w-full md:w-[60%] flex flex-col bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-8">
        <div className="relative aspect-[16/9] w-full bg-slate-200 rounded-xl overflow-hidden mb-6 border border-slate-200/50 shadow-inner">
          {topic.material.videoUrl ? (
            <iframe 
              src={topic.material.videoUrl} 
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; microphone" 
              title={topic.title}
            />
          ) : topic.material.localVideo ? (
            <>
              <video
                ref={videoRef}
                src={topic.material.localVideo}
                poster={topic.material.localVideo.replace('.mp4', '.jpg')}
                className="w-full h-full object-cover bg-slate-200"
                playsInline
                preload="auto"
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    const ct = videoRef.current.currentTime;
                    setCurrentTime(ct);
                    let dur = videoRef.current.duration;
                    if (!dur || isNaN(dur) || dur === Infinity) {
                      dur = estimatedSeconds || 1; // Fallback to avoid NaN bounce
                    }
                    const percent = (ct / dur) * 100;
                    setProgress(percent || 0);
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    let dur = videoRef.current.duration;
                    if (!dur || isNaN(dur) || dur === Infinity) {
                      dur = estimatedSeconds;
                    }
                    setDuration(dur);
                    videoRef.current.playbackRate = 1.0;
                  }
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setProgress(100);
                  setHasFinished(true);
                  if (videoRef.current) {
                    videoRef.current.pause();
                  }
                  if (onComplete) onComplete();
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <h2 className="absolute bottom-4 left-4 right-4 text-white text-2xl font-bold drop-shadow-md pointer-events-none">
                {topic.title}
              </h2>
            </>
          ) : (
            <>
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: isPlaying ? 1.05 : 1 }}
                transition={{ duration: estimatedSeconds, ease: "linear" }}
                src={topic.material.image} 
                alt={topic.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <h2 className="absolute bottom-4 left-4 right-4 text-white text-2xl font-bold drop-shadow-md pointer-events-none">
                {topic.title}
              </h2>
            </>
          )}
        </div>

        {!topic.material.videoUrl && (
          <div className="mt-auto">
            {/* Scrubber */}
            <div 
              className="mb-4 relative h-4 flex items-center cursor-pointer group"
              onClick={handleSeek}
            >
              <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-blue-500 transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div 
                className="absolute w-3 h-3 bg-[#315588] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            {/* Audio Controls (Left Aligned as in Sketch) */}
            <div className="flex items-center gap-4 justify-start">
              <button 
                onClick={replay}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors border-2 border-transparent hover:border-slate-300"
              >
                <RotateCcw className="w-8 h-8" />
              </button>

              <button 
                onClick={togglePlay}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors border-2 border-transparent hover:border-slate-300"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
              </button>

              {topic.material.localVideo && (
                <div className="text-sm font-medium text-slate-600 font-mono ml-2 mt-1">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Text & Next Button */}
      <div className="w-full md:w-[40%] p-6 md:p-8 flex flex-col justify-between bg-white relative">
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeChunk && (
              <motion.div
                key={activeChunk.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center w-full max-h-full overflow-y-auto"
              >
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 md:gap-y-3 pb-2">
                  {activeChunk.words.map((wt, i) => {
                    return (
                      <span
                        key={i}
                        className="text-lg md:text-xl lg:text-2xl font-bold px-1 rounded-lg text-[#315588]"
                      >
                        {wt.word}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end pt-6 mt-4 border-t border-slate-100">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="flex items-center text-sm font-bold text-[#315588] bg-blue-50 px-5 py-2.5 rounded-full hover:bg-blue-100 transition-colors shadow-sm"
          >
            Lanjut Rekam Suara <ArrowRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// 3. Voice Answer / Reflection Mode
function VoiceAnswer({ topic, studentInfo, onFinish, onHome, hasSubmitted }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        chunksRef.current = [];
        
        stream.getTracks().forEach(track => track.stop());
      };

      chunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioUrl(null);
      setAudioBlob(null);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Please allow microphone access to record your answer!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFinish = async () => {
    if (isSaving) return;
    setIsSaving(true);
    if (audioBlob) {
      try {
        await saveAssessment({
          studentId: studentInfo ? studentInfo.id : 'anonymous',
          topicId: topic.id,
          audioBlob,
          timestamp: Date.now(),
          score: null,
          graded: false
        });
      } catch (err) {
        console.error(err);
        alert(err.message || "Gagal menyimpan rekaman. Silakan coba lagi.");
        setIsSaving(false);
        return;
      }
    }
    onFinish();
  };

  if (hasSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-center max-w-2xl mx-auto relative overflow-visible"
      >
        <div className={`inline-flex p-4 rounded-full bg-yellow-100 mb-6 relative z-10`}>
          <Lock className={`w-8 h-8 text-yellow-600`} />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">Sudah Terisi! 🌟</h2>
        <p className="text-slate-600 mb-6 relative z-10 leading-relaxed">
          Kamu sudah mengumpulkan rekaman suara untuk topik <strong>{topic.title}</strong>.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-left text-amber-800 text-sm">
          <p className="font-semibold mb-1">Suara sudah terisi!</p>
          Minta Bapak/Ibu Guru untuk menghapus data penilaian lamamu terlebih dahulu di halaman guru. Setelah dihapus, kamu bisa merekam kembali jawaban terbaikmu di sini!
        </div>

        <div className="flex justify-center gap-4 relative z-10">
          <button 
            onClick={onHome}
            className={`px-8 py-3 rounded-full text-slate-800 font-bold shadow-md hover:-translate-y-0.5 transition-transform ${topic.color} ${topic.shadow}`}
          >
            Kembali ke Menu Utama
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-center max-w-2xl mx-auto relative overflow-visible"
    >
      <div className={`inline-flex p-4 rounded-full ${topic.color} opacity-80 mb-6 relative z-10`}>
        <Mic className={`w-8 h-8 ${topic.textColor}`} />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">Sekarang giliranmu!</h2>
      <p className="text-slate-500 mb-8 relative z-10">{topic.material.question}</p>

      {!audioUrl && (
        <div className="flex flex-col items-center justify-center space-y-6 my-8 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            className={`relative p-8 rounded-full shadow-lg text-white transition-colors ${
              isRecording 
                ? 'bg-red-400 shadow-red-400/50' 
                : `${topic.color} ${topic.shadow}`
            }`}
          >
            {isRecording ? (
              <Square className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-slate-800" />
            )}
            
            {/* Pulse effect when recording */}
            {isRecording && (
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-red-400 rounded-full -z-10"
              />
            )}
          </motion.button>
          
          <p className={`font-medium ${isRecording ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
            {isRecording ? 'Merekam suara ajaibmu...' : 'Ketuk untuk merekam jawaban'}
          </p>
        </div>
      )}

      {audioUrl && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-8 space-y-6 relative z-10"
        >
          <div className="bg-slate-50 p-4 rounded-2xl">
            <audio src={audioUrl} controls className="w-full" />
          </div>
          
          <div className="flex justify-center gap-4">
            <button 
              disabled={isSaving}
              onClick={() => {
                setAudioUrl(null);
                setAudioBlob(null);
              }}
              className="px-6 py-3 rounded-full text-slate-500 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Rekam ulang
            </button>
            <button 
              onClick={handleFinish}
              disabled={isSaving}
              className={`px-8 py-3 rounded-full text-slate-800 font-bold shadow-md hover:-translate-y-0.5 transition-transform ${topic.color} ${topic.shadow} ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? 'Menyimpan...' : 'Simpan & Selesai ✨'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Image positioned ON the card (overlapping) */}
      <motion.img 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        src={ceweAudio} 
        alt="Audio Instructor" 
        className="absolute right-0 bottom-0 w-[140px] md:w-[220px] object-contain drop-shadow-xl pointer-events-none z-0 hidden sm:block"
      />
    </motion.div>
  );
}
