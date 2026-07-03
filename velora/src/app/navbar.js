'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Search, Sun, Moon, Compass } from 'lucide-react';

// ============================================================
// 1. Configuration (shared across desktop & mobile)
// ============================================================
const defaultNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Why Choose Us', href: '/whychooseus' },
  { name: 'About', href: '/about' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Culture', href: '/culture' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

// ============================================================
// 2. Main Navbar Component (JavaScript)
// ============================================================
export default function Navbar({
  agencyName,
  logo,
  navItems = defaultNavItems,
  ctaText = 'Explore Bhutan',
  ctaLink = '/destinations',
  className = '',
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // ---------- scroll effect ----------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------- lock body scroll when menu is open ----------
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // ---------- close menu on Escape key ----------
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // ---------- close menu on route change ----------
    useEffect(() => {
    setTimeout(() => setMenuOpen(false), 0);
    }, [pathname]);


  // ---------- toggle theme ----------
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // ---------- helper to check active link ----------
  const isActive = (href) => pathname === href;

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full transition-all duration-300
          bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
          ${scrolled ? 'shadow-lg shadow-black/5 dark:shadow-black/20' : 'shadow-sm'}
          ${className}
        `}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ---------- Brand (Left) ---------- */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
            aria-label="Home"
          >
            {logo ? (
              logo
            ) : (
              <Compass className="h-7 w-7 text-primary" strokeWidth={2} />
            )}
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              {agencyName}
            </span>

          </Link>

          {/* ---------- Desktop Navigation (Center) ---------- */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-all duration-300
                  rounded-lg
                  ${
                    isActive(item.href)
                      ? 'text-primary dark:text-primary-light'
                      : 'text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light'
                  }
                  hover:scale-105
                  group
                `}
              >
                {item.name}
                {/* underline animation */}
                <span
                  className={`
                    absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 
                    bg-primary dark:bg-primary-light transition-all duration-300
                    group-hover:w-5/6
                    ${isActive(item.href) ? 'w-5/6' : 'w-0'}
                  `}
                />
                {/* glow effect in dark mode */}
                <span
                  className={`
                    absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300
                    dark:group-hover:opacity-100
                    ${isActive(item.href) ? 'dark:opacity-100' : ''}
                    dark:bg-primary/10 dark:shadow-[0_0_20px_rgba(99,102,241,0.3)]
                  `}
                />
              </Link>
            ))}
          </nav>

          {/* ---------- Right Actions ---------- */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search (visible on all screens) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle theme"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <Sun
                  className={`
                    absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300
                    dark:-rotate-90 dark:scale-0
                  `}
                />
                <Moon
                  className={`
                    absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300
                    dark:rotate-0 dark:scale-100
                  `}
                />
              </span>
            </button>

            {/* CTA Button (desktop only) */}
            <Link
              href={ctaLink}
              className="hidden sm:inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {ctaText}
            </Link>

            {/* Mobile Hamburger (right) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="block rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          MOBILE DRAWER MENU (slide-in from right)
          ============================================================ */}
      <div
        className={`
          fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Backdrop with blur */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm dark:bg-black/40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          ref={menuRef}
          className={`
            absolute right-0 top-0 h-full w-[85%] max-w-sm transform bg-white dark:bg-gray-900
            shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Close button (top-right) */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Nav items with staggered reveal */}
          <nav className="mt-16 flex flex-col gap-1 px-6" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative block rounded-lg px-4 py-3 text-lg font-medium
                  transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'text-primary dark:text-primary-light bg-primary/5 dark:bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }
                  transform
                  ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                `}
                style={{
                  transitionDelay: menuOpen ? `${index * 50}ms` : '0ms',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-1 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full bg-primary dark:bg-primary-light" />
                )}
              </Link>
            ))}
          </nav>

          {/* Theme toggle & CTA inside drawer */}
          <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <Sun
                  className={`
                    absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300
                    dark:-rotate-90 dark:scale-0
                  `}
                />
                <Moon
                  className={`
                    absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300
                    dark:rotate-0 dark:scale-100
                  `}
                />
              </span>
              <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </button>

            <Link
              href={ctaLink}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => setMenuOpen(false)}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          SEARCH MODAL (reusable placeholder)
          ============================================================ */}
      <div
        className={`
          fixed inset-0 z-50 transition-all duration-300
          ${searchOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`
            absolute left-1/2 top-[20%] w-[90%] max-w-xl -translate-x-1/2 transform
            rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900
            transition-all duration-300
            ${searchOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          `}
        >
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations, experiences..."
              className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400 dark:text-white"
              autoFocus
              onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {`Try: "Bhutan", "Himalayas", "Culture"`}
         </div>
        </div>
      </div>
    </>
  );
}