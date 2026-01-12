import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- PHẦN 1: TẠO VŨ TRỤ / CÁC VÌ SAO (Đặt ở ngoài cùng) ---
const UniverseBackground = () => {
  // Tạo 60 ngôi sao ngẫu nhiên (như code cũ của em)
  const stars = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1, // Kích thước từ 1px đến 4px
    duration: Math.random() * 3 + 2, // Thời gian nhấp nháy
    delay: Math.random() * 2
  }));

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* Hiệu ứng mờ ảo (Nebula) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-purple-900/20 to-black z-0"></div>
      
      {/* Vẽ các ngôi sao */}
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
      
      {/* Trái tim xoay xoay ở giữa (Thêm vào cho đẹp) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
         <motion.div 
           animate={{ rotate: 360, scale: [1, 1.1, 1] }}
           transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
           className="w-64 h-64 border border-pink-500/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.3)]"
         >
            <div className="text-6xl">💖</div>
         </motion.div>
      </div>
    </div>
  );
};

// --- PHẦN 2: APP CHÍNH (Giao diện & Nhạc) ---
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
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* 1. FILE NHẠC */}
      <audio ref={audioRef} src="/music.mp3" autoPlay loop preload="auto" />

      {/* 2. HIỂN THỊ VŨ TRỤ (Gọi component đã tạo ở trên) */}
      <div className="absolute inset-0 z-0">
         <UniverseBackground />
      </div>

      {/* 3. BỨC THƯ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-10 left-4 right-4 md:bottom-20 md:left-1/3 md:right-1/3 z-20 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 text-center shadow-[0_0_30px_rgba(236,72,153,0.3)]"
      >
        <h1 
          className="text-4xl font-bold mb-3 text-pink-400 drop-shadow-lg"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Gửi cậu ✨
        </h1>
        <p 
          className="text-xl text-gray-100 leading-relaxed"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Vũ trụ bao la thế này,<br/>
          nhưng tớ chỉ nhìn thấy mỗi nụ cười của cậu thôi. ❤️
        </p>
        <p className="text-xs text-gray-400 mt-4 opacity-80" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          (Chạm nhẹ vào màn hình để nghe nhạc nhé)
        </p>
      </motion.div>
    </div>
  );
}
