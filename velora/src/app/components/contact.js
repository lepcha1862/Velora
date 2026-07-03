'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Compass,
  ArrowUpRight,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

// ============================================================
// 1. Configuration
// ============================================================
const SOCIAL_LINKS = [
  { name: "Instagram", icon: FaInstagram, href: "#" },
  { name: "Facebook", icon: FaFacebookF, href: "#" },
  { name: "YouTube", icon: FaYoutube, href: "#" },
  { name: "TikTok", icon: FaTiktok, href: "#" },
  { name: "X", icon: FaXTwitter, href: "#" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
];

const particles = [
  { size: 4, left: 12, top: 25 },
  { size: 6, left: 30, top: 60 },
  { size: 3, left: 80, top: 40 },
  { size: 5, left: 55, top: 15 },
  { size: 4, left: 20, top: 80 },
  { size: 7, left: 65, top: 55 },
  { size: 3, left: 90, top: 20 },
  { size: 5, left: 10, top: 45 },
  { size: 4, left: 40, top: 10 },
  { size: 6, left: 75, top: 70 },
  { size: 5, left: 52, top: 88 },
  { size: 3, left: 18, top: 35 },
  { size: 4, left: 95, top: 50 },
  { size: 6, left: 60, top: 5 },
  { size: 5, left: 35, top: 92 },
];

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Bhutan', href: '/about' },
  { name: 'Culture', href: '/culture' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hello@bhutandiscovery.com' },
  { icon: Phone, label: 'Phone', value: '+975 17 123 456' },
  { icon: MapPin, label: 'Office', value: 'Thimphu, Bhutan' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9:00 AM – 5:00 PM BTT' },
];

// ============================================================
// 2. Main Component
// ============================================================
export default function ContactFooter({
  agencyName ,
  logo,
  tagline = 'Discover Bhutan beyond the ordinary, where every journey uncovers stories hidden among the Himalayas.',
  brandDescription = 'We are a team of local storytellers, cultural experts, and adventure guides dedicated to revealing the soul of Bhutan to the world.',
  socialLinks = SOCIAL_LINKS,
  navLinks = NAV_LINKS,
  contactInfo = CONTACT_INFO,
  copyrightText = 'Crafted to reveal the hidden beauty of Bhutan.',
  legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
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

  // Mouse parallax for background elements
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
            transition: {
            duration: 0.7,
            delay: 0.1 * (i || 0),
            ease: "easeOut",
            },
        }),
        };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      {/* ---------- Background Decorations ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm twilight gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-primary/5 dark:via-amber-500/10 dark:to-primary/10" />

        {/* Mountain silhouettes - bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-30 dark:opacity-40"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200L60 160L120 180L180 130L240 150L300 100L360 120L420 80L480 110L540 60L600 90L660 40L720 70L780 30L840 60L900 20L960 50L1020 30L1080 60L1140 20L1200 50L1260 20L1320 40L1380 15L1440 30V200H0Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-700"
          />
          <path
            d="M0 200L80 170L160 185L240 150L320 165L400 130L480 150L560 110L640 130L720 90L800 115L880 80L960 105L1040 70L1120 95L1200 60L1280 80L1360 50L1440 70V200H0Z"
            fill="currentColor"
            className="text-gray-200 dark:text-gray-800"
            opacity="0.5"
          />
        </svg>

        {/* Floating particles */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {particles.map((particle, index) => (
            <div
                key={index}
                className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
                style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: "float-particle 8s infinite ease-in-out",
                animationDelay: `${index * 0.3}s`,
                }}
            />
            ))}
            </div>

        {/* Decorative golden line motif (Bhutan-inspired) */}
        <div className="absolute top-0 right-20 hidden h-32 w-px bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/20 lg:block" />
        <div className="absolute bottom-20 left-10 hidden h-24 w-px bg-gradient-to-t from-primary/10 to-transparent dark:from-primary/20 lg:block" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* ---------- Header ---------- */}
        <motion.div
          initial="hidden"
          animate={controls}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            custom={0}
            variants={fadeUpVariants}
            className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:bg-primary/20"
          >
            {"Let's Connect"}
          </motion.span>

          <motion.h2
            custom={1}
            variants={fadeUpVariants}
            className="mt-3 font-serif text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl"
          >
            Your Next Adventure Starts Here
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            className="mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg"
          >
            {"Follow our journey, discover travel inspiration, and stay connected with"}
            the hidden kingdom. {"Let's explore Bhutan together."}
          </motion.p>
        </motion.div>

        {/* ---------- Main Footer Content ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Left Column: Brand */}
          <motion.div variants={childVariants} className="space-y-4">
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="flex items-center gap-2"
            >
        
              {logo ? (
              logo
            ) : (
              <Compass className="h-7 w-7 text-primary" strokeWidth={2} />
            )}
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              {agencyName}
            </span>

            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {brandDescription}
            </p>
            <p className="text-sm italic text-primary/80 dark:text-primary/60">
              “{tagline}”
            </p>
          </motion.div>

          {/* Right Column: Connect + Contact Info */}
          <motion.div variants={childVariants} className="space-y-6">
            {/* Social Links */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white">
                Connect With Us
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm text-gray-600 backdrop-blur-sm transition-all hover:bg-white/80 hover:text-primary dark:bg-black/30 dark:text-gray-300 dark:hover:bg-black/50 dark:hover:text-primary-light"
                      style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="hidden sm:inline">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Contact Info Cards */}
            <div>
              <h4 className="font-serif text-base font-medium text-gray-900 dark:text-white">
                Get in Touch
              </h4>
              <div className="mt-2 space-y-2">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl bg-white/40 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/60 dark:bg-black/20 dark:hover:bg-black/30"
                      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <Icon className="h-4 w-4 text-primary dark:text-primary-light" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- Bottom Bar ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} {agencyName}.{' '}
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {copyrightText}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary dark:hover:text-primary-light"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}