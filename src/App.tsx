import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Stars, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- CẤU HÌNH ---
const YOUR_CRUSH_IMAGE = "https://i.ibb.co/whNW2ZGd/20200503-103535.jpg"; // Thay link ảnh crush
const MUSIC_URL = "https://files.catbox.moe/52jlxf.mp3"; // Nhạc nền

// Component tạo nền sao bay
const StarField = () => {
  // Tạo mảng 100 ngôi sao ngẫu nhiên
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            y: [0, -100, 0], // Sao trôi lên xuống nhẹ
            opacity: [0.2, 1, 0.2], // Lấp lánh
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Vị trí nút "Không"
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  // Xử lý phát nhạc
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Logic nút "Không" chạy trốn (Thông minh hơn)
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100; // Dịch chuyển trong khoảng -100px đến 100px
    const y = Math.random() * 200 - 100;
    setNoBtnPos({ x, y });
  };

  // Logic khi đồng ý
  const handleAccept = () => {
    setIsAccepted(true);
    // Bắn pháo hoa
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffa500', '#ffff00']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff00ff', '#00ffff', '#00ff00']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <audio ref={audioRef} src={MUSIC_URL} loop />
      
      {/* Nền sao */}
      <StarField />

      {/* Nút bật nhạc góc màn hình */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg"
      >
        <Music className={`w-6 h-6 ${isPlaying ? 'animate-spin-slow' : ''}`} />
      </button>

      <AnimatePresence mode='wait'>
        {!isAccepted ? (
          <motion.div
            key="question-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-md w-full"
          >
            {/* THẺ GLASSMORPHISM */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-purple-500/20 text-center relative overflow-hidden">
              {/* Hiệu ứng Glow phía sau ảnh */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500 rounded-full blur-[50px] opacity-50"></div>

              {/* Avatar xoay */}
              <div className="relative mb-6 inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900">
                    <img src={YOUR_CRUSH_IMAGE} alt="Crush" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
                <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-2 rounded-full border-4 border-slate-800">
                  <Heart size={20} fill="currentColor" />
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Gửi cậu...
              </h1>
              
              <p className="text-lg text-slate-200 mb-8 leading-relaxed">
                Vũ trụ này rộng lớn lắm,<br/> 
                nhưng tớ chỉ tìm thấy một ngôi sao sáng nhất.<br/>
                <span className="font-bold text-pink-400">Làm người yêu tớ nhé?</span>
              </p>

              {/* Khu vực nút bấm */}
              <div className="flex justify-center items-center gap-6 h-16 relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-bold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all flex items-center gap-2"
                >
                  <Heart size={18} fill="currentColor" /> Đồng ý
                </motion.button>

                {/* Nút KHÔNG với Framer Motion */}
                <motion.button
                  animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                  onHoverStart={moveNoButton} // PC
                  onTouchStart={moveNoButton} // Mobile
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="px-8 py-3 bg-slate-700/50 backdrop-blur-sm border border-white/10 rounded-full font-semibold text-slate-300 hover:bg-slate-700 transition-colors absolute"
                >
                  Không
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* MÀN HÌNH THÀNH CÔNG */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 text-center"
          >
            <div className="mb-6 relative inline-block">
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ repeat: Infinity, duration: 2 }}
               >
                 <Rocket size={80} className="text-purple-400" />
               </motion.div>
               <motion.div
                 className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-10 h-20 bg-gradient-to-b from-orange-500 to-transparent blur-md opacity-80"
                 animate={{ height: [40, 60, 40] }}
                 transition={{ repeat: Infinity, duration: 0.5 }}
               />
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Hehe, biết ngay mà! ❤️
            </h2>
            <p className="text-xl text-purple-200">Chuẩn bị đi, tối nay tớ qua đón!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
