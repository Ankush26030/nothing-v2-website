"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Copy, Check, Music, Headphones, LineChart, Sliders, Volume2, Disc, User, Info, Users, HelpCircle, Bot, Heart, Globe, ListMusic, Settings, Equalizer } from "lucide-react";

// Add Command type definition
interface Command {
  name: string;
  syntax: string;
  description: string;
  example: string;
  args: string;
}

// Command categories with their respective commands
const commandCategories = [
  {
    name: "General",
    icon: "🤖",
    description: "Basic commands for bot interaction and information",
    commands: [
      {
        name: "!!bio",
        syntax: "!!bio",
        description: "View the bot's biography",
        example: "!!bio",
        args: "None"
      },
      {
        name: "!!help",
        syntax: "!!help [command]",
        description: "Display help information for commands",
        example: "!!help play",
        args: "[command] - (Optional) Show help for specific command"
      },
      {
        name: "!!report",
        syntax: "!!report <issue>",
        description: "Report an issue with the bot",
        example: "!!report Song is not playing",
        args: "<issue> - The issue you want to report"
      },
      {
        name: "!!invite",
        syntax: "!!invite",
        description: "Get an invite link for the bot",
        example: "!!invite",
        args: "None"
      },
      {
        name: "!!ping",
        syntax: "!!ping",
        description: "Check the bot's latency",
        example: "!!ping",
        args: "None"
      },
      {
        name: "!!uptime",
        syntax: "!!uptime",
        description: "Check how long the bot has been online",
        example: "!!uptime",
        args: "None"
      },
      {
        name: "!!profile",
        syntax: "!!profile",
        description: "View your user profile",
        example: "!!profile",
        args: "None"
      },
      {
        name: "!!stats",
        syntax: "!!stats",
        description: "View bot statistics",
        example: "!!stats",
        args: "None"
      },
      {
        name: "!!about",
        syntax: "!!about",
        description: "Information about the bot",
        example: "!!about",
        args: "None"
      },
      {
        name: "!!vote",
        syntax: "!!vote",
        description: "Vote for the bot",
        example: "!!vote",
        args: "None"
      },
      {
        name: "!!checkvote",
        syntax: "!!checkvote",
        description: "Check your voting status",
        example: "!!checkvote",
        args: "None"
      },
      {
        name: "!!support",
        syntax: "!!support",
        description: "Get support for the bot",
        example: "!!support",
        args: "None"
      },
      {
        name: "!!team",
        syntax: "!!team",
        description: "View the bot's development team",
        example: "!!team",
        args: "None"
      }
    ]
  },
  {
    name: "Music",
    icon: "🎵",
    description: "Play and control music in voice channels",
    commands: [
      {
        name: "!!247",
        syntax: "!!247",
        description: "Keep the bot in the voice channel 24/7",
        example: "!!247",
        args: "None"
      },
      {
        name: "!!autoplay",
        syntax: "!!autoplay",
        description: "Toggle autoplay feature",
        example: "!!autoplay",
        args: "None"
      },
      {
        name: "!!clearqueue",
        syntax: "!!clearqueue",
        description: "Clear the current queue",
        example: "!!clearqueue",
        args: "None"
      },
      {
        name: "!!join",
        syntax: "!!join",
        description: "Join your voice channel",
        example: "!!join",
        args: "None"
      },
      {
        name: "!!leave",
        syntax: "!!leave",
        description: "Leave the voice channel",
        example: "!!leave",
        args: "None"
      },
      {
        name: "!!forceskip",
        syntax: "!!forceskip",
        description: "Force skip the current song",
        example: "!!forceskip",
        args: "None"
      },
      {
        name: "!!seek",
        syntax: "!!seek <time>",
        description: "Seek to a specific position in the current song",
        example: "!!seek 1:30",
        args: "<time> - Time in format 1:30 or 90 (seconds)"
      },
      {
        name: "!!grab",
        syntax: "!!grab",
        description: "Save the current song to your DMs",
        example: "!!grab",
        args: "None"
      },
      {
        name: "!!loop",
        syntax: "!!loop [mode]",
        description: "Set the loop mode (none, track, queue)",
        example: "!!loop queue",
        args: "[mode] - (Optional) Loop mode: none, track, queue"
      },
      {
        name: "!!move",
        syntax: "!!move <from> <to>",
        description: "Move a song in the queue",
        example: "!!move 3 1",
        args: "<from> <to> - Position numbers in queue"
      },
      {
        name: "!!nowplaying",
        syntax: "!!nowplaying",
        description: "Show details about the song currently playing",
        example: "!!nowplaying",
        args: "None"
      },
      {
        name: "!!pause",
        syntax: "!!pause",
        description: "Pause the current playback",
        example: "!!pause",
        args: "None"
      },
      {
        name: "!!play",
        syntax: "!!play <search term | URL>",
        description: "Play a song from YouTube, Spotify, or direct URL",
        example: "!!play Never Gonna Give You Up",
        args: "<search term | URL> - Song to search for or direct link"
      },
      {
        name: "!!queue",
        syntax: "!!queue [page]",
        description: "View songs in the current queue",
        example: "!!queue 2",
        args: "[page] - (Optional) Page number to view"
      },
      {
        name: "!!remove",
        syntax: "!!remove <position>",
        description: "Remove a song from the queue",
        example: "!!remove 3",
        args: "<position> - Position in queue to remove"
      },
      {
        name: "!!removedupes",
        syntax: "!!removedupes",
        description: "Remove duplicate songs from the queue",
        example: "!!removedupes",
        args: "None"
      },
      {
        name: "!!replay",
        syntax: "!!replay",
        description: "Replay the current song",
        example: "!!replay",
        args: "None"
      },
      {
        name: "!!resume",
        syntax: "!!resume",
        description: "Resume the current playback",
        example: "!!resume",
        args: "None"
      },
      {
        name: "!!rewind",
        syntax: "!!rewind",
        description: "Rewind the current song",
        example: "!!rewind",
        args: "None"
      },
      {
        name: "!!search",
        syntax: "!!search <query>",
        description: "Search for songs",
        example: "!!search lofi beats",
        args: "<query> - Search term"
      },
      {
        name: "!!shuffle",
        syntax: "!!shuffle",
        description: "Shuffle the queue",
        example: "!!shuffle",
        args: "None"
      },
      {
        name: "!!skip",
        syntax: "!!skip",
        description: "Skip the current song",
        example: "!!skip",
        args: "None"
      },
      {
        name: "!!skipto",
        syntax: "!!skipto <position>",
        description: "Skip to a specific position in the queue",
        example: "!!skipto 5",
        args: "<position> - Position in queue to skip to"
      },
      {
        name: "!!stop",
        syntax: "!!stop",
        description: "Stop playback and clear the queue",
        example: "!!stop",
        args: "None"
      },
      {
        name: "!!volume",
        syntax: "!!volume <0-150>",
        description: "Adjust the volume of the music",
        example: "!!volume 75",
        args: "<0-150> - Volume level percentage"
      }
    ]
  },
  {
    name: "Filters",
    icon: "🎚️",
    description: "Apply audio filters to enhance your music",
    commands: [
      {
        name: "!!8d",
        syntax: "!!8d",
        description: "Apply 8D audio effect (rotating around head)",
        example: "!!8d",
        args: "None"
      },
      {
        name: "!!bass",
        syntax: "!!bass",
        description: "Enhance the bass in your music",
        example: "!!bass",
        args: "None"
      },
      {
        name: "!!clearfilters",
        syntax: "!!clearfilters",
        description: "Remove all applied filters",
        example: "!!clearfilters",
        args: "None"
      },
      {
        name: "!!dance",
        syntax: "!!dance",
        description: "Apply dance audio effect",
        example: "!!dance",
        args: "None"
      },
      {
        name: "!!earrape",
        syntax: "!!earrape",
        description: "Apply earrape effect (very loud)",
        example: "!!earrape",
        args: "None"
      },
      {
        name: "!!electronic",
        syntax: "!!electronic",
        description: "Apply electronic audio effect",
        example: "!!electronic",
        args: "None"
      },
      {
        name: "!!lofi",
        syntax: "!!lofi",
        description: "Apply lo-fi audio effect",
        example: "!!lofi",
        args: "None"
      },
      {
        name: "!!nightcore",
        syntax: "!!nightcore",
        description: "Apply nightcore effect (higher pitch/speed)",
        example: "!!nightcore",
        args: "None"
      },
      {
        name: "!!party",
        syntax: "!!party",
        description: "Apply party audio effect",
        example: "!!party",
        args: "None"
      },
      {
        name: "!!pop",
        syntax: "!!pop",
        description: "Apply pop audio effect",
        example: "!!pop",
        args: "None"
      },
      {
        name: "!!radio",
        syntax: "!!radio",
        description: "Apply radio audio effect",
        example: "!!radio",
        args: "None"
      },
      {
        name: "!!rock",
        syntax: "!!rock",
        description: "Apply rock audio effect",
        example: "!!rock",
        args: "None"
      },
      {
        name: "!!slowreverb",
        syntax: "!!slowreverb",
        description: "Apply slow reverb effect",
        example: "!!slowreverb",
        args: "None"
      },
      {
        name: "!!treblebass",
        syntax: "!!treblebass",
        description: "Enhance treble and bass",
        example: "!!treblebass",
        args: "None"
      },
      {
        name: "!!vaporwave",
        syntax: "!!vaporwave",
        description: "Apply vaporwave effect (slower pitch/speed)",
        example: "!!vaporwave",
        args: "None"
      },
      {
        name: "!!darthvader",
        syntax: "!!darthvader",
        description: "Apply Darth Vader voice effect",
        example: "!!darthvader",
        args: "None"
      }
    ]
  },
  {
    name: "Playlist",
    icon: "📋",
    description: "Manage your personal playlists",
    commands: [
      {
        name: "!!pl-add",
        syntax: "!!pl-add <name> <search/URL>",
        description: "Add a song to a playlist",
        example: "!!pl-add MyFavorites Never Gonna Give You Up",
        args: "<name> <search/URL> - Playlist name and song to add"
      },
      {
        name: "!!pl-addnowplaying",
        syntax: "!!pl-addnowplaying <name>",
        description: "Add the currently playing song to a playlist",
        example: "!!pl-addnowplaying MyFavorites",
        args: "<name> - Playlist name"
      },
      {
        name: "!!pl-addqueue",
        syntax: "!!pl-addqueue <name>",
        description: "Add all songs in the queue to a playlist",
        example: "!!pl-addqueue MyFavorites",
        args: "<name> - Playlist name"
      },
      {
        name: "!!pl-create",
        syntax: "!!pl-create <name>",
        description: "Create a new playlist",
        example: "!!pl-create MyFavorites",
        args: "<name> - Playlist name"
      },
      {
        name: "!!pl-delete",
        syntax: "!!pl-delete <name>",
        description: "Delete a playlist",
        example: "!!pl-delete MyFavorites",
        args: "<name> - Playlist name"
      },
      {
        name: "!!pl-dupes",
        syntax: "!!pl-dupes <name>",
        description: "Remove duplicate songs from a playlist",
        example: "!!pl-dupes MyFavorites",
        args: "<name> - Playlist name"
      },
      {
        name: "!!pl-info",
        syntax: "!!pl-info <name>",
        description: "View information about a playlist",
        example: "!!pl-info MyFavorites",
        args: "<name> - Playlist name"
      },
      {
        name: "!!pl-list",
        syntax: "!!pl-list",
        description: "List all of your playlists",
        example: "!!pl-list",
        args: "None"
      },
      {
        name: "!!pl-load",
        syntax: "!!pl-load <name>",
        description: "Load a playlist into the queue",
        example: "!!pl-load MyFavorites",
        args: "<name> - Playlist name"
      },
      {
        name: "!!pl-remove",
        syntax: "!!pl-remove <name> <position>",
        description: "Remove a song from a playlist",
        example: "!!pl-remove MyFavorites 3",
        args: "<name> <position> - Playlist name and song position"
      }
    ]
  },
  {
    name: "Settings",
    icon: "⚙️",
    description: "Configure the bot for your server",
    commands: [
      {
        name: "!!afk",
        syntax: "!!afk [message]",
        description: "Set yourself as AFK",
        example: "!!afk Be back soon",
        args: "[message] - (Optional) Your away message"
      },
      {
        name: "!!prefix",
        syntax: "!!prefix <new prefix>",
        description: "Change the bot's command prefix for your server",
        example: "!!prefix >",
        args: "<new prefix> - New command prefix"
      },
      {
        name: "!!ignorechannel",
        syntax: "!!ignorechannel [channel]",
        description: "Set the bot to ignore commands in specific channels",
        example: "!!ignorechannel #general",
        args: "[channel] - (Optional) Channel to ignore, defaults to current channel"
      },
      {
        name: "!!partner",
        syntax: "!!partner",
        description: "Information about becoming a partner",
        example: "!!partner",
        args: "None"
      }
    ]
  },
  {
    name: "Sources",
    icon: "🎧",
    description: "Configure music sources for the bot",
    commands: [
      {
        name: "!!sources",
        syntax: "!!sources",
        description: "View all available music sources",
        example: "!!sources",
        args: "None"
      },
      {
        name: "!!src-soundcloud",
        syntax: "!!src-soundcloud <enable/disable>",
        description: "Enable or disable SoundCloud as a music source",
        example: "!!src-soundcloud enable",
        args: "<enable/disable> - Enable or disable the source"
      },
      {
        name: "!!src-spotify",
        syntax: "!!src-spotify <enable/disable>",
        description: "Enable or disable Spotify as a music source",
        example: "!!src-spotify enable",
        args: "<enable/disable> - Enable or disable the source"
      },
      {
        name: "!!src-youtube",
        syntax: "!!src-youtube <enable/disable>",
        description: "Enable or disable YouTube as a music source",
        example: "!!src-youtube enable",
        args: "<enable/disable> - Enable or disable the source"
      },
      {
        name: "!!src-jiosaavn",
        syntax: "!!src-jiosaavn <enable/disable>",
        description: "Enable or disable JioSaavn as a music source",
        example: "!!src-jiosaavn enable",
        args: "<enable/disable> - Enable or disable the source"
      },
      {
        name: "!!src-deezer",
        syntax: "!!src-deezer <enable/disable>",
        description: "Enable or disable Deezer as a music source",
        example: "!!src-deezer enable",
        args: "<enable/disable> - Enable or disable the source"
      }
    ]
  },
  {
    name: "Spotify",
    icon: "💚",
    description: "Spotify-specific commands and features",
    commands: [
      {
        name: "!!spotify login",
        syntax: "!!spotify login",
        description: "Link your Spotify account",
        example: "!!spotify login",
        args: "None"
      },
      {
        name: "!!spotify profile",
        syntax: "!!spotify profile",
        description: "View your Spotify profile",
        example: "!!spotify profile",
        args: "None"
      },
      {
        name: "!!spotify playlist",
        syntax: "!!spotify playlist <name/URL>",
        description: "Play a Spotify playlist",
        example: "!!spotify playlist Top Hits 2023",
        args: "<name/URL> - Playlist name or direct URL"
      },
      {
        name: "!!searchplaylist",
        syntax: "!!searchplaylist <query>",
        description: "Search for Spotify playlists",
        example: "!!searchplaylist lofi beats",
        args: "<query> - Search term for playlists"
      },
      {
        name: "!!spotify logout",
        syntax: "!!spotify logout",
        description: "Unlink your Spotify account",
        example: "!!spotify logout",
        args: "None"
      }
    ]
  },
  {
    name: "Favourite",
    icon: "❤️",
    description: "Manage your favorite songs",
    commands: [
      {
        name: "!!like",
        syntax: "!!like",
        description: "Add the current song to your liked songs",
        example: "!!like",
        args: "None"
      },
      {
        name: "!!playliked",
        syntax: "!!playliked",
        description: "Play your liked songs",
        example: "!!playliked",
        args: "None"
      }
    ]
  },
  {
    name: "Global Playlist",
    icon: "🌐",
    description: "Manage global playlists accessible by all users",
    commands: [
      {
        name: "!!gpl-all",
        syntax: "!!gpl-all",
        description: "View all global playlists",
        example: "!!gpl-all",
        args: "None"
      },
      {
        name: "!!gpl-create",
        syntax: "!!gpl-create <name>",
        description: "Create a new global playlist",
        example: "!!gpl-create PopHits",
        args: "<name> - Global playlist name"
      },
      {
        name: "!!gpl-delete",
        syntax: "!!gpl-delete <name>",
        description: "Delete a global playlist",
        example: "!!gpl-delete PopHits",
        args: "<name> - Global playlist name"
      },
      {
        name: "!!gpl-info",
        syntax: "!!gpl-info <name>",
        description: "View information about a global playlist",
        example: "!!gpl-info PopHits",
        args: "<name> - Global playlist name"
      },
      {
        name: "!!gpl-m",
        syntax: "!!gpl-m <name>",
        description: "Modify a global playlist",
        example: "!!gpl-m PopHits",
        args: "<name> - Global playlist name"
      }
    ]
  }
];

export default function CommandsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeCommand, setActiveCommand] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedCommand, setCopiedCommand] = useState("");
  const [filteredCommands, setFilteredCommands] = useState(commandCategories);

  // Search functionality
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCommands(commandCategories);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filter categories and their commands based on search
    const filtered = commandCategories
      .map(category => ({
        ...category,
        commands: category.commands.filter(cmd =>
          cmd.name.toLowerCase().includes(lowerSearchTerm) ||
          cmd.description.toLowerCase().includes(lowerSearchTerm)
        )
      }))
      .filter(category => category.commands.length > 0);

    setFilteredCommands(filtered);

    // Set active category to the first one that has matching commands
    if (filtered.length > 0) {
      setActiveCategory(0);
      setActiveCommand(0);
    }
  }, [searchTerm]);

  // Handle command copy
  const handleCopyCommand = (command: Command) => {
    navigator.clipboard.writeText(command.syntax);
    setCopiedCommand(command.name);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedCommand("");
    }, 2000);
  };

  // Get icon for category
  const getCategoryIcon = (name: string) => {
    switch(name) {
      case "General":
        return <Bot className="text-orange-500" />;
      case "Music":
        return <Music className="text-orange-500" />;
      case "Filters":
        return <Sliders className="text-orange-500" />;
      case "Playlist":
        return <ListMusic className="text-orange-500" />;
      case "Settings":
        return <Settings className="text-orange-500" />;
      case "Sources":
        return <Headphones className="text-orange-500" />;
      case "Spotify":
        return <Disc className="text-green-500" />;
      case "Favourite":
        return <Heart className="text-pink-500" />;
      case "Global Playlist":
        return <Globe className="text-orange-500" />;
      default:
        return <Headphones className="text-orange-500" />;
    }
  };

  return (
    <section id="commands" className="py-24 bg-[#07070a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0a0a0d] to-transparent" />
      <div className="absolute left-0 top-40 w-40 h-80 bg-orange-700/10 rounded-full filter blur-[80px]" />
      <div className="absolute right-0 bottom-40 w-40 h-80 bg-red-700/10 rounded-full filter blur-[80px]" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            NOTHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">- All Commands</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            All commands use prefix <span className="text-orange-400 font-bold inline-block bg-orange-900/20 px-2 py-0.5 rounded">!!</span> by default.
            See examples and required arguments.
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredCommands.length > 0 ? (
          <div className="bg-[#16161d] rounded-2xl border border-gray-800 overflow-hidden shadow-xl shadow-orange-900/10">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Categories Sidebar */}
              <div className="md:col-span-3 border-r border-gray-800">
                <div className="py-4">
                  {filteredCommands.map((category, index) => (
                    <motion.button
                      key={category.name}
                      className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-colors ${
                        activeCategory === index
                          ? "bg-orange-500/10 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }`}
                      onClick={() => {
                        setActiveCategory(index);
                        setActiveCommand(0);
                      }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: activeCategory === index ? 360 : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-2xl mr-2"
                      >
                        {getCategoryIcon(category.name)}
                      </motion.div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-500">{category.commands.length} commands</p>
                      </div>
                      {activeCategory === index && (
                        <ChevronRight className="ml-auto h-5 w-5 text-orange-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Command List */}
              <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-12 h-full">
                {/* Commands Menu */}
                <div className="md:col-span-4 border-r border-gray-800 max-h-[600px] overflow-y-auto">
                  {filteredCommands[activeCategory]?.commands.map((command, index) => (
                    <motion.button
                      key={command.name}
                      className={`w-full text-left px-6 py-4 border-b border-gray-800 last:border-b-0 transition-colors ${
                        activeCommand === index
                          ? "bg-orange-500/10 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }`}
                      onClick={() => setActiveCommand(index)}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-mono font-medium">{command.name}</p>
                      <p className="text-sm text-gray-500 truncate">{command.description}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Command Details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${activeCommand}`}
                    className="md:col-span-8 p-6 h-full max-h-[600px] overflow-y-auto"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredCommands[activeCategory]?.commands[activeCommand] && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-2xl font-bold text-white font-mono">
                            {filteredCommands[activeCategory].commands[activeCommand].name}
                          </h3>
                          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                            {filteredCommands[activeCategory].name}
                          </span>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-gray-400 mb-2 text-sm font-semibold">DESCRIPTION</h4>
                          <p className="text-white">
                            {filteredCommands[activeCategory].commands[activeCommand].description}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-gray-400 mb-2 text-sm font-semibold">SYNTAX</h4>
                          <div className="relative">
                            <div className="bg-gray-800 rounded-lg p-4 font-mono text-white">
                              {filteredCommands[activeCategory].commands[activeCommand].syntax}
                            </div>
                            <button
                              className="absolute top-3 right-3 p-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                              onClick={() => handleCopyCommand(filteredCommands[activeCategory].commands[activeCommand])}
                              aria-label="Copy command"
                            >
                              {copiedCommand === filteredCommands[activeCategory].commands[activeCommand].name ? (
                                <Check className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-gray-400 mb-2 text-sm font-semibold">ARGUMENTS</h4>
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-gray-300">
                            {filteredCommands[activeCategory].commands[activeCommand].args}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-gray-400 mb-2 text-sm font-semibold">EXAMPLE</h4>
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 font-mono text-gray-300">
                            {filteredCommands[activeCategory].commands[activeCommand].example}
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-[#16161d] rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-xl">No commands found matching "{searchTerm}"</p>
            <button
              className="mt-4 text-orange-400 hover:text-orange-300"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
