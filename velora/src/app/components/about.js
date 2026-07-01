'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';

// ============================================================
// 1. Configuration
// ============================================================
const STATS = [
  { label: 'Himalayan Kingdom', value: '🏔️' },
  { label: 'Ancient Monasteries', value: '🏯' },
  { label: 'Vibrant Festivals', value: '🎭' },
  { label: 'Carbon-Negative Nation', value: '🌱' },
  { label: 'Gross National Happiness', value: '😊' },
  { label: 'Protected Forests', value: '🌲' },
];

const COLLAGE_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1585421514286-efb74c2b432c?w=600&q=80',
    alt: 'Tiger\'s Nest Monastery',
    className: 'col-span-1 row-span-2',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1587132137052-9fc5b4e1b8b3?w=600&q=80',
    alt: 'Punakha Dzong',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1602320128454-1e6a3bfb15e8?w=600&q=80',
    alt: 'Prayer flags',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80',
    alt: 'Himalayan landscape',
    className: 'col-span-2 row-span-1',
  },
];

// ============================================================
// 2. Animated Stat Card
// ============================================================
const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group flex transform items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl dark:bg-black/20"
      style={{ border: '1px solid rgba(255,255,255,0.12)' }}
    >
      <span className="text-2xl">{stat.value}</span>
      <span className="text-sm font-medium text-white/90 dark:text-white/80">
        {stat.label}
      </span>
    </motion.div>
  );
};

// ============================================================
// 3. Main About Section
// ============================================================
export default function AboutBhutan({
  title = 'A Kingdom Hidden Among the Clouds',
  subtitle = "Bhutan isn't a place you simply visit. It's a place you slowly discover.",
  description = [
    'Nestled deep within the eastern Himalayas, Bhutan remains one of the world\'s last untouched kingdoms. Here, time moves to the rhythm of prayer flags and monastery bells, where ancient traditions thrive alongside a deep commitment to sustainability.',
    'The concept of Gross National Happiness guides every aspect of life — a philosophy that prioritizes spiritual well-being over material wealth. From the iconic Tiger\'s Nest Monastery clinging to a cliff face to the vibrant festivals where masked dancers tell centuries-old stories, every corner of Bhutan whispers tales of a culture preserved for generations.',
    'Visitors don\'t simply pass through; they become part of a living story that unfolds across misty valleys, sacred rivers, and timeless mountain passes. It is a place where the Himalayas hide their most precious secrets, waiting for those who seek more than just a destination — but a transformation.',
  ],
  primaryCta = 'Explore Culture',
  secondaryCta = 'Watch Bhutan Stories',
}) {
  const { theme } = useTheme();
  const controls = useAnimation();
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

    const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 0.1 * (i || 0), ease: "easeOut" },
    }),
    };


  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative overflow-hidden bg-gray-50 py-20 dark:bg-gray-950 md:py-28"
      ref={contentRef}
    >
      {/* ---------- Background decorative elements ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl dark:bg-amber-500/10" />
        {/* Mountain silhouette lines */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 dark:opacity-20"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 95L120 110L180 70L240 85L300 45L360 60L420 30L480 50L540 20L600 40L660 10L720 30L780 15L840 35L900 5L960 25L1020 10L1080 30L1140 5L1200 20L1260 0L1320 15L1380 5L1440 20V120H0Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-700"
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- LEFT: Storytelling content ---------- */}
          <motion.div
            initial="hidden"
            animate={controls}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.span
              custom={0}
              variants={fadeUpVariants}
              className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:bg-primary/20"
            >
              About Bhutan
            </motion.span>

            <motion.h2
              custom={1}
              variants={fadeUpVariants}
              className="font-serif text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl"
            >
              {title}
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              className="text-lg italic text-gray-600 dark:text-gray-300"
            >
              {subtitle}
            </motion.p>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              {description.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  custom={3 + idx}
                  variants={fadeUpVariants}
                  className="leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              custom={6}
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white/60 px-6 py-3 font-medium text-gray-700 backdrop-blur-sm transition-all hover:bg-white/80 dark:border-gray-700 dark:bg-black/30 dark:text-gray-300 dark:hover:bg-black/50"
                onClick={() => alert('Video modal placeholder')}
              >
                <Play className="h-4 w-4" />
                {secondaryCta}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: Visual Collage ---------- */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
            className="relative grid grid-cols-2 gap-3 auto-rows-[180px] lg:auto-rows-[200px]"
          >
            {COLLAGE_IMAGES.map((img) => (
              <motion.div
                key={img.id}
                className={`relative overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl ${img.className}`}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Subtle glass overlay on hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </motion.div>
            ))}

            {/* Decorative corner accent */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl dark:bg-primary/20" />
          </motion.div>
        </div>

        {/* ---------- Floating Statistics ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
        >
          {STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>

      {/* ---------- Decorative prayer flag lines ---------- */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-5 dark:opacity-10">
        <div className="flex justify-around">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-48 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          ))}
        </div>
      </div>
    </section>
  );
}