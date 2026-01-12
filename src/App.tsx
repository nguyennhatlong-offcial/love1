import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Nếu em có file code Vũ trụ (ví dụ Universe.tsx), hãy import vào đây.
// import Universe from './Universe'; 

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // --- XỬ LÝ PHÁT NHẠC ---
    const playMusic = async () => {
      if (audioRef.current && !isAudioPlaying) {
        audioRef.current.volume = 0.5; // Âm lượng 50%
        try {
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch (err) {
          console.log("Trình duyệt chặn Autoplay. Đang chờ người dùng chạm vào màn hình...");
        }
      }
    };

    // 1. Thử phát ngay khi vào web
    playMusic();

    // 2. Nếu bị chặn, đợi người dùng chạm nhẹ bất kỳ đâu là phát luôn
    const handleInteraction = () => {
      playMusic();
      if (audioRef.current && !audioRef.current.paused) {
        // Nếu nhạc đã chạy thì gỡ bỏ sự kiện này cho nhẹ máy
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
      
      {/* --- 1. FILE NHẠC --- */}
      {/* Nhớ đảm bảo file music.mp3 nằm trong thư mục 'public' */}
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        autoPlay 
        loop 
        preload="auto" 
      />

      {/* --- 2. NỀN VŨ TRỤ / TRÁI TIM 3D --- */}
      <div className="absolute inset-0 z-0">
          
          {/* ======================================================== */}
          {/* DÁN CODE VŨ TRỤ HOẶC COMPONENT CỦA EM VÀO DƯỚI DÒNG NÀY */}
          
          {/* Ví dụ: <UniverseCanvas /> */}
           <div className="w-full h-full flex items-center justify-center">
              <p className="animate-pulse text-gray-500">
                (Chỗ này để hiển thị Vũ trụ/Trái tim của Lương)
              </p>
           </div>
          
          {/* ======================================================== */}

      </div>

      {/* --- 3. BỨC THƯ TỎ TÌNH --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }} // Hiện ra sau 1 giây
        className="absolute bottom-10 left-4 right-4 md:bottom-20 md:left-1/3 md:right-1/3 z-10 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 text-center shadow-[0_0_30px_rgba(236,72,153,0.3)]"
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

        <p 
          className="text-xs text-gray-400 mt-4 opacity-80"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          (Chạm nhẹ vào màn hình để nghe nhạc nhé)
        </p>
      </motion.div>

    </div>
  );
}
