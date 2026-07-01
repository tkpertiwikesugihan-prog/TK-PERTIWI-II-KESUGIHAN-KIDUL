import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Smile, Sun } from 'lucide-react';

export default function KidsBackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft playful background blobs */}
      <div className="absolute top-[10%] left-[-5%] w-72 h-72 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute top-[35%] right-[-5%] w-80 h-80 rounded-full bg-amber-200/25 blur-3xl" />
      <div className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-teal-100/30 blur-3xl" />
      <div className="absolute bottom-[5%] right-[2%] w-80 h-80 rounded-full bg-sky-200/25 blur-3xl" />

      {/* Floating clouds */}
      <motion.div
        initial={{ x: -100, y: '15vh', opacity: 0.6 }}
        animate={{ x: '110vw' }}
        transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
        className="absolute text-slate-300/40 select-none hidden md:block"
      >
        <div className="relative bg-white/70 backdrop-blur-[1px] w-24 h-8 rounded-full shadow-xs">
          <div className="absolute -top-4 left-4 bg-white/70 w-12 h-12 rounded-full" />
          <div className="absolute -top-6 left-10 bg-white/70 w-10 h-10 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -150, y: '55vh', opacity: 0.5 }}
        animate={{ x: '110vw' }}
        transition={{ repeat: Infinity, duration: 110, ease: 'linear' }}
        className="absolute text-slate-300/40 select-none hidden md:block"
      >
        <div className="relative bg-white/65 backdrop-blur-[1px] w-32 h-10 rounded-full shadow-xs">
          <div className="absolute -top-5 left-5 bg-white/65 w-16 h-16 rounded-full" />
          <div className="absolute -top-8 left-14 bg-white/65 w-14 h-14 rounded-full" />
        </div>
      </motion.div>

      {/* Floating Emojis & Colorful Symbols */}
      
      {/* Balloon 1 - Red */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-[8%] top-[18%] text-4xl opacity-75 hidden sm:block filter drop-shadow-md select-none cursor-default"
      >
        🎈
      </motion.div>

      {/* Balloon 2 - Yellow */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -6, 6, 0],
        }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute right-[12%] top-[25%] text-4xl opacity-75 hidden sm:block filter drop-shadow-md select-none cursor-default"
      >
        💛
      </motion.div>

      {/* Balloon 3 - Blue */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 4, -4, 0],
        }}
        transition={{
          duration: 6.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute left-[15%] bottom-[30%] text-4xl opacity-75 hidden sm:block filter drop-shadow-md select-none cursor-default"
      >
        💙
      </motion.div>

      {/* Balloon 4 - Green / Lime */}
      <motion.div
        animate={{
          y: [0, -22, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 8.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute right-[8%] bottom-[15%] text-4xl opacity-75 hidden sm:block filter drop-shadow-md select-none cursor-default"
      >
        💚
      </motion.div>

      {/* Little Windmill / Flower - Rotating */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute right-[5%] top-[8%] text-3xl opacity-70"
      >
        🌸
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute left-[4%] bottom-[45%] text-3xl opacity-60"
      >
        🌺
      </motion.div>

      {/* Smiling Sun Element */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute left-[5%] top-[5%] text-amber-400 opacity-80 hidden lg:block"
      >
        <Sun className="w-12 h-12 fill-amber-300" />
      </motion.div>

      {/* Twinkling Pastel Stars */}
      <motion.div
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[20%] top-[12%] text-amber-400"
      >
        <Sparkles className="w-6 h-6 fill-amber-200/50" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-[25%] top-[16%] text-pink-400"
      >
        <Sparkles className="w-5 h-5 fill-pink-200/50" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute right-[18%] bottom-[40%] text-sky-400"
      >
        <Sparkles className="w-5 h-5 fill-sky-200/50" />
      </motion.div>

      {/* Cute flying heart */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[4%] bottom-[55%] text-rose-400 opacity-60"
      >
        <Heart className="w-6 h-6 fill-rose-300" />
      </motion.div>

      {/* Cute smiling face */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, 8, -8, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[3%] top-[35%] text-teal-400 opacity-50"
      >
        <Smile className="w-7 h-7" />
      </motion.div>
    </div>
  );
}
