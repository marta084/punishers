// app/routes/index.jsx

import { useState } from 'react';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import logo from '../assets/logo.png'

export const loader = async () => {
  const categories = ['11U Fall Ball Heat', '10U Punishers', '9U Punishers'];
  const videos = {
    '11U Fall Ball Heat': [
      { id: 'fh1', title: 'Game Highlights vs Wildcats', date: '2024-07-15', youtubeId: 'I7j4_yKdRGs' },
      { id: 'fh2', title: 'Practice Drills', date: '2024-07-16', youtubeId: 'I7j4_yKdRGs' }, { id: 'fh1', title: 'Game Highlights vs Wildcats', date: '2024-07-15', youtubeId: 'I7j4_yKdRGs' },
      { id: 'fh2', title: 'Practice Drills', date: '2024-07-16', youtubeId: 'I7j4_yKdRGs' },
    ],
    '10U Punishers': [
      { id: 'p10-1', title: 'Championship Game', date: '2024-07-17', youtubeId: 'wNN3WGF8cMk' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'wNN3WGF8cMk' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'wNN3WGF8cMk' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'wNN3WGF8cMk' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'wNN3WGF8cMk' },
    ],
    '9U Punishers': [
      { id: 'p9-1', title: 'Defensive Plays Breakdown', date: '2024-07-19', youtubeId: 'ho4L-m6VRjo' },
      { id: 'p9-2', title: 'Team Building Exercises', date: '2024-07-20', youtubeId: 'ho4L-m6VRjo' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'ho4L-m6VRjo' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'ho4L-m6VRjo' },
      { id: 'p10-2', title: 'Offensive Strategies', date: '2024-07-18', youtubeId: 'ho4L-m6VRjo' },
    ]
  };

  return json({ categories, videos });
};

function VideoPlayer({ video, isOpen, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
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
              <div className="mt-4">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                  {video.title}
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-400">{video.date}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

function Logo() {
  return (
    <div className="flex items-center justify-center mb-8">
     <img src={logo} alt="" />
      <h1 className="text-2xl font-bold ml-4 text-gray-100">Youth Football Analysis</h1>
    </div>
  );
}

export default function Index() {
  const { categories, videos } = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen bg-black text-gray-100 py-8 px-4">
      <Logo />
      
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 text-lg font-semibold rounded-full transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos[selectedCategory].map((video) => (
            <div 
              key={video.id}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
              onClick={() => setSelectedVideo(video)}
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
                <h3 className="font-semibold text-lg mb-1 text-gray-100">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo} 
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
}