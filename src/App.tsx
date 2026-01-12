import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- COMPONENT NỀN VŨ TRỤ & HÀO QUANG ---
const UniverseBackground = () => {
  // Tạo sao ngẫu nhiên
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 4 + 2,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* Hào quang trung tâm màu hồng tím */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-700"></div>

      {/* Các vì sao lấp lánh */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.8)`
          }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// --- COMPONENT CHÍNH ---
export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Xử lý phát nhạc
  const handlePlayMusic = async () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        try {
          audioRef.current.volume = 0.6;
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch (err) {
          console.error("Không thể tự động phát nhạc:", err);
        }
      }
    }
  };

  return (
    // Container chính: Căn giữa mọi thứ
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden antialiased font-sans">
      
      {/* File nhạc (Nhớ thay file music.mp3 vào thư mục public) */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Nền vũ trụ */}
      <UniverseBackground />

      {/* Tấm thiệp kính mờ (The Confession Card) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={handlePlayMusic}
        className="relative z-10 w-[90%] max-w-2xl p-10 md:p-14
                   bg-white/5 backdrop-blur-[30px] 
                   border border-white/10 rounded-[40px]
                   shadow-[0_20px_60px_-15px_rgba(236,72,153,0.3)]
                   text-center cursor-pointer group
                   transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_30px_80px_-15px_rgba(236,72,153,0.5)]"
      >
        {/* Icon trái tim đập */}
        <div className="mb-8">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-5xl drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]"
          >
            💖
          </motion.div>
        </div>
        
        {/* Tiêu đề */}
        <h1 
          className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 drop-shadow-sm"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Gửi cậu ✨
        </h1>
        
        {/* Nội dung thư */}
        <div className="space-y-4 mb-10">
          <p 
            className="text-2xl md:text-3xl text-white/90 leading-relaxed font-medium drop-shadow-md"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            "Vũ trụ bao la thế này,<br />
            nhưng tớ chỉ nhìn thấy mỗi nụ cười của cậu thôi. 🥰"
          </p>
        </div>
        
        {/* Lời nhắn cuối */}
        <div className="text-sm md:text-base text-pink-200/70 tracking-widest uppercase font-semibold flex items-center justify-center gap-2 group-hover:text-pink-200 transition-colors">
          <span>(Chạm nhẹ để {isAudioPlaying ? 'dừng' : 'nghe'} nhạc)</span>
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
            🎵
          </motion.span>
        </div>
      </motion.div>
      
      {/* Credit nhỏ xíu ở dưới cùng */}
      <div className="absolute bottom-4 text-white/30 text-xs">Made with ❤️ by Lương. Inbox: <a href="https://www.facebook.com/phmducluong" target="_blank">Phạm Đức Lương</a> </div>
    </div>
  );
}
