'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import Image from 'next/image';
import {
  Theater,
  Building2,
  Sparkles,
  Shirt,
  Palette,
  Coffee,
  ArrowRight,
  Calendar,
} from 'lucide-react';

// ============================================================
// 1. Configuration
// ============================================================
const EXPERIENCES = [
  {
    icon: Theater,
    title: 'Tshechu Festivals',
    description:
      'Witness colorful masked dances, sacred rituals, and celebrations that unite communities across Bhutan.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAWnBrXVLtKmRBKcbKxYdS8AAIaqqTJIKWMQskCFYQ2pEvnPMBwmUa5az&s=10',
    alt: 'Tshechu festival dancers',
  },
  {
    icon: Building2,
    title: 'Dzongs & Monasteries',
    description:
      'Explore magnificent fortresses and monasteries where history, spirituality, and architecture become one.',
    image:
      'https://bhutanethometho.com/wp-content/uploads/2024/06/punakha-dzong.jpg',
    alt: 'Punakha Dzong',
  },
  {
    icon: Sparkles,
    title: 'Buddhist Traditions',
    description:
      'Experience peaceful monasteries, prayer wheels, meditation, and centuries-old spiritual practices.',
    image:
      'https://www.mfa.gov.bt/wp-content/uploads/2023/10/IMG_8135-1-scaled.jpg',
    alt: 'Monk praying',
  },
  {
    icon: Shirt,
    title: 'Traditional Dress',
    description:
      'Discover the elegance of the Gho and Kira, proudly worn as part of everyday Bhutanese life.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsA6JTWS07CBlr4zUXKtGz802XOYdVJTrUppLjTZOz9Owr0FJfzLkOzdM&s=10',
    alt: 'Traditional dress',
  },
  {
    icon: Palette,
    title: 'Handwoven Arts',
    description:
      'Admire handcrafted textiles, intricate wood carvings, paintings, and generations of artistic craftsmanship.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahitlqx5ZHlEqnjuqZUz3Esanw6FPTZGF2dSH7jrhvRqwuaty2a9Gf2U&s=10',
    alt: 'Bhutanese art',
  },
  {
    icon: Coffee,
    title: 'Local Cuisine',
    description:
      'Taste authentic Bhutanese flavors like Ema Datshi, red rice, butter tea, and dishes prepared with local ingredients.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjFxbVUYxsuE75CnJ15vTaD4H76gUoVnSGC_MVpHLW9tP0ze4ICqqVqFE&s=10',
    alt: 'Bhutanese food',
  },
];

// ============================================================
// 2. Experience Card Component (floating)
// ============================================================
const ExperienceCard = ({ experience, index, isInView }) => {
  const { theme } = useTheme();
  const Icon = experience.icon;

  // Floating offsets
  const offsets = [
    { y: -10, x: 5 },
    { y: -5, x: -8 },
    { y: -15, x: 0 },
    { y: 0, x: 10 },
    { y: -8, x: -5 },
    { y: -12, x: 6 },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay: 0.1 * index, ease: 'easeOut' },
    },
    hover: {
      y: -16,
      scale: 1.04,
      boxShadow:
        '0 25px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover="hover"
      className="group relative flex flex-col overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-300"
      style={{
        background:
          theme === 'dark'
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0.75)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        transform: `translateY(${offsets[index]?.y || 0}px) translateX(${offsets[index]?.x || 0}px)`,
      }}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
          <Icon className="h-4 w-4 text-white" />
          <span className="text-xs font-medium text-white">{experience.title}</span>
        </div>
      </div>
      <div className="relative z-10 p-4">
        <h4 className="font-serif text-base font-semibold text-gray-900 dark:text-white">
          {experience.title}
        </h4>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
          {experience.description}
        </p>
      </div>
      {/* Decorative glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

// ============================================================
// 3. Main Component
// ============================================================
export default function CultureSection({
  label = 'THE SOUL OF BHUTAN',
  title = 'Where Ancient Traditions Still Shape Everyday Life',
  description = [
    'In Bhutan, culture is not a relic of the past—it is a living, breathing presence that flows through every village, valley, and heart. From the vibrant Tshechu festivals that unite communities to the serene prayers echoing from ancient monasteries, tradition is woven into the fabric of daily life.',
    'Bhutanese people carry their heritage with quiet pride—dressing in traditional Gho and Kira, practicing Buddhist rituals passed down for generations, and preserving art forms that tell stories of gods, heroes, and nature. As the world changes, Bhutan holds onto its soul, offering travelers a rare glimpse into a culture that has remained beautifully intact.',
  ],
  primaryCta = 'Explore Bhutanese Traditions',
  secondaryCta = 'View Festival Calendar',
}) {
  const { theme } = useTheme();
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

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
      transition: { duration: 0.7, delay: 0.1 * (i || 0), ease: 'easeOut' },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-20 dark:bg-gray-950 md:py-28"
    >
      {/* ---------- Background decorative elements ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm golden glow */}
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/20" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />

        {/* Mountain silhouettes */}
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

        {/* Decorative prayer flag patterns (subtle) */}
        <div className="absolute right-0 top-1/4 hidden opacity-5 lg:block dark:opacity-10">
          <div className="flex flex-col items-end gap-1">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-1 w-12 rounded-full bg-gradient-to-l from-primary to-transparent"
                style={{ transform: `rotate(${i * 3 - 16}deg)` }}
              />
            ))}
          </div>
        </div>
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
              {label}
            </motion.span>

            <motion.h2
              custom={1}
              variants={fadeUpVariants}
              className="font-serif text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl"
            >
              {title}
            </motion.h2>

            {description.map((paragraph, idx) => (
              <motion.p
                key={idx}
                custom={2 + idx}
                variants={fadeUpVariants}
                className="text-base text-gray-600 dark:text-gray-300"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              custom={4}
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
              >
                <Calendar className="h-4 w-4" />
                {secondaryCta}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: Immersive Collage (desktop) ---------- */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4 auto-rows-[200px]">
            {EXPERIENCES.map((experience, index) => (
              <div key={index} className="relative">
                <ExperienceCard
                  experience={experience}
                  index={index}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Mobile: Swipeable Cards ---------- */}
        <div className="mt-12 block lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {EXPERIENCES.map((experience, index) => (
              <div key={index} className="min-w-[280px] flex-shrink-0">
                <ExperienceCard
                  experience={experience}
                  index={index}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}