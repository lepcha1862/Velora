'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import Image from 'next/image';
import {
  Compass,
  Map,
  Leaf,
  Users,
  Heart,
  Eye,
  ArrowRight,
  Play,
} from 'lucide-react';

// ============================================================
// 1. Configuration
// ============================================================
const FEATURES = [
  {
    icon: Compass,
    title: 'Authentic Local Experiences',
    description:
      'Discover hidden monasteries, untouched villages, and traditions that only locals truly know.',
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
  },
  {
    icon: Map,
    title: 'Carefully Curated Journeys',
    description:
      'Every experience is thoughtfully crafted to showcase Bhutan\'s landscapes, culture, and spirituality.',
    color: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: Leaf,
    title: 'Sustainable Travel',
    description:
      'Support local communities while protecting Bhutan\'s natural beauty and cultural heritage.',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Users,
    title: 'Rich Cultural Immersion',
    description:
      'Participate in vibrant festivals, traditional crafts, local cuisine, and centuries-old customs.',
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500',
  },
  {
    icon: Heart,
    title: 'Personalized Experiences',
    description:
      'Every traveler discovers Bhutan differently. We help create unforgettable moments tailored to your interests.',
    color: 'from-red-500/20 to-rose-500/20',
    iconColor: 'text-red-500',
  },
  {
    icon: Eye,
    title: 'Hidden Gems',
    description:
      'Go beyond the famous landmarks and uncover secret valleys, quiet temples, scenic viewpoints, and authentic local stories.',
    color: 'from-cyan-500/20 to-sky-500/20',
    iconColor: 'text-cyan-500',
  },
];

const COLLAGE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1585421514286-efb74c2b432c?w=400&q=80',
    alt: 'Tiger\'s Nest Monastery',
    className: 'col-span-1 row-span-2',
  },
  {
    url: 'https://images.unsplash.com/photo-1602320128454-1e6a3bfb15e8?w=400&q=80',
    alt: 'Prayer flags',
    className: 'col-span-1 row-span-1',
  },
  {
    url: 'https://images.unsplash.com/photo-1587132137052-9fc5b4e1b8b3?w=400&q=80',
    alt: 'Punakha Dzong',
    className: 'col-span-1 row-span-1',
  },
  {
    url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&q=80',
    alt: 'Himalayan landscape',
    className: 'col-span-2 row-span-1',
  },
];

// ============================================================
// 2. Feature Card Component (with floating offset)
// ============================================================
const FeatureCard = ({ feature, index, isInView }) => {
  const { theme } = useTheme();

  // Random offset for floating effect (deterministic based on index)
  const offsetY = [0, -8, -15, -5, -12, -3];
  const offsetX = [0, 5, -3, 8, -5, 2];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: 0.1 * index },
    },
    hover: {
      y: -12,
      scale: 1.03,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const Icon = feature.icon;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover="hover"
      className="group relative flex flex-col rounded-2xl p-6 backdrop-blur-md transition-all duration-300"
      style={{
        background:
          theme === 'dark'
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(255,255,255,0.15)',
        transform: `translateY(${offsetY[index] || 0}px) translateX(${offsetX[index] || 0}px)`,
        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
      }}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${feature.color}`}
      />

      <div className="relative z-10">
        <div
          className={`mb-4 inline-flex rounded-xl bg-white/20 p-3 ${feature.iconColor} dark:bg-white/5`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 font-serif text-lg font-semibold text-gray-900 dark:text-white">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {feature.description}
        </p>
      </div>

      {/* Decorative shine */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

// ============================================================
// 3. Main Component
// ============================================================
export default function WhyChooseUs({
  title = 'The Difference Lies Beyond the Journey',
  subtitle = 'WHY TRAVELERS TRUST US',
  description = 'We don\'t just plan journeys. We reveal the hidden soul of Bhutan through authentic experiences, local expertise, and a deep commitment to cultural preservation.',
  primaryCta = 'Begin Your Bhutan Story',
  secondaryCta = 'Explore Experiences',
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
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 md:py-28"
    >
      {/* ---------- Background decorative elements ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl dark:bg-amber-500/10" />
        {/* Mountain silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 dark:opacity-20"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 100L120 115L180 75L240 90L300 50L360 65L420 35L480 55L540 25L600 45L660 15L720 35L780 20L840 40L900 10L960 30L1020 15L1080 35L1140 10L1200 25L1260 5L1320 20L1380 10L1440 25V120H0Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-700"
          />
        </svg>

        {/* Decorative geometric lines (Bhutan-inspired) */}
        <div className="absolute right-0 top-1/3 hidden opacity-10 lg:block dark:opacity-20">
          <div className="flex space-x-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-16 w-1 rounded-full bg-gradient-to-b from-primary to-transparent"
                style={{ transform: `rotate(${i * 8 - 28}deg)` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- LEFT: Content ---------- */}
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
              {subtitle}
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
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              {description}
            </motion.p>

            {/* ---------- Visual Collage (visible on left for mobile) ---------- */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              className="block lg:hidden"
            >
              <div className="grid grid-cols-2 gap-2 auto-rows-[120px]">
                {COLLAGE_IMAGES.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative overflow-hidden rounded-xl ${img.className}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>
            </motion.div>

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
                <Play className="h-4 w-4" />
                {secondaryCta}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: Floating Feature Cards ---------- */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4 auto-rows-[180px]">
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Decorative glow behind cards */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
          </div>
        </div>

        {/* ---------- Mobile: Feature Cards as horizontal scroll ---------- */}
        <div className="mt-12 block lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {FEATURES.map((feature, index) => (
              <div key={index} className="min-w-[280px] flex-shrink-0">
                <FeatureCard
                  feature={feature}
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