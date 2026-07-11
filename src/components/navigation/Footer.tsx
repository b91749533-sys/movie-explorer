"use client";

import React from "react";
import Link from "next/link";
import { Film, Send } from "lucide-react";


const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-[#01000b] to-[#030014]/30 border-t border-white/5 pt-16 pb-8">
      {/* Visual Ambient Blur Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tighter text-white">
                CINE<span className="text-rose-500">WAVE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Explore your favorite movies, rate your reviews, manage your custom watchlists, and enjoy a curated movie explorer experience with premium analytics and aesthetics.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-rose-500 hover:bg-white/10 transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-rose-500 hover:bg-white/10 transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-rose-500 hover:bg-white/10 transition-colors" aria-label="Github">
                <GithubIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/browse" className="hover:text-white transition-colors">Movies</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Search & Filter</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">User Stats</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-gray-400 text-xs mb-3">Stay updated with fresh TMDB recommendations.</p>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Credit & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-1.5">
            <span>&copy; {currentYear} CineWave. All rights reserved.</span>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400 font-medium">Designed & Built By Youssef Manssouri</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
