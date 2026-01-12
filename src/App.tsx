import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- PHẦN 1: TẠO VŨ TRỤ (Giữ nguyên không đổi) ---
const UniverseBackground = () => {
  const stars = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-purple-900/20 to-black z-0"></div>
      
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full shadow-[0_0_10px_white]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Trái tim nền xoay nhẹ */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
         <motion.div 
           animate={{ rotate: 360, scale: [1, 1.1, 1] }}
           transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
           className="w-96 h-96 border border-pink-500/20 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(236,72,153,0.2)]"
         >
         </motion.div>
      </div>
    </div>
  );
};

// --- PHẦN 2: APP CHÍNH (Đã sửa bảng chữ to đùng) ---
export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current && !isAudioPlaying) {
        audioRef.current.volume = 0.5;
        try {
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch (err) {
          // Chờ tương tác
        }
      }
    };
    playMusic();
    const handleInteraction = () => {
      playMusic();
      if (audioRef.current && !audioRef.current.paused) {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      }
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isAudioPlaying]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      
      <audio ref={audioRef} src="/music.mp3" autoPlay loop preload="auto" />

      <div className="absolute inset-0 z-0">
         <UniverseBackground />
      </div>

      {/* --- BẢNG CHỮ TO ĐÙNG --- */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        // SỬA Ở ĐÂY: w-[95%] (rộng), max-w-6xl (cực đại), top-16 (đưa lên trên)
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-20 
                   p-10 md:p-14 
                   bg-black/30 backdrop-blur-xl rounded-3xl 
                   border border-pink-400/30 
                   text-center shadow-[0_0_50px_rgba(236,72,153,0.4)]"
      >
        <div className="mb-6 text-6xl animate-bounce">💖</div>
        
        <h1 
          // SỬA Ở ĐÂY: text-5xl (mobile) -> text-7xl (PC)
          className="text-5xl md:text-8xl font-bold mb-6 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Gửi cậu ✨
        </h1>
        
        <p 
          // SỬA Ở ĐÂY: text-2xl -> text-4xl
          className="text-2xl md:text-4xl text-gray-100 leading-relaxed font-medium"
          style={{ fontFamily: "'Dancing Script', cursive"
