"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Search, Bookmark, Heart, Menu, X, Compass, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for glass effect adjustments
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", icon: Film },
    { label: "Browse", href: "/browse", icon: Compass },
    { label: "Watchlist", href: "/watchlist", icon: Bookmark },
    { label: "Favorites", href: "/favorites", icon: Heart },
    { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3"
            : "bg-gradient-to-b from-[#030014]/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center box-glow"
              >
                <Film className="w-5.5 h-5.5 text-white" />
              </motion.div>
              <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-white via-rose-200 to-rose-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                CINE<span className="text-rose-500 text-glow">WAVE</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                      isActive ? "text-rose-500" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-rose-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Options (Search Icon, Auth/Profile Button) */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/search"
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Login Button Mock - will be wired with Supabase Auth in Phase 2 */}
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-rose-500 hover:text-white hover:box-glow transition-all duration-300"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                href="/search"
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden glass-panel mx-4 my-2 rounded-2xl overflow-hidden box-glow"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "bg-rose-500/20 text-rose-500"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <hr className="border-white/5 my-4" />
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-3 rounded-xl text-center text-sm font-semibold uppercase tracking-wider bg-rose-600 text-white hover:bg-rose-700 transition-colors">
                  Sign In
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
