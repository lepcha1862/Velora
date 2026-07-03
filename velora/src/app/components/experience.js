'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Mountain,
  Users,
  Calendar,
  Compass,
  ArrowRight,
  Eye,
  Heart,
  Star,
  Flag,
} from 'lucide-react';

// ============================================================
// 1. Configuration
// ============================================================
const EXPERIENCES = [
  {
    id: 1,
    title: 'Monastery Discovery',
    description: 'Ancient monasteries hidden among cliffs, where prayer flags dance with the mountain breeze.',
    image: 'https://navbharattourism.com/wp-content/uploads/Top-Monasteries-and-Cultural-Sites-to-Visit-in-Bhutan.jpg',
    duration: '5 Days',
    bestSeason: 'Mar–May, Sep–Nov',
    difficulty: 'Moderate',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 2,
    title: 'Himalayan Trekking',
    description: 'Walk through untouched forests, alpine valleys, and breathtaking Himalayan landscapes.',
    image: 'https://www.green-lotus-trekking.com/wp-content/uploads/2024/07/druk-jpg.webp',
    duration: '8 Days',
    bestSeason: 'Apr–Jun, Sep–Oct',
    difficulty: 'Adventure',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 3,
    title: 'Festival Immersion',
    description: 'Celebrate vibrant Tshechu festivals with masked dances, music, blessings, and ancient rituals.',
    image: 'https://www.experiencetravelgroup.com/wp-content/uploads/2025/08/Bhutan-festival-2-scaled.jpg',
    duration: '4 Days',
    bestSeason: 'Sep–Nov',
    difficulty: 'Easy',
    color: 'from-red-500/20 to-rose-500/20',
  },
  {
    id: 4,
    title: 'Village & Culinary Journey',
    description: 'Cook traditional Bhutanese meals, visit local homes, and experience authentic village life.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzc3qMgWtLX_qW6ki3i8SsyvJBFQQiQlUfv2ZMduBnOA&s=10',
    duration: '3 Days',
    bestSeason: 'Year-round',
    difficulty: 'Easy',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 5,
    title: 'Spiritual Retreat',
    description: 'Peaceful moments in monasteries with meditation sessions, monks, and breathtaking mountain silence.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN1A0pxWUDHaJKR9cCMBM0aQdbtxJ0P07-0DxPW_2Bn04j1I0JfrM5pcg&s=10',
    duration: '6 Days',
    bestSeason: 'Mar–May, Sep–Nov',
    difficulty: 'Moderate',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 6,
    title: 'Traditional Adventure',
    description: 'Try Bhutan\'s national sports, archery and khuru, while learning local customs and community traditions.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFljU3ZWMPpIRei9Ew8g6zLdAeS7QCqIV3DEp4Vin1ln5sOrDyxDFVn-Z&s=10',
    duration: '2 Days',
    bestSeason: 'Mar–Jun, Sep–Dec',
    difficulty: 'Moderate',
    color: 'from-cyan-500/20 to-sky-500/20',
  },
];

const TIMELINE = [
  { label: 'Arrival', icon: MapPin },
  { label: 'Culture', icon: Users },
  { label: 'Adventure', icon: Mountain },
  { label: 'Spirituality', icon: Heart },
  { label: 'Celebration', icon: Star },
  { label: 'Memories', icon: Flag },
];

const STATS = [
  { label: 'Himalayan Adventures', value: '' },
  { label: 'Cultural Festivals', value: '' },
  { label: 'Sacred Monasteries', value: '' },
  { label: 'Sustainable Experiences', value: '' },
  { label: 'Local Guides', value: '' },
  { label: 'Hidden Locations', value: '' },
];

// ============================================================
// 2. Experience Card Component
// ============================================================
const ExperienceCard = ({ experience, index, isInView }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay: 0.1 * index, ease: 'easeOut' },
    },
    hover: {
      y: -12,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const difficultyColor = {
    Easy: 'text-green-400',
    Moderate: 'text-amber-400',
    Adventure: 'text-red-400',
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex h-[400px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl shadow-xl transition-all duration-300 sm:w-[340px] md:w-[380px]"
      style={{
        background:
          theme === 'dark'
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      {/* Image with Ken Burns effect on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Glass info panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-sm">
        <h3 className="font-serif text-xl font-bold text-white">
          {experience.title}
        </h3>
        <p className="mt-1 text-sm text-white/80">
          {experience.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {experience.duration}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {experience.bestSeason}
          </span>
          <span className={`flex items-center gap-1 font-medium ${difficultyColor[experience.difficulty] || 'text-white'}`}>
            <MapPin className="h-3 w-3" /> {experience.difficulty}
          </span>
        </div>

        {/* Discover More button slides in on hover */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="mt-3 flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          Discover More <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

// ============================================================
// 3. Main Component
// ============================================================
export default function ExperiencesSection({
  label = 'CURATED EXPERIENCES',
  title = 'Journeys Beyond the Ordinary',
  description = 'Every experience is thoughtfully curated to connect you with Bhutan\'s landscapes, people, spirituality, and traditions—not just its destinations. From mountain treks to monastery stays, each journey reveals a different side of the hidden kingdom.',
  primaryCta = 'Start Your Bhutan Journey',
  secondaryCta = 'Browse All Experiences',
}) {
  const { theme } = useTheme();
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Mouse parallax for the entire section (subtle)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-950 dark:to-gray-900 md:py-28"
    >
      {/* ---------- Background ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft light rays */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl dark:bg-amber-500/10" />

        {/* Mountain silhouettes */}
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

        {/* Decorative prayer flag lines */}
        <div className="absolute right-0 top-1/3 hidden opacity-10 lg:block dark:opacity-20">
          <div className="flex flex-col items-end gap-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-0.5 w-16 rounded-full bg-gradient-to-l from-primary to-transparent"
                style={{ transform: `rotate(${i * 3 - 13}deg)` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Header ---------- */}
        <motion.div
          initial="hidden"
          animate={controls}
          className="mx-auto max-w-3xl text-center lg:text-left"
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
            className="mt-3 font-serif text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            className="mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
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
              <Eye className="h-4 w-4" />
              {secondaryCta}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ---------- Experience Cards (Horizontal Gallery) ---------- */}
        <div className="mt-12">
          <div
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
            style={{
              transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {EXPERIENCES.map((experience, index) => (
              <div key={experience.id} className="snap-center">
                <ExperienceCard
                  experience={experience}
                  index={index}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>
          {/* Hint for scrolling */}
          <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
            Scroll to explore more experiences →
          </p>
        </div>

        {/* ---------- Timeline (Premium Feature) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h4 className="text-center font-serif text-lg font-semibold text-gray-700 dark:text-gray-300">
            Your Journey Through Bhutan
          </h4>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {TIMELINE.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                      {step.label}
                    </span>
                  </motion.div>
                  {idx < TIMELINE.length - 1 && (
                    <div className="mx-1 h-0.5 w-6 bg-primary/30 md:mx-3 md:w-12" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ---------- Floating Stats ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="flex transform items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm transition-all hover:scale-105 dark:bg-black/20"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span className="text-xl">{stat.value}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}