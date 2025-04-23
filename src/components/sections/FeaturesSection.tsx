"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Music,
  Headphones,
  ListMusic,
  BarChart4,
  Radio,
  Mic2,
  Sparkles,
  Disc,
  Star,
  Equal,
  VolumeX,
  Volume2,
  FastForward,
  Music2,
  LineChart,
  ShieldCheck
} from "lucide-react";

const features = [
  {
    icon: <Spotify className="w-10 h-10 text-orange-500" />,
    title: "Spotify Integration",
    description: "Connect your Spotify account for premium playback, search, playlist import, and seamless song switching.",
    color: "from-green-500 to-green-700",
  },
  {
    icon: <Equal className="w-10 h-10 text-orange-500" />,
    title: "Audio Filters",
    description: "Enhance your music with 16 high-quality audio filters including bass boost, nightcore, 8D, vaporwave, and custom EQ.",
    color: "from-orange-500 to-red-700",
  },
  {
    icon: <ListMusic className="w-10 h-10 text-orange-500" />,
    title: "Advanced Queue",
    description: "Manage your playlist with shuffle, save, load, loop, and drag-and-drop song reordering for the perfect playlist flow.",
    color: "from-orange-500 to-red-700",
  },
];

// Create Spotify custom icon component
function Spotify({ className = "w-6 h-6 text-white" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm5.5 17.435a.748.748 0 01-1.027.257c-2.813-1.722-6.35-2.11-10.517-1.156a.749.749 0 11-.316-1.466c4.557-1.044 8.458-.608 11.604 1.336a.75.75 0 01.256 1.029zm1.474-3.272a.936.936 0 01-1.283.309c-3.223-1.983-8.142-2.557-11.954-1.399a.936.936 0 11-.544-1.79c4.361-1.322 9.792-.682 13.492 1.597.435.267.568.835.289 1.283zm.127-3.403c-3.868-2.297-10.248-2.508-13.941-1.387a1.122 1.122 0 11-.651-2.147c4.248-1.29 11.298-1.04 15.742 1.605a1.122 1.122 0 01-1.15 1.929z"/>
    </svg>
  );
}

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  // Parallax effect for background blobs
  const leftBlobY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rightBlobY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="features" className="py-24 bg-[#0a0a0d] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute left-0 top-40 w-60 h-80 bg-orange-700/10 rounded-full filter blur-[120px]"
        style={{ y: leftBlobY }}
      />
      <motion.div
        className="absolute right-0 bottom-40 w-60 h-80 bg-red-700/10 rounded-full filter blur-[120px]"
        style={{ y: rightBlobY }}
      />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#07070a] to-transparent" />

      {/* Animated music waves background */}
      <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center opacity-10">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="w-1 mx-[2px] bg-orange-500 rounded-t-md"
            initial={{ height: 2 }}
            animate={{
              height: Math.random() * 40 + (i % 3) * 15
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.02,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-3 rounded-full">
              <Music className="w-10 h-10 text-orange-500" />
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Music Features</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything you need for the ultimate Discord music experience with prefix <span className="text-orange-400 font-bold">!!</span>
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              variants={itemVariants}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <div className={`
                h-full rounded-2xl p-8 bg-[#16161d] border border-gray-800
                hover:border-${feature.color.split(" ")[0].replace("from-", "")}
                transition-all duration-300 relative overflow-hidden
              `}>
                {/* Gradient Overlay on Hover */}
                <motion.div
                  className={`
                    absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0
                    transition-opacity duration-300
                  `}
                  animate={{
                    opacity: activeFeature === index ? 0.1 : 0
                  }}
                />

                {/* Icon with animated background */}
                <div className="mb-5 relative">
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-600/20 blur-md"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="p-3 rounded-xl bg-gray-800/50 inline-block relative z-10">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Animated Bottom Gradient Line */}
                <motion.div
                  className={`
                    absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color}
                  `}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Music Player Interface Demo */}
        <motion.div
          className="mt-20 p-8 bg-[#16161d] border border-gray-800 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-4">
                Immersive Audio Experience
              </h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-orange-500/20 p-2 rounded-full mr-3 mt-1">
                    <Headphones className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">High-Definition Audio</h4>
                    <p className="text-gray-400">Studio-quality 320kbps audio with Opus codec and adjustable bitrate for perfect clarity</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-orange-500/20 p-2 rounded-full mr-3 mt-1">
                    <Equal className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Real-time Audio Filters</h4>
                    <p className="text-gray-400">Apply filters instantly during playback with zero lag - bass boost, 8D, nightcore, karaoke and more</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-orange-500/20 p-2 rounded-full mr-3 mt-1">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">24/7 Playback</h4>
                    <p className="text-gray-400">Non-stop music with auto-reconnect and 24/7 mode to keep your server vibing all day</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Animated Player Interface */}
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl" />
              <div className="relative bg-black/50 p-6 rounded-xl border border-gray-700 shadow-xl h-full flex items-center justify-center">
                <div className="bg-[#121212] p-5 rounded-lg w-full max-w-md mx-auto shadow-2xl">
                  {/* Player header */}
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl overflow-hidden relative"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      }}
                    >
                      <Disc className="w-10 h-10" />
                      <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-orange-500/50"></div>
                    </motion.div>
                    <div className="ml-3">
                      <h4 className="font-bold text-white">Now Playing</h4>
                      <motion.p
                        className="text-orange-400 text-sm"
                        animate={{
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY
                        }}
                      >
                        via Spotify Premium
                      </motion.p>
                    </div>
                  </div>

                  {/* Song info */}
                  <div className="mb-4 bg-gray-900/60 p-3 rounded-md">
                    <h5 className="font-medium text-white truncate">
                      Blinding Lights
                    </h5>
                    <p className="text-gray-400 text-sm">The Weeknd • After Hours</p>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{
                          duration: 15,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse"
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>2:15</span>
                      <span>3:42</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-around items-center">
                    <motion.button
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Volume2 size={18} />
                    </motion.button>
                    <motion.button
                      className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: ['0 0 0 0 rgba(237, 88, 58, 0)', '0 0 0 10px rgba(237, 88, 58, 0.3)', '0 0 0 0 rgba(237, 88, 58, 0)']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY
                      }}
                    >
                      <Equal size={18} />
                    </motion.button>
                    <motion.button
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FastForward size={18} />
                    </motion.button>
                  </div>

                  {/* Queue hint */}
                  <div className="mt-5 border-t border-gray-800 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Next in queue (4 songs)</span>
                      <motion.button
                        className="text-xs text-orange-500"
                        whileHover={{ scale: 1.05 }}
                      >
                        View All
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
