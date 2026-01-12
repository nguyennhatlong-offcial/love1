import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Leaf, Flower2, Stars, Moon, Trees, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- CẤU HÌNH ẢNH & NHẠC ---
const YOUR_CRUSH_IMAGE = "https://i.ibb.co/whNW2ZGd/20200503-103535.jpg"; 
const MUSIC_URL = "https://files.catbox.moe/52jlxf.mp3"; 

// --- 1. BACKGROUND VŨ TRỤ (Particle Sao) ---
const UniverseBackground = () => {
  const stars = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
        />
      ))}
    </div>
  );
};

// --- 2. BACKGROUND THIÊN NHIÊN (Lá & Đom đóm) ---
const NatureBackground = () => {
  const items = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    type: Math.random() > 0.5 ? 'leaf' : 'firefly',
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.type === 'firefly' ? 'w-2 h-2 bg-yellow-400 blur-sm rounded-full' : 'text-emerald-300/40'}`}
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          animate={{ 
            y: [0, -100, 0], 
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            rotate: item.type === 'leaf' ? 360 : 0
          }}
          transition={{ duration: item.duration, repeat: Infinity, ease: "linear" }}
        >
          {item.type === 'leaf' && (Math.random() > 0.5 ? <Leaf size={20} /> : <Flower2 size={16} />)}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'universe' | 'nature'>('universe'); // Mặc định là Vũ trụ
  const [isAccepted, setIsAccepted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- LOGIC MÀU SẮC THEO THEME ---
  const colors = {
    universe: {
      bg: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black",
      cardBorder: "border-purple-500/30",
      glow: "bg-purple-500/40",
      textGradient: "from-pink-300 via-purple-300 to-indigo-300",
      btnPrimary: "from-pink-500 to-purple-600",
      btnSecondary: "border-purple-400/30 hover:bg-purple-500/20",
      shadow: "shadow-purple-500/20",
      iconColor: "text-purple-300"
    },
    nature: {
      bg: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-green-950 to-black",
      cardBorder: "border-emerald-500/30",
      glow: "bg-emerald-500/40",
      textGradient: "from-emerald-300 via-green-200 to-teal-300",
      btnPrimary: "from-emerald-500 to-green-600",
      btnSecondary: "border-emerald-400/30 hover:bg-emerald-500/20",
      shadow: "shadow-emerald-500/20",
      iconColor: "text-emerald-300"
    }
  };

  const currentTheme = colors[theme];

  // --- XỬ LÝ NHẠC ---
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener('click', startAudio, { once: true });
    return () => window.removeEventListener('click', startAudio);
  }, []);

  const handleDecision = (type: 'yes' | 'no') => {
    setIsAccepted(true);
    const colorList = theme === 'universe' 
      ? ['#a855f7', '#ec4899', '#6366f1'] // Tím hồng
      : ['#10b981', '#fbbf24', '#34d399']; // Xanh vàng
      
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colorList });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colorList });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} text-white flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-1000`}>
      <audio ref={audioRef} src={MUSIC_URL} loop />

      {/* RENDER BACKGROUND THEO THEME */}
      {theme === 'universe' ? <UniverseBackground /> : <NatureBackground />}

      {/* CỤM NÚT ĐIỀU KHIỂN GÓC PHẢI */}
      <div className="fixed top-5 right-5 z-50 flex gap-3">
        {/* Nút đổi Theme */}
        <button 
          onClick={() => setTheme(prev => prev === 'universe' ? 'nature' : 'universe')}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-all hover:scale-110"
        >
          {theme === 'universe' ? <Trees className="w-6 h-6 text-green-400" /> : <Moon className="w-6 h-6 text-purple-400" />}
        </button>

        {/* Nút nhạc */}
        <button onClick={() => {
            if(audioRef.current) isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
          }} 
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-all"
        >
          <Music className={`w-6 h-6 ${isPlaying ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      <AnimatePresence mode='wait'>
        {!isAccepted ? (
          <motion.div
            key="card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="relative z-10 w-full max-w-md"
          >
            {/* GLASS CARD 3D */}
            <div className={`backdrop-blur-xl bg-black/30 border ${currentTheme.cardBorder} rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl ${currentTheme.shadow} transition-all duration-700`}>
              
              {/* Glow Effect */}
              <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 ${currentTheme.glow} rounded-full blur-[80px] transition-colors duration-700`}></div>

              {/* AVATAR */}
              <div className="relative mb-8 inline-block group">
                {/* Vòng xoay trang trí */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className={`absolute -inset-1 rounded-full border border-dashed ${theme === 'universe' ? 'border-purple-400' : 'border-emerald-400'} opacity-50`}
                />
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-sm">
                  <img src={YOUR_CRUSH_IMAGE} alt="Crush" className="w-full h-full object-cover rounded-full border-2 border-white/10" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white text-rose-500 p-1.5 rounded-full shadow-lg">
                  <Heart size={16} fill="currentColor" />
                </div>
              </div>

              {/* TEXT CONTENT */}
              <h1 className={`text-4xl font-bold mb-3 bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent`} style={{ fontFamily: "'Dancing Script', cursive" }}>
                {theme === 'universe' ? "Gửi Ngôi Sao Nhỏ..." : "Gửi Nhành Cây Nhỏ..."}
              </h1>

              <p className="text-slate-300 mb-8 font-light leading-relaxed">
                {theme === 'universe' ? (
                  <>Vũ trụ này rộng lớn lắm, nhưng tớ chỉ <br/>tìm thấy một vì sao sáng nhất là cậu.</>
                ) : (
                  <>Giữa rừng người mênh mông, <br/>tớ chỉ muốn dừng chân bên cậu thôi.</>
                )}
                <br/>
                <span className="font-bold text-white mt-2 block">Làm người yêu tớ nhé?</span>
              </p>

              {/* BUTTONS */}
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDecision('yes')}
                  className={`flex-1 py-3 px-6 rounded-full font-bold text-white shadow-lg bg-gradient-to-r ${currentTheme.btnPrimary} flex items-center justify-center gap-2`}
                >
                  <Heart size={18} fill="currentColor" /> Đồng ý
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDecision('no')} // Gài hàng
                  className={`flex-1 py-3 px-6 rounded-full font-semibold text-slate-200 border bg-white/5 backdrop-blur-sm ${currentTheme.btnSecondary} flex items-center justify-center gap-2`}
                >
                   {theme === 'universe' ? <Wind size={18}/> : <Leaf size={18}/>} Không nha
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 text-center p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <h2 className={`text-5xl font-bold mb-4 bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent`} style={{ fontFamily: "'Dancing Script', cursive" }}>
              Yêu cậu 3000! ❤️
            </h2>
            <p className="text-slate-300">Biết ngay là cậu sẽ đồng ý mà!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
