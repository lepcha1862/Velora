// 'use client';

// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Play,
//   Pause,
//   Heart,
//   Share2,
//   Bookmark,
//   Clock,
//   User,
//   Calendar,
// } from 'lucide-react';

// // ============================================================
// // 1. Mock Data
// // ============================================================
// const VIDEOS = [
//   {
//     id: 1,
//     title: "The Hidden Monasteries Beyond Tiger's Nest",
//     description:
//       "Discover peaceful monasteries untouched by tourists, where prayer flags whisper ancient prayers and time stands still.",
//     videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
//     thumbnail:
//       "https://images.unsplash.com/photo-1585421514286-efb74c2b432c?w=600&q=80",
//     category: "Culture",
//     duration: "6:12",
//     author: "Tashi Wangmo",
//     date: "April 12, 2025",
//   },
//   {
//     id: 2,
//     title: "The Magic of Bhutan's Tshechu Festivals",
//     description:
//       "Step inside Bhutan's most colorful celebrations filled with sacred dances and centuries-old traditions.",
//     videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
//     thumbnail:
//       "https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=600&q=80",
//     category: "Festivals",
//     duration: "4:45",
//     author: "Karma Dorji",
//     date: "March 28, 2025",
//   },
//   {
//     id: 3,
//     title: "Walking Through the Valleys of Bumthang",
//     description:
//       "Explore one of Bhutan's most spiritual and breathtaking regions, filled with ancient temples and stunning landscapes.",
//     videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
//     thumbnail:
//       "https://images.unsplash.com/photo-1602320128454-1e6a3bfb15e8?w=600&q=80",
//     category: "Adventure",
//     duration: "5:30",
//     author: "Pema Lhamo",
//     date: "March 15, 2025",
//   },
//   {
//     id: 4,
//     title: "A Taste of Bhutan",
//     description:
//       "Experience local dishes, family kitchens, and authentic mountain cuisine that defines Bhutanese culture.",
//     videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
//     thumbnail:
//       "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80",
//     category: "Food",
//     duration: "3:52",
//     author: "Sonam Choden",
//     date: "February 20, 2025",
//   },
//   {
//     id: 5,
//     title: "Sunrise Above the Himalayas",
//     description:
//       "Witness unforgettable golden mornings from Bhutan's mountain passes, where the sun paints the peaks in amber.",
//     videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
//     thumbnail:
//       "https://images.unsplash.com/photo-1587132137052-9fc5b4e1b8b3?w=600&q=80",
//     category: "Nature",
//     duration: "4:18",
//     author: "Jigme Tshering",
//     date: "February 5, 2025",
//   },
//   {
//     id: 6,
//     title: "Why Happiness Matters More Than GDP",
//     description:
//       "Explore Bhutan's unique philosophy of Gross National Happiness and how it shapes the lives of its people.",
//     videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
//     thumbnail:
//       "https://images.unsplash.com/photo-1602320128454-1e6a3bfb15e8?w=600&q=80",
//     category: "Spirituality",
//     duration: "7:02",
//     author: "Chimi Yangzom",
//     date: "January 18, 2025",
//   },
// ];

// // ============================================================
// // 2. Main Component
// // ============================================================
// export default function VideoBlog() {
//   const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Handle play/pause
//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // When video changes, autoplay
//     const handleVideoChange = (video) => {
//     setActiveVideo(video);
//     setIsPlaying(true);
//     };

//   return (
//     <section className="w-full bg-gray-50 py-12 dark:bg-gray-950 md:py-16">
//       <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-10"
//         >
//           <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:bg-primary/20">
//             Video Stories
//           </span>
//           <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
//             {"Watch Bhutan's Hidden Stories"}
//           </h2>
//         </motion.div>

//         {/* Main Layout */}
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* ---------- Left: Main Video Player (65%) ---------- */}
//           <div className="lg:col-span-2">
//             <motion.div
//               key={activeVideo.id}
//               initial={{ opacity: 0, scale: 0.97 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//               className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-xl dark:bg-gray-900/80"
//               style={{ border: '1px solid rgba(255,255,255,0.15)' }}
//             >
//               {/* Video container */}
//               <div className="relative aspect-video w-full overflow-hidden bg-black">
//                 <video
//                   ref={videoRef}
//                   src={activeVideo.videoUrl}
//                   className="h-full w-full object-cover"
//                   autoPlay
//                   muted={false} // allow audio; user can control
//                   playsInline
//                   onEnded={() => setIsPlaying(false)}
//                 />
//                 {/* Overlay play/pause button */}
//                 <button
//                   onClick={togglePlay}
//                   className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 p-4 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-black/70 focus:outline-none"
//                   aria-label={isPlaying ? 'Pause' : 'Play'}
//                 >
//                   {isPlaying ? (
//                     <Pause className="h-8 w-8" />
//                   ) : (
//                     <Play className="h-8 w-8" />
//                   )}
//                 </button>

//                 {/* Category badge top-left */}
//                 <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
//                   {activeVideo.category}
//                 </div>
//                 {/* Duration badge top-right */}
//                 <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
//                   {activeVideo.duration}
//                 </div>
//               </div>

//               {/* Video info */}
//               <div className="p-4 md:p-6">
//                 <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
//                   {activeVideo.title}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
//                   {activeVideo.description}
//                 </p>
//                 <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
//                   <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
//                     <span className="flex items-center gap-1">
//                       <User className="h-3 w-3" /> {activeVideo.author}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Calendar className="h-3 w-3" /> {activeVideo.date}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-500 dark:text-gray-400 dark:hover:bg-gray-800">
//                       <Heart className="h-5 w-5" />
//                     </button>
//                     <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800">
//                       <Share2 className="h-5 w-5" />
//                     </button>
//                     <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-amber-500 dark:text-gray-400 dark:hover:bg-gray-800">
//                       <Bookmark className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* ---------- Right: Playlist (35%) ---------- */}
//           <div className="lg:col-span-1">
//             <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md dark:bg-gray-900/60">
//               <div className="border-b border-gray-200/50 px-4 py-3 dark:border-gray-700/50">
//                 <h4 className="font-serif text-lg font-semibold text-gray-900 dark:text-white">
//                   Playlist
//                 </h4>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {VIDEOS.length} stories
//                 </p>
//               </div>
//               <div className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
//                 <div className="space-y-3">
//                   {VIDEOS.map((video) => {
//                     const isActive = activeVideo.id === video.id;
//                     return (
//                       <motion.div
//                         key={video.id}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.05 * video.id }}
//                         whileHover={{ scale: 1.02 }}
//                         onClick={() => handleVideoChange(video)}
//                         className={`group relative flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-all duration-300 ${
//                           isActive
//                             ? 'bg-primary/10 shadow-[0_0_20px_rgba(99,102,241,0.2)] dark:bg-primary/20'
//                             : 'hover:bg-gray-100/70 dark:hover:bg-gray-800/50'
//                         }`}
//                         style={{
//                           border: isActive
//                             ? '1px solid rgba(99,102,241,0.3)'
//                             : '1px solid transparent',
//                         }}
//                       >
//                         {/* Thumbnail */}
//                         <div className="relative w-32 flex-shrink-0 overflow-hidden rounded-lg">
//                           <img
//                             src={video.thumbnail}
//                             alt={video.title}
//                             className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
//                           />
//                           <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
//                             <Play className="h-6 w-6 text-white" />
//                           </div>
//                           {/* Duration */}
//                           <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
//                             {video.duration}
//                           </span>
//                           {isActive && (
//                             <motion.div
//                               layoutId="activeGlow"
//                               className="absolute inset-0 rounded-lg bg-primary/20"
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 1 }}
//                               exit={{ opacity: 0 }}
//                             />
//                           )}
//                         </div>

//                         {/* Content */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-start justify-between gap-2">
//                             <h5 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
//                               {video.title}
//                             </h5>
//                             <span className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary dark:bg-primary/20">
//                               {video.category}
//                             </span>
//                           </div>
//                           <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
//                             {video.description}
//                           </p>
//                           <div className="mt-1.5 flex items-center gap-3 text-[10px] text-gray-400 dark:text-gray-500">
//                             <span className="flex items-center gap-1">
//                               <User className="h-3 w-3" /> {video.author}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Clock className="h-3 w-3" /> {video.duration}
//                             </span>
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------- Mobile: Horizontal scroll playlist (visible below video) ---------- */}
//         <div className="mt-6 lg:hidden">
//           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
//             {VIDEOS.map((video) => {
//               const isActive = activeVideo.id === video.id;
//               return (
//                 <motion.div
//                   key={video.id}
//                   whileHover={{ scale: 1.03 }}
//                   onClick={() => handleVideoChange(video)}
//                   className={`min-w-[160px] flex-shrink-0 cursor-pointer rounded-xl p-2 transition-all ${
//                     isActive
//                       ? 'bg-primary/10 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:bg-primary/20'
//                       : 'bg-white/40 hover:bg-white/60 dark:bg-gray-800/40 dark:hover:bg-gray-800/60'
//                   }`}
//                 >
//                   <div className="relative aspect-video w-full overflow-hidden rounded-lg">
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="h-full w-full object-cover"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                       <Play className="h-6 w-6 text-white" />
//                     </div>
//                     <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
//                       {video.duration}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">
//                     {video.title}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }