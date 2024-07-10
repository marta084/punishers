
import React, { useState, useEffect } from 'react';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export const loader = async () => {
  const categories = ['11U Fall Ball Heat', '10U Punishers', '9U Punishers'];
  const videos = {
    '11U Fall Ball Heat': [
      { id: 'fh1', title: 'Game Highlights vs Wildcats', date: '2024-07-15', youtubeId: 'I7j4_yKdRGs' },
      { id: 'fh2', title: 'Practice Drills', date: '2024-07-16', youtubeId: 'I7j4_yKdRGs' },
      { id: 'fh3', title: 'Team Strategy Session', date: '2024-07-17', youtubeId: 'I7j4_yKdRGs' },
      { id: 'fh4', title: 'Player Interviews', date: '2024-07-18', youtubeId: 'I7j4_yKdRGs' },
    ],
    '10U Punishers': [
      { id: 'p10-1', title: 'Championship Game', date: '2024-07-17', youtubeId: 'wNN3WGF8cMk' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'wNN3WGF8cMk' },
      { id: 'p10-3', title: 'Defensive Tactics', date: '2024-07-19', youtubeId: 'wNN3WGF8cMk' },
      { id: 'p10-4', title: 'Special Teams Breakdown', date: '2024-07-20', youtubeId: 'wNN3WGF8cMk' },
    ],
    '9U Punishers': [
      { id: 'p9-1', title: 'Defensive Plays Breakdown', date: '2024-07-19', youtubeId: 'ho4L-m6VRjo' },
      { id: 'p9-2', title: 'Team Building Exercises', date: '2024-07-20', youtubeId: 'ho4L-m6VRjo' },
      { id: 'p9-3', title: 'Skill Development Drills', date: '2024-07-21', youtubeId: 'ho4L-m6VRjo' },
      { id: 'p9-4', title: 'Game Day Preparation', date: '2024-07-22', youtubeId: 'ho4L-m6VRjo' },
    ]
  };

  return json({ categories, videos });
};

const Logo: React.FC = () => (
  <div className="flex items-center justify-center mb-8">
    <img src={logo} alt="Logo" className="h-24 w-auto" />
    <h1 className="text-4xl font-bold ml-4 text-blue-300">Youth Football Replays</h1>
  </div>
);

const CategoryButton: React.FC<{ category: string; isSelected: boolean; onClick: () => void }> = ({ category, isSelected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-6 py-3 text-lg font-semibold rounded-full transition-colors duration-200 ${
      isSelected
        ? 'bg-blue-600 text-white'
        : 'bg-gray-800 text-blue-300 hover:bg-gray-700'
    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
  >
    {category}
  </motion.button>
);

const VideoCard: React.FC<{ video: any }> = ({ video }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
  >
    <div className="relative pt-[56.25%]">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-1 text-blue-300">{video.title}</h3>
      <p className="text-sm text-gray-400">{video.date}</p>
    </div>
  </motion.div>
);

export default function Index() {
  const { categories, videos } = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    setFilteredVideos(videos[selectedCategory]);
  }, [selectedCategory, videos]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <Logo />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>

        <AnimatePresence>
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}