"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Twitter,
  Globe,
  Mail,
  MessageSquare,
  Heart,
  Music,
  Headphones,
  Volume2,
  Disc,
  ListMusic
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Music Bot",
      links: [
        { name: "Features", href: "#features" },
        { name: "Commands", href: "#commands" },
      ],
    }
  ];

  const socialLinks = [
    { name: "Discord", icon: <MessageSquare className="w-5 h-5" />, href: "https://discord.com/invite/hBvdRJgXzM"}
  ];

  const musicFeatures = [
    { name: "High-Definition Audio", icon: <Headphones className="w-4 h-4 mr-1" />, color: "orange" },
    { name: "Spotify Integration", icon: <Disc className="w-4 h-4 mr-1" />, color: "green" },
    { name: "Audio Filters", icon: <Volume2 className="w-4 h-4 mr-1" />, color: "blue" },
    { name: "24/7 Playback", icon: <Music className="w-4 h-4 mr-1" />, color: "red" },
    { name: "Advanced Queue", icon: <ListMusic className="w-4 h-4 mr-1" />, color: "purple" },
  ];

  const footerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-[#080810] border-t border-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <motion.div
          className="absolute top-10 left-1/4 w-64 h-64 bg-orange-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-64 h-64 bg-red-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1
          }}
        />

        {/* Music visualizer bars */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`footer-wave-${i}`}
              className="w-1 mx-px bg-orange-500/40 rounded-t-md"
              initial={{ height: 0 }}
              animate={{
                height: Math.random() * 16 + 2
              }}
              transition={{
                duration: 0.7 + Math.random() * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.02 % 0.4,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Brand Column */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <motion.div
                className="relative w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg z-0"
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 0 8px rgba(239, 68, 68, 0.1)", "0 0 0 0 rgba(239, 68, 68, 0)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY
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
              <motion.span
                className="text-white font-bold text-xl"
                whileHover={{
                  color: "#f97316",
                  transition: { duration: 0.2 }
                }}
              >
                nothing
              </motion.span>
            </Link>
            <p className="text-gray-400 mb-8 max-w-md">
              Elevate your Discord server with <span className="text-orange-400 font-semibold">nothing</span> - a premium music bot with high-quality audio, Spotify integration, advanced filters and seamless playback for the ultimate music experience.
            </p>

            {/* Animated Features Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {musicFeatures.map((feature, index) => (
                <motion.span
                  key={feature.name}
                  className={`px-3 py-1 bg-${feature.color}-500/10 text-${feature.color}-400 rounded-full text-sm flex items-center`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                >
                  {feature.icon}
                  {feature.name}
                </motion.span>
              ))}
            </div>

            {/* Developer Credits */}
            <div className="mb-6 bg-orange-950/10 p-3 rounded-lg border border-orange-500/10">
              <p className="text-gray-400 text-sm mb-2">Website Developed with <Heart className="inline-block w-3 h-3 text-red-500 mx-1" /> by:</p>
              <div className="flex gap-4">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">B</div>
                  <span className="text-gray-300 text-sm">bre4d77</span>
                </motion.div>
              </div>
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h3 className="text-white font-bold mb-5 flex items-center">
                <motion.span
                  className="inline-block w-1.5 h-4 bg-orange-500 rounded-full mr-2"
                  animate={{
                    height: [12, 18, 12],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse"
                  }}
                />
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors flex items-center"
                    >
                      <motion.span
                        className="mr-1 opacity-0 w-0 transition-all duration-300"
                        whileHover={{
                          width: "12px",
                          opacity: 1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        &rarr;
                      </motion.span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} nothing. All rights reserved.
          </p>

          <div className="text-gray-500 text-sm flex items-center">
            <span className="mr-2">Powered by</span>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-orange-400 font-medium">Discord</span>
              <span className="mx-1">+</span>
              <span className="text-green-500 font-medium">Spotify</span>
              <Heart className="inline-block w-3 h-3 text-red-500 mx-1.5" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
