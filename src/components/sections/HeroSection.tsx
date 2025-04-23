"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, Headphones, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

export default function HeroSection() {
  // Create local discord and spotify logo components for reliability
  const DiscordLogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="#fff" width="30" height="30">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
    </svg>
  );

  const SpotifyLogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="28" viewBox="0 0 300 90">
      <path d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zm20.6 65c-.8 1.3-2.5 1.7-3.8.9-10.3-6.3-23.4-7.7-38.7-4.2-1.5.3-3-.6-3.3-2.1-.3-1.5.6-3 2.1-3.3 16.8-3.8 31.3-2.2 42.9 4.9 1.4.7 1.8 2.4.8 3.8zm5.5-12.3c-1 1.6-3.1 2.1-4.7 1.1-11.8-7.3-29.9-9.4-43.9-5.1-1.8.5-3.7-.5-4.2-2.3-.5-1.8.5-3.7 2.3-4.2 16-4.9 36-2.5 49.5 5.8 1.7 1 2.1 3.2 1 4.7zm.5-12.7c-14.2-8.4-37.5-9.2-51.1-5.1-2.2.7-4.5-.6-5.1-2.8-.7-2.2.6-4.5 2.8-5.1 15.5-4.7 41.3-3.8 57.6 5.9 2 1.2 2.7 3.8 1.5 5.8-1.2 2-3.7 2.7-5.7 1.3z" fill="#1ED760"/>
      <path d="M112.5 30.4h9.1v42.2h-9.1zM122.4 47.3c0-9.6 6.2-15.3 15-15.3 8.8 0.1 14.9 5.9 14.9 15.3 0 9.4-6.2 15.3-14.9 15.3s-15-5.9-15-15.3zm20.7 0c0-5.8-2.3-9.2-5.7-9.2s-5.7 3.4-5.7 9.2c0 5.8 2.3 9.2 5.7 9.2 3.4 0 5.7-3.4 5.7-9.2zM154.3 47.3c0-9.6 6.2-15.3 15-15.3 8.8 0.1 14.9 5.9 14.9 15.3 0 9.4-6.2 15.3-14.9 15.3-8.8 0-15-5.9-15-15.3zm20.7 0c0-5.8-2.3-9.2-5.7-9.2s-5.7 3.4-5.7 9.2c0 5.8 2.3 9.2 5.7 9.2 3.4 0 5.7-3.4 5.7-9.2zM186.4 32.7h8.5v3.6c2-2.5 5-4.2 9.1-4.2 7.5 0 11.6 5 11.6 13.2v27.3h-8.5V47c0-4.6-2.2-7-5.9-7-3.4 0-5.8 2.4-5.8 7v25.5h-8.5l-0.5-39.8zM220.8 60.5V40.1h-4.9v-7.5h4.9v-8.3h8.5v8.3h8v7.5h-8v18.3c0 2.5 1.3 3.7 3.6 3.7 1.4 0 3.2-0.5 4.4-1.1v7.2c-1.7 1-4.2 1.5-7.3 1.5-5.8 0.2-9.2-2.8-9.2-9.2zM240.1 32.7h8.5v4.3c1.8-3 4.8-4.9 9.1-4.9v8.1c-5.7 0-9.1 2.1-9.1 8.2v24h-8.5V32.7zM259.7 32.7h9v3.9c2.1-2.8 5.1-4.5 9.3-4.5 7.5 0 12.5 5.4 12.5 14.7v0.5c0 9.3-5.4 14.7-12.5 14.7-4.1 0-7.1-1.4-9-3.9v16.5h-9.3V32.7zm21.8 14.8c0-5.2-2.3-8-5.9-8-3.4 0-5.8 2.8-5.8 8 0 5.1 2.4 7.9 5.8 7.9 3.6 0 5.9-2.9 5.9-7.9z" fill="white"/>
    </svg>
  );

  // Shine effect position tracking
  const { x, y } = useMousePosition();
  const controls = useAnimation();

  // 3D floating music notes animation setup
  const notesVariants = {
    initial: { opacity: 0, scale: 0, y: 10 },
    animate: {
      opacity: [0, 1, 0.8, 0],
      scale: [0, 1, 0.9, 0.7],
      y: [10, -40, -100, -160],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: Math.random() * 2 }
    }
  };

  useEffect(() => {
    if (x !== null && y !== null) {
      controls.start({ x: x/20, y: y/20, transition: { type: 'spring', damping: 50 } });
    }
  }, [x, y, controls]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-orange-950 to-[#07070a] overflow-hidden flex flex-col justify-center">
      {/* 3D Music visualizer background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-20 flex items-end justify-center px-8">
          {[...Array(32)].map((_, i) => (
            <motion.div
              key={`bar-${i}`}
              className="w-2 mx-0.5 bg-orange-500/40 rounded-t-md"
              initial={{ height: 4 }}
              animate={{
                height: Math.random() * 60 + 5
              }}
              transition={{
                duration: 0.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.05 % 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating music notes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`note-${i+1}`}
          className="absolute z-10"
          style={{
            left: `${10 + (i * 12)}%`,
            bottom: '120px',
            opacity: 0
          }}
          variants={notesVariants}
          initial="initial"
          animate="animate"
          custom={i}
        >
          {i % 2 === 0 ?
            <Music className="text-orange-400/60 w-6 h-6" /> :
            <Headphones className="text-orange-300/60 w-6 h-6" />
          }
        </motion.div>
      ))}

      {/* Background animated gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-orange-600/20 rounded-full filter blur-[120px] animate-blob1" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-red-600/20 rounded-full filter blur-[120px] animate-blob2" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000d0] z-0" />

      {/* Animated sparkles overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.2 }}
      >
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`sparkle-${i+1}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-6 py-24 relative z-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Animated Discord + Spotify logos */}
          <div className="mb-8 flex gap-5 justify-center items-center">
            <motion.div
              initial={{ y: -40, scale: 0.8, rotate: -12 }}
              animate={{ y: 0, scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.35, duration: 1 }}
              whileHover={{ scale: 1.15, rotate: 7 }}
              className="shadow-glow border border-orange-500/30 rounded-full p-3 bg-background/70 flex items-center justify-center w-16 h-16"
            >
              <DiscordLogoIcon />
            </motion.div>
            <motion.div
              className="relative flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-orange-600/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 p-1"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
              >
                <div className="flex items-center justify-center w-full h-full rounded-full bg-background/80">
                  <Image
                    src="/Assets/logo.gif"
                    alt="NOTHING Logo"
                    width={60}
                    height={60}
                    className="z-10"
                  />
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ y: 40, scale: 0.8, rotate: 12 }}
              animate={{ y: 0, scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.35, duration: 1.1 }}
              whileHover={{ scale: 1.13, rotate: -7 }}
              className="shadow-glow border border-green-600/30 rounded-full p-3 bg-background/60 flex items-center justify-center h-16"
            >
              <SpotifyLogoIcon />
            </motion.div>
          </div>

          {/* Animated shine effect overlay */}
          <motion.div
            className="absolute w-full max-w-2xl h-40 bg-gradient-radial from-orange-500/10 to-transparent rounded-full blur-3xl z-0"
            animate={controls}
          />

          {/* Animated big hero title: "nothing" bot */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.27 }}
          >
            Meet <span className="text-transparent text-gradient font-black">nothing</span> — Your Music, Your Vibe, One Discord Bot
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200/90 mb-10 max-w-3xl font-medium drop-shadow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.41 }}
          >
            Premium Spotify music, ultra high-quality audio, custom playlists, blazing-fast filters, and full control with one prefix: <span className="text-orange-400 font-bold">!!</span>. 100% made for Discord.
          </motion.p>

          {/* Hero animated buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.55, delay: 1 }}
            >
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-800 focus:ring-4 focus:ring-orange-500/40 text-white font-bold rounded-full px-12 py-6 text-lg leading-none shadow-xl shadow-orange-600/20 hover:shadow-orange-600/40 transition-all group scale-100 hover:scale-105 active:scale-95"
                size="lg"
                asChild
              >
                <Link href="https://discord.com/api/oauth2/authorize?client_id=1234592539324059709&permissions=37080065&scope=bot">
                  <span className="flex gap-2 items-center">
                    <DiscordLogoIcon />
                    Add to Discord
                  </span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", bounce: 0.36, duration: 0.59, delay: 1.11 }}
            >
              <Button
                className="bg-gradient-to-r from-zinc-800 to-orange-950 hover:from-zinc-900 hover:to-orange-900 text-white border-[2px] border-orange-900/30 font-medium rounded-full px-12 py-6 transition-all text-lg"
                size="lg"
                asChild
              >
                <Link href="#commands">
                  See Music Commands
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Dev avatars/credits row */}
          <motion.div
            className="flex gap-6 justify-center mt-6 mb-5 z-30"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {/* Dev credit cards with proper attribution */}
            <motion.div
              className="flex flex-row gap-3 items-center bg-orange-950/30 rounded-xl py-2 px-4 border border-orange-500/20"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="shadow-glow bg-orange-600/20 rounded-full w-12 h-12 flex items-center justify-center"
                animate={{ boxShadow: ["0 0 15px 5px rgba(237, 88, 58, 0.1)", "0 0 15px 10px rgba(237, 88, 58, 0.25)", "0 0 15px 5px rgba(237, 88, 58, 0.1)"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-orange-300 font-bold text-xl">A</span>
              </motion.div>
              <div className="text-white/90 text-sm font-semibold text-left">
                Ankush <span className="text-xs text-orange-300 font-normal ml-2">main developer</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-row gap-3 items-center bg-orange-950/30 rounded-xl py-2 px-4 border border-orange-500/20"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="shadow-glow bg-orange-500/20 rounded-full w-12 h-12 flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-orange-300 font-bold text-md">bre4d77</span>
              </motion.div>
              <div className="text-white/90 text-sm font-semibold text-left">
                bre4d77 <span className="text-xs text-orange-200 font-normal ml-2">UI/UX, frontend, sites</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll down chevron */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse', repeatDelay: 0.19 }}
          >
            <a href="#features" className="text-orange-400/50 hover:text-orange-400/90 transition-colors">
              <div className="flex flex-col items-center">
                <span className="mb-2 text-xs">Scroll to explore</span>
                <ChevronDown size={22} />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
