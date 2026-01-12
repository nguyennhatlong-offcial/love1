import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Nếu em có component Canvas/Vũ trụ, hãy import ở đây (ví dụ: import Universe from './Universe';)

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Hàm xử lý phát nhạc
    const playMusic = async () => {
      if (audioRef.current && !isAudioPlaying) {
        audioRef.current.volume = 0.5; // Âm lượng 50%
        try {
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch (err) {
          console.log("Trình duyệt chặn Autoplay, chờ tương tác người dùng...");
        }
      }
    };

    // 1. Thử phát ngay lập tức khi load xong
    playMusic();

    // 2. Bẫy sự kiện: Nếu bước 1 thất bại, chỉ cần người dùng chạm/click bất kỳ đâu là nhạc phát ngay
    const handleInteraction = () => {
      playMusic();
      // Sau khi phát được rồi thì gỡ sự kiện ra cho nhẹ máy
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
      
      {/* --- PHẦN NHẠC (Load từ thư mục public để siêu nhanh) --- */}
      <audio 
        ref={audioRef} 
        src="/music.mp3"  
        autoPlay 
        loop 
        preload="auto"
      />

      {/* --- PHẦN GIAO DIỆN CHÍNH --- */}
      {/* Em dán code Vũ trụ / Trái tim 3D của em vào khoảng trống này */}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
          {/* Ví dụ placeholder, em xóa dòng này thay bằng code của em */}
          <h1 className="text-pink-500 animate-pulse">Đang tải vũ trụ...</h1> 
      </div>


      {/* --- PHẦN TEXT / THƯ (Đoạn này anh sửa lỗi thiếu dấu đóng thẻ cho em) --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-20 left-0 right-0 z-10 text-center p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 mx-auto max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-2">Gửi cậu ✨</h2>
        <p className="text-gray-200">
          Đây là vũ trụ nhỏ tớ làm tặng cậu. 
          <br />
          (Chạm nhẹ vào màn hình nếu nhạc chưa phát nhé)
        </p>
      </motion.div> 
      {/* Đã đóng thẻ motion.div cẩn thận */}

    </div>
  );
}
