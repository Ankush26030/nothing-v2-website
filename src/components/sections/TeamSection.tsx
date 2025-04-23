"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Globe } from "lucide-react";

// Developer data
const developers = [
  {
    id: "ankuh",
    name: "Ankuh",
    role: "Lead Developer",
    bio: "Creator and main developer of NOTHING bot. Specializes in backend programming, music streaming functionality, and Lavalink integration.",
    image: "/ankush.jpg", // Placeholder - would need an actual image
    links: {
      github: "https://github.com/ankuh",
      twitter: "https://twitter.com/ankuh",
      website: "https://ankuh.dev"
    }
  },
  {
    id: "bre4d77",
    name: "bre4d77",
    role: "UI/UX Developer",
    bio: "Responsible for the bot's UI/UX design, website development, and user experience improvements.",
    image: "/bre4d77.jpg", // Placeholder
    links: {
      github: "https://github.com/bre4d77",
    }
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-[#0f0f13] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0a0a0d] to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full filter blur-[120px]" />
      <div className="absolute top-1/3 left-20 w-64 h-64 bg-red-600/10 rounded-full filter blur-[100px]" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Team</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            The amazing people behind NOTHING's development and maintenance
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.id}
              className="bg-[#16161d] border border-gray-800 rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Developer Image */}
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="h-full w-full bg-gradient-to-br from-orange-600 to-red-700">
                  {/* In a real app, this would be a proper image */}
                  <div className="h-full flex items-center justify-center text-white text-9xl font-bold opacity-20">
                    {dev.name.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Developer Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{dev.name}</h3>
                <p className="text-orange-500 font-medium mb-4">{dev.role}</p>
                <p className="text-gray-400 mb-6">{dev.bio}</p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {dev.links.github && (
                    <a
                      href={dev.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {dev.links.twitter && (
                    <a
                      href={dev.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {dev.links.website && (
                    <a
                      href={dev.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom border animation */}
              <motion.div
                className="h-1 w-0 bg-gradient-to-r from-orange-500 to-red-600 group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                whileInView={{ width: "30%" }}
                whileHover={{ width: "100%" }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
