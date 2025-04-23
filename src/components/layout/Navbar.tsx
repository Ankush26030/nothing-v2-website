"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Headphones, Radio, Disc } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  // Cycle through music icons
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get current music icon component
  const getCurrentMusicIcon = () => {
    const icons = [
      <Music className="w-4 h-4 text-orange-500" key="music" />,
      <Headphones className="w-4 h-4 text-orange-500" key="headphones" />,
      <Radio className="w-4 h-4 text-orange-500" key="radio" />,
      <Disc className="w-4 h-4 text-orange-500" key="disc" />
    ];
    return icons[activeIcon];
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-orange-500/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <motion.div
              className="relative w-10 h-10 flex items-center justify-center"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-2 bg-orange-500/30 rounded-lg blur-md z-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse"
                }}
              />
              <Image
                src="/Assets/logo.gif"
                alt="NOTHING Logo"
                width={40}
                height={40}
                className="z-10"
              />
            </motion.div>
            <div className="flex items-center">
              <motion.span
                className="text-white font-bold text-xl mr-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                nothing
              </motion.span>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="flex items-center justify-center rounded-full bg-orange-500/20 p-1 ml-1"
              >
                {getCurrentMusicIcon()}
              </motion.div>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#commands">Commands</NavLink>
          <Button
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-full px-8 py-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
            asChild
          >
            <Link href="https://discord.com/api/oauth2/authorize?client_id=1234592539324059709&permissions=37080065&scope=bot">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.14 96.36"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                Add to Discord
              </span>
            </Link>
          </Button>
        </div>

        {/* Animated music note */}
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-10, -25, -40],
            rotate: [0, 10, -10]
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17.5H7C5.89543 17.5 5 16.6046 5 15.5C5 14.3954 5.89543 13.5 7 13.5H9L19 11.5V16.5M9 17.5V13.5M9 17.5C9 19.433 7.433 21 5.5 21C3.567 21 2 19.433 2 17.5C2 15.567 3.567 14 5.5 14C6.24003 14 6.92459 14.2124 7.5 14.584M19 16.5L19 6.5L9 8.5V12.584"
              stroke="rgba(249, 115, 22, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col space-y-1.5 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="w-6 h-0.5 bg-white block"
            animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white block"
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white block"
            animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center py-10 px-4 md:hidden z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-8 items-center">
                <MobileNavLink
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </MobileNavLink>
                <MobileNavLink
                  href="#commands"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Commands
                </MobileNavLink>
                <MobileNavLink
                  href="#filters"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Filters
                </MobileNavLink>
                <MobileNavLink
                  href="#spotify"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Spotify
                </MobileNavLink>
                <Button
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-full w-full px-8 py-6 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all mt-4"
                  asChild
                >
                  <Link
                    href="https://discord.com/api/oauth2/authorize?client_id=1234592539324059709&permissions=37080065&scope=bot"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add to Discord
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

// Desktop NavLink component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} passHref>
      <motion.span
        className="text-gray-200 hover:text-white text-lg font-medium relative cursor-pointer"
        whileHover="hover"
      >
        {children}
        <motion.span
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 rounded-full"
          initial={{ width: 0 }}
          variants={{
            hover: { width: "100%" },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} passHref onClick={onClick}>
      <motion.span
        className="text-white text-2xl font-bold relative cursor-pointer"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
