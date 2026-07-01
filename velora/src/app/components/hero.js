'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import Image from 'next/image';

// ============================================================
// 1. Configuration
// ============================================================
const HERO_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1585421514286-efb74c2b432c?w=1920&q=80', // Tiger's Nest
    alt: 'Tiger\'s Nest Monastery, Bhutan',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1587132137052-9fc5b4e1b8b3?w=1920&q=80', // Punakha Dzong
    alt: 'Punakha Dzong, Bhutan',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1602320128454-1e6a3bfb15e8?w=1920&q=80', // Himalayan valley
    alt: 'Himalayan valley with prayer flags',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1920&q=80', // Dochula Pass
    alt: 'Dochula Pass clouds',
  },
];

const DESTINATIONS = [
  {
    id: 1,
    name: 'Tiger\'s Nest',
    caption: 'Monastery perched on a cliff edge',
    image: 'https://images.unsplash.com/photo-1585421514286-efb74c2b432c?w=400&q=80',
  },
  {
    id: 2,
    name: 'Punakha Dzong',
    caption: 'Palace of great happiness',
    image: 'https://images.unsplash.com/photo-1587132137052-9fc5b4e1b8b3?w=400&q=80',
  },
  {
    id: 3,
    name: 'Bumthang Valley',
    caption: 'Spiritual heartland of Bhutan',
    image: 'https://images.unsplash.com/photo-1602320128454-1e6a3bfb15e8?w=400&q=80',
  },
  {
    id: 4,
    name: 'Dochula Pass',
    caption: 'Where clouds meet the Himalayas',
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&q=80',
  },
];

// ============================================================
// 2. Main Hero Component
// ============================================================
export default function Hero({ title, subtitle, primaryCta, secondaryCta }) {
  const { theme } = useTheme();
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // ---------- Slideshow logic ----------
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsTransitioning(false);
      }, 800); // match crossfade duration
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // ---------- Mouse parallax ----------
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ---------- Text animation variants ----------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingCardVariants = {
    initial: { y: 0 },
    animate: (i) => ({
      y: [0, -10, 0],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gray-900 dark:bg-black"
    >
      {/* ---------- Background Slideshow ---------- */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentImage].url}
              alt={HERO_IMAGES[currentImage].alt}
              fill
              className="object-cover"
              priority
            />
            {/* Ken Burns zoom (slow) */}
            <div
              className="absolute inset-0 transform scale-105 transition-transform duration-[8000ms] ease-in-out"
              style={{
                transform: `scale(${isTransitioning ? 1.0 : 1.1})`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Overlay Layers ---------- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 dark:from-black/50 dark:via-black/40 dark:to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      {/* ---------- Content Container ---------- */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ---------- Left: Text & CTAs ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="mb-2 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm dark:bg-black/20"
            >
              Hidden Kingdom
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl font-bold leading-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title || 'Discover the Hidden Kingdom of Bhutan'}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-md text-base text-white/80 drop-shadow-lg sm:text-lg lg:max-w-sm"
            >
              {subtitle ||
                'Journey through ancient monasteries, mist-covered mountains, sacred valleys, and timeless traditions that remain untouched by time.'}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all hover:shadow-amber-500/50 dark:from-amber-400 dark:to-orange-400"
              >
                <span className="relative z-10">
                  {primaryCta || 'Begin the Journey'}
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-white/20 dark:bg-black/20 dark:hover:bg-black/30"
                onClick={() => alert('Video modal placeholder')}
              >
                <Play className="h-4 w-4" />
                {secondaryCta || 'Watch the Story'}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ---------- Right: Floating Destination Cards ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div
              className="grid grid-cols-2 gap-4"
              style={{
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              {DESTINATIONS.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  custom={i}
                  variants={floatingCardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.05, y: -15 }}
                  className="group relative overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl"
                  style={{
                    background:
                      theme === 'dark'
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-3 text-white">
                    <h3 className="font-serif text-lg font-semibold">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-white/80">{dest.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Scroll Down Indicator ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- Mobile: Destination Cards as horizontal scroll ---------- */}
      <div className="absolute bottom-4 left-0 right-0 z-20 block px-4 lg:hidden">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {DESTINATIONS.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[140px] flex-shrink-0 overflow-hidden rounded-xl backdrop-blur-md"
              style={{
                background:
                  theme === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  width={200}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2 text-white">
                <p className="text-sm font-semibold">{dest.name}</p>
                <p className="text-xs text-white/70">{dest.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}