import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Trash2, Factory, TreePine, Droplets, Play, Pause, RotateCcw, Mic, Square, Check, Home, ChevronLeft, Volume2, ArrowRight, ClipboardList, LogOut } from 'lucide-react';
import { topics } from './data';
import LandingPage from './LandingPage';
import RegistrationView from './RegistrationView';
import ClosingView from './ClosingView';
import TeacherView from './TeacherView';
import RubricPage from './RubricPage';
import { saveAssessment } from './db';

const iconMap = {
  Waves,
  Trash2,
  Factory,
  TreePine,
  Droplets
};

// Main App Component
export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'register', 'rubric', 'home', 'story', 'answer', 'closing', 'teacher'
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('ecoTalkProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const navigateTo = (newView, topic = null) => {
    if (topic) setSelectedTopic(topic);
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('ecoTalkProgress');
    setProgress({});
    setStudentInfo(null);
    navigateTo('landing');
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
      localStorage.setItem('ecoTalkProgress', JSON.stringify(nextProgress));
      return nextProgress;
    });
  };


  // If in Teacher View, don't show the regular app shell
  if (view === 'teacher') {
    return (
      <div className="relative">
        <button 
          onClick={() => navigateTo('home')}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-50 text-slate-500 hover:text-slate-800"
        >
          <Home className="w-6 h-6" />
        </button>
        <TeacherView onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <LandingPage key="landing" onStart={() => navigateTo('register')} />
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen pb-12 bg-[#e0f2fe]"
        >
          {/* Header */}
          <header className="py-6 px-4 md:px-8 flex items-center justify-center relative z-20">
            {view !== 'register' && view !== 'closing' && view !== 'rubric' && (
              <button 
                onClick={() => {
                  window.speechSynthesis.cancel();
                  if (view === 'answer') {
                    navigateTo('story', selectedTopic);
                  } else if (view === 'story') {
                    navigateTo('home');
                  } else if (view === 'home') {
                    navigateTo('rubric');
                  } else {
                    navigateTo('landing');
                  }
                }}
                className="absolute left-4 md:left-8 p-2 rounded-full hover:bg-slate-200/50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-slate-500" />
              </button>
            )}
            
            {(view === 'story' || view === 'answer') && (
              <button 
                onClick={() => {
                  window.speechSynthesis.cancel();
                  navigateTo('home');
                }}
                className="absolute right-4 md:right-8 p-2 rounded-full hover:bg-slate-200/50 transition-colors"
              >
                <Home className="w-6 h-6 text-slate-500" />
              </button>
            )}

            {view === 'home' && (
              <div className="absolute right-4 md:right-8 flex items-center gap-2">
                <button 
                  onClick={() => navigateTo('teacher')}
                  className="p-2 rounded-full hover:bg-slate-200/50 transition-colors flex flex-col items-center group relative"
                >
                  <ClipboardList className="w-6 h-6 text-[#315588]" />
                  <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">Penilaian</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-50 transition-colors flex flex-col items-center group relative"
                >
                  <LogOut className="w-6 h-6 text-red-500" />
                  <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">Keluar</span>
                </button>
              </div>
            )}

        {view !== 'rubric' && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center flex flex-col items-center"
          >
            <h1 
              className="text-5xl md:text-7xl tracking-widest mb-2 uppercase"
              style={{ 
                fontFamily: '"Kent", sans-serif',
                color: "#315588",
                WebkitTextStroke: "6px #94a3b8",
                paintOrder: "stroke fill"
              }} >
              Eco Talk
            </h1>
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
                navigateTo('rubric');
              }} 
            />
          )}
          {view === 'rubric' && (
            <RubricPage
              key="rubric"
              onNext={() => navigateTo('home')}
            />
          )}
          {view === 'home' && (
            <HomeView 
              key="home" 
              studentInfo={studentInfo}
              progress={progress} 
              onSelect={(topic) => navigateTo('story', topic)} 
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
                markProgress(selectedTopic.id, 'listened');
                navigateTo('answer');
              }}
            />
          )}
          {view === 'answer' && selectedTopic && (
            <VoiceAnswer 
              key="answer" 
              topic={selectedTopic} 
              studentInfo={studentInfo}
              onFinish={() => {
                markProgress(selectedTopic.id, 'answered');
                navigateTo('closing');
              }} 
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
function HomeView({ onSelect, progress, studentInfo }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-xl font-medium text-slate-600">
          Siap belajar, <span className="font-bold text-[#315588]">{studentInfo?.name || 'Sobat Bumi'}</span>?
        </h2>
        <p className="text-sm text-slate-400 mt-1">Pilih topik ajaib untuk memulai petualanganmu.</p>
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
                    {topicProgress.listened && (
                      <div className={`text-[10px] px-2 py-1 rounded-full flex items-center gap-1 ${topicProgress.answered ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                        {topicProgress.answered ? <Check className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                        Suara
                      </div>
                    )}
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
  const utteranceRef = useRef(null);
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
  
  const words = topic.material.text.split(' ').length;
  const estimatedSeconds = Math.max((words / 150) * 60, 5); 

  const createUtterance = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    const voices = window.speechSynthesis.getVoices();
    const idVoices = voices.filter(v => v.lang.startsWith('id'));
    if (idVoices.length > 0) {
      utterance.voice = idVoices.find(v => v.name.includes('Female') || v.name.includes('Google')) || idVoices[0];
    }
    // Set a fast reading rate so students don't get bored
    utterance.rate = 1.25;
    utterance.pitch = 1.1;
    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      setHasFinished(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (onComplete) onComplete();
    };
    return utterance;
  };

  useEffect(() => {
    if (topic.material.videoUrl) return;

    utteranceRef.current = createUtterance(topic.material.text);
    
    return () => {
      window.speechSynthesis.cancel();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [topic, onComplete]);

  useEffect(() => {
    if (topic.material.videoUrl || topic.material.localVideo) return;

    let startTime;
    let pausedTime = 0;
    let lastPauseStart = 0;

    const animateProgress = (timestamp) => {
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
        
        if (percent >= 99) percent = 99;
        setProgress(percent);
      }
      
      animFrameRef.current = requestAnimationFrame(animateProgress);
    };

    animFrameRef.current = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, estimatedSeconds, topic.material.videoUrl]);

  const togglePlay = () => {
    if (topic.material.videoUrl) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress > 0 && progress < 100 && !hasFinished) {
        if (hasSeekedRef.current) {
          window.speechSynthesis.speak(utteranceRef.current);
          hasSeekedRef.current = false;
        } else {
          window.speechSynthesis.resume();
        }
        if (videoRef.current) videoRef.current.play();
      } else {
        setProgress(0);
        window.speechSynthesis.cancel();
        
        utteranceRef.current = createUtterance(topic.material.text);
        window.speechSynthesis.speak(utteranceRef.current);
        
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

    window.speechSynthesis.cancel();
    setProgress(0);
    setIsPlaying(true);
    setHasFinished(false);
    hasSeekedRef.current = false;
    
    utteranceRef.current = createUtterance(topic.material.text);
    window.speechSynthesis.speak(utteranceRef.current);
    
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

    window.speechSynthesis.cancel();

    const wordsArray = topic.material.text.split(' ');
    const wordIndex = Math.floor(pos * wordsArray.length);
    const remainingText = wordsArray.slice(wordIndex).join(' ');

    utteranceRef.current = createUtterance(remainingText);

    if (isPlaying) {
      hasSeekedRef.current = false;
      window.speechSynthesis.speak(utteranceRef.current);
    }
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
                className="w-full h-full object-cover"
                playsInline
                muted
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    const ct = videoRef.current.currentTime;
                    const dur = videoRef.current.duration;
                    setCurrentTime(ct);
                    const percent = (ct / dur) * 100;
                    setProgress(percent || 0);
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    const dur = videoRef.current.duration;
                    setDuration(dur);
                    
                    if (topic.material.text) {
                      // Calculate how long the fast voice (rate 1.25) will take
                      const words = topic.material.text.split(' ').length;
                      const estStandardDuration = (words / 130) * 60;
                      const fastVoiceDuration = estStandardDuration / 1.25;
                      
                      // Speed up the video to match this fast voice duration
                      let requiredVideoRate = dur / fastVoiceDuration;
                      
                      // Clamp video speed to avoid browser errors
                      if (requiredVideoRate < 0.5) requiredVideoRate = 0.5;
                      if (requiredVideoRate > 4.0) requiredVideoRate = 4.0;
                      
                      videoRef.current.playbackRate = requiredVideoRate;
                    } else {
                      videoRef.current.playbackRate = 1.0;
                    }
                  }
                }}
                onEnded={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                  }
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
                <motion.div 
                  className="h-full bg-blue-500"
                  style={{ width: `${progress}%` }}
                  layout
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
      <div className="w-full md:w-[40%] p-6 md:p-8 flex flex-col justify-between bg-white">
        <div className="overflow-y-auto max-h-[40vh] md:max-h-[60vh] pr-4 custom-scrollbar">
          <p className="font-sans text-slate-800 leading-relaxed text-[15px] md:text-[16px] text-justify whitespace-pre-wrap">
            {topic.material.text}
          </p>
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
function VoiceAnswer({ topic, studentInfo, onFinish }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
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
    if (audioBlob) {
      await saveAssessment({
        studentId: studentInfo ? studentInfo.id : 'anonymous',
        topicId: topic.id,
        audioBlob,
        timestamp: Date.now(),
        score: null,
        graded: false
      });
    }
    onFinish();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-center max-w-2xl mx-auto"
    >
      <div className={`inline-flex p-4 rounded-full ${topic.color} opacity-80 mb-6`}>
        <Mic className={`w-8 h-8 ${topic.textColor}`} />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">Sekarang giliranmu!</h2>
      <p className="text-slate-500 mb-8">{topic.material.question}</p>

      {!audioUrl && (
        <div className="flex flex-col items-center justify-center space-y-6 my-8">
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
          className="my-8 space-y-6"
        >
          <div className="bg-slate-50 p-4 rounded-2xl">
            <audio src={audioUrl} controls className="w-full" />
          </div>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => {
                setAudioUrl(null);
                setAudioBlob(null);
              }}
              className="px-6 py-3 rounded-full text-slate-500 font-medium hover:bg-slate-100 transition-colors"
            >
              Rekam ulang
            </button>
            <button 
              onClick={handleFinish}
              className={`px-8 py-3 rounded-full text-slate-800 font-bold shadow-md hover:-translate-y-0.5 transition-transform ${topic.color} ${topic.shadow}`}
            >
              Simpan & Selesai ✨
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
