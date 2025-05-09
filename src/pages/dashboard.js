  // import { useState } from 'react';
  // import { Upload, Home, Mic, Settings, Star, Youtube, ChevronRight, FolderPlus, ChevronLeft, Menu } from 'lucide-react';
  // import YouTubeCardWithModal from '../components/YoutubeCard';
  // import LocalVideoCard from '../components/LocalVideoCard';

  // const Dashboard = () => {
  //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    
  //   const toggleSidebar = () => {
  //     setSidebarCollapsed(!sidebarCollapsed);
  //   };
    
  //   return (
  //     <div className="flex h-screen bg-gray-50">
  //       {/* Sidebar */}
  //       <div className={`bg-white shadow-sm flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
  //         {/* Logo */}
  //         <div className="p-4 flex items-center border-b">
  //           {sidebarCollapsed ? (
  //             // Hamburger menu when collapsed - clickable to expand
  //             <button 
  //               className="w-full flex justify-center focus:outline-none"
  //               onClick={toggleSidebar}
  //             >
  //               <Menu size={22} className="text-gray-700 hover:text-gray-900" />
  //             </button>
  //           ) : (
  //             // Logo when expanded
  //             <div className="font-bold text-gray-800 flex items-center">
  //               <span>/</span>
  //               <span className="ml-1">VidSense</span>
  //             </div>
  //           )}
            
  //           {/* Toggle button - only shown when expanded */}
  //           {!sidebarCollapsed && (
  //             <button 
  //               className="ml-auto text-gray-500"
  //               onClick={toggleSidebar}
  //             >
  //               <ChevronLeft size={18} />
  //             </button>
  //           )}
  //         </div>
          
  //         {/* Navigation */}
  //         <nav className="flex-1">
  //           <ul className="py-2">
  //             <li>
  //               <a href="#" className={`flex items-center px-4 py-3 text-gray-900 bg-gray-100 rounded-lg mx-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
  //                 <Home size={20} />
  //                 {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
  //               </a>
  //             </li>
  //             <li>
  //               <a href="#" className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
  //                 <Settings size={20} />
  //                 {!sidebarCollapsed && <span className="ml-3">Settings</span>}
  //               </a>
  //             </li>
  //           </ul>
  //         </nav>
          
  //         {/* Upgrade button */}
  //         <div className="p-4">
  //           <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center">
  //             <Star size={18} />
  //             {!sidebarCollapsed && <span className="ml-2">Upgrade to Premium</span>}
  //           </button>
  //         </div>
          
  //         {/* User */}
  //         <div className="p-4 border-t flex items-center">
  //           <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white">
  //             M
  //           </div>
  //           {!sidebarCollapsed && <span className="ml-3 text-sm">Maaz Arif</span>}
  //         </div>
  //       </div>
        
  //       {/* Main content */}
  //       <div className="flex-1 overflow-auto">
  //         {/* Header */}
  //         <header className="p-6 pb-0">
  //           <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
  //           <p className="text-gray-600">Create new notes</p>
  //         </header>
          
  //         {/* Card grid */}
  //         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
  //           {/* YouTube card */}
  //           <YouTubeCardWithModal>
  //             <div />
  //           </YouTubeCardWithModal>
  //           <LocalVideoCard>
  //             <div />
  //           </LocalVideoCard>
            
            
  //         </div>
          
  //         {/* Notes section */}
  //         <div className="px-6">
  //           <div className="flex items-center justify-between mb-4">
  //             <h2 className="text-xl font-medium text-gray-800">All Notes</h2>
  //             <button className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg">
  //               <FolderPlus size={16} className="mr-2" />
  //               Create Folder
  //             </button>
  //           </div>
            
  //           {/* Empty state */}
  //           <div className="flex items-center justify-center h-64 border rounded-lg">
  //             <div className="text-center p-6">
  //               <p className="text-gray-400 mb-1">notes</p>
  //               <p className="text-gray-400 text-sm">notes</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default Dashboard;

//   import { useState, useEffect, useRef } from 'react'
// import {
//   Home,
//   Menu,
//   Youtube,
//   UploadCloud,
//   ClipboardList,
//   BookOpen,
//   ListVideo,
//   FileText,
//   Volume2,
//   Mic2,
//   Star,
//   X,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react'

// // Enhanced YouTube Card Component with Modal
// function EnhancedYouTubeCard({ openModal }) {
//   return (
//     <div 
//       onClick={openModal} 
//       className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border border-red-100"
//     >
//       <div className="flex items-center justify-center mb-4">
//         <Youtube size={48} className="text-red-600" />
//       </div>
//       <h3 className="text-xl font-bold text-center text-gray-800">YouTube Import</h3>
//       <p className="text-gray-600 text-center mt-3">
//         Analyze any YouTube video by pasting the URL
//       </p>
//       <div className="mt-6 flex justify-center">
//         <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors duration-300 transform active:scale-95">
//           <Youtube size={18} />
//           <span>Import YouTube Video</span>
//         </button>
//       </div>
//     </div>
//   )
// }

// // Enhanced Local Video Card Component with Modal
// function EnhancedLocalVideoCard({ openModal }) {
//   return (
//     <div 
//       onClick={openModal} 
//       className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border border-purple-100"
//     >
//       <div className="flex items-center justify-center mb-4">
//         <UploadCloud size={48} className="text-purple-600" />
//       </div>
//       <h3 className="text-xl font-bold text-center text-gray-800">Local Upload</h3>
//       <p className="text-gray-600 text-center mt-3">
//         Upload and analyze videos from your device
//       </p>
//       <div className="mt-6 flex justify-center">
//         <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors duration-300 transform active:scale-95">
//           <UploadCloud size={18} />
//           <span>Upload Video</span>
//         </button>
//       </div>
//     </div>
//   )
// }

// // Modal Component
// function Modal({ isOpen, onClose, title, children }) {
//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-modalFade">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//           <button 
//             onClick={onClose}
//             className="p-1 rounded-full hover:bg-gray-100"
//           >
//             <X size={20} className="text-gray-600" />
//           </button>
//         </div>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// }

// // YouTube Import Modal Content
// function YouTubeModalContent() {
//   return (
//     <div className="space-y-4">
//       <p className="text-gray-600">Enter a YouTube URL to analyze the video:</p>
//       <div className="flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200">
//         <Youtube size={20} className="text-red-500 mx-2" />
//         <input
//           type="text"
//           placeholder="https://www.youtube.com/watch?v=..."
//           className="flex-1 p-2 bg-transparent focus:outline-none text-sm"
//         />
//       </div>
//       <button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-600 transition-all duration-300 transform active:scale-98">
//         Analyze Video
//       </button>
//       <div className="mt-4 text-sm text-gray-500">
//         <p>Your video will be processed using AI to generate:</p>
//         <ul className="mt-2 ml-4 list-disc space-y-1">
//           <li>Smart summaries and highlights</li>
//           <li>Interactive flashcards</li>
//           <li>Meeting minutes and action items</li>
//           <li>And more...</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Upload Modal Content
// function UploadModalContent() {
//   return (
//     <div className="space-y-4">
//       <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors duration-300">
//         <div className="flex justify-center mb-4">
//           <UploadCloud size={40} className="text-purple-500" />
//         </div>
//         <p className="text-gray-600 mb-2">Drag and drop your video file</p>
//         <p className="text-gray-500 text-sm mb-4">or</p>
//         <button className="px-4 py-2 bg-purple-600 text-white rounded-lg inline-flex items-center gap-2 hover:bg-purple-700 transition-all duration-300 transform active:scale-95">
//           <UploadCloud size={16} />
//           <span>Browse Files</span>
//         </button>
//         <p className="mt-4 text-sm text-gray-500">Supports MP4, MOV, AVI (max 1GB)</p>
//       </div>
//       <div className="mt-4 text-sm text-gray-500">
//         <p>Your video will be processed using AI to generate:</p>
//         <ul className="mt-2 ml-4 list-disc space-y-1">
//           <li>Smart summaries and highlights</li>
//           <li>Interactive flashcards</li>
//           <li>Meeting minutes and action items</li>
//           <li>And more...</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Enhanced Feature Carousel Component
// function FeatureCarousel({ features }) {
//   const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const { current } = scrollRef;
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
//       // Wait for the scroll to complete before checking positions
//       setTimeout(() => {
//         setShowLeftArrow(current.scrollLeft > 10);
//         setShowRightArrow(current.scrollLeft < current.scrollWidth - current.clientWidth - 10);
        
//         // Update active index based on scroll position
//         const newIndex = Math.floor(current.scrollLeft / 200);
//         setActiveIndex(newIndex);
//       }, 300);
//     }
//   };

//   // Auto-scroll effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         const { current } = scrollRef;
        
//         // If we're at the end, go back to start
//         if (current.scrollLeft >= current.scrollWidth - current.clientWidth - 10) {
//           current.scrollTo({ left: 0, behavior: 'smooth' });
//           setShowLeftArrow(false);
//           setShowRightArrow(true);
//           setActiveIndex(0);
//         } else {
//           current.scrollBy({ left: 200, behavior: 'smooth' });
//           setShowLeftArrow(current.scrollLeft + 200 > 10);
//           setShowRightArrow(current.scrollLeft + 200 < current.scrollWidth - current.clientWidth - 10);
          
//           // Update active index based on scroll position
//           const newIndex = Math.floor((current.scrollLeft + 200) / 200);
//           setActiveIndex(newIndex > features.length - 1 ? features.length - 1 : newIndex);
//         }
//       }
//     }, 3000);
    
//     return () => clearInterval(interval);
//   }, [features.length]);

//   return (
//     <div className="relative py-10">
//       <div className="text-center mb-6">
//         <div className="inline-block bg-gradient-to-r from-purple-600/10 to-indigo-600/10 px-6 py-2 rounded-full text-purple-700 font-semibold mb-2">
//           AI-POWERED FEATURES
//         </div>
//         <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-3">
//           Unlock Video Intelligence
//         </h2>
//         <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
//           Transform your learning experience with our cutting-edge AI features
//         </p>
//       </div>
      
//       <div className="relative bg-gradient-to-r from-purple-50 via-white to-indigo-50 rounded-3xl shadow-xl p-8 border border-purple-200 overflow-hidden">
//         {/* Background effects */}
//         <div className="absolute inset-0 bg-white/30 backdrop-blur-sm overflow-hidden">
//           <div className="absolute w-96 h-96 rounded-full bg-purple-300/20 -top-20 -left-20 blur-3xl animate-float"></div>
//           <div className="absolute w-96 h-96 rounded-full bg-indigo-300/20 -bottom-20 -right-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
//           <div className="absolute w-64 h-64 rounded-full bg-pink-300/10 bottom-40 left-1/2 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
//         </div>
        
//         {/* Navigation arrows with improved design */}
//         {showLeftArrow && (
//           <button 
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
//             onClick={() => scroll('left')}
//           >
//             <ChevronLeft size={24} className="text-purple-600 group-hover:text-purple-800 transition-colors" />
//           </button>
//         )}
        
//         <div className="relative z-10">
//           <div 
//             ref={scrollRef} 
//             className="flex overflow-x-auto py-8 scrollbar-hide scroll-smooth"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             <div className="flex space-x-8 px-4">
//               {features.map((f, index) => (
//                 <div
//                   key={f.title}
//                   className="flex-shrink-0 flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:rotate-2 min-w-[220px] border border-purple-100 group relative overflow-hidden"
//                 >
//                   {/* Decorative elements */}
//                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                  
//                   <div className="p-5 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-full mb-4 group-hover:from-purple-200 group-hover:to-indigo-100 transition-all duration-300 shadow-md relative">
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 animate-pulse-slow"></div>
//                     <f.icon size={40} className="text-purple-600 relative z-10" />
//                   </div>
                  
//                   <span className="text-xl font-bold text-gray-800 mb-2">{f.title}</span>
//                   <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full group-hover:w-24 transition-all duration-300"></div>
                  
//                   {/* Floating decorative dot */}
//                   <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 animate-float" style={{ animationDelay: `${index * 0.7}s` }}></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {showRightArrow && (
//           <button 
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
//             onClick={() => scroll('right')}
//           >
//             <ChevronRight size={24} className="text-purple-600 group-hover:text-purple-800 transition-colors" />
//           </button>
//         )}
        
//         {/* Improved pagination indicators */}
//         <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
//           <div className="flex space-x-2">
//             {Array.from({ length: Math.min(4, Math.ceil(features.length / 2)) }).map((_, i) => (
//               <span 
//                 key={i} 
//                 className={`block h-2 w-${i === Math.floor(activeIndex/2) ? '8' : '2'} rounded-full transition-all duration-300 ${i === Math.floor(activeIndex/2) ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-purple-300'}`}
//               ></span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main Dashboard Component
// export default function Dashboard() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
//   const FEATURES = [
//     { title: 'Highlights', icon: ListVideo },
//     { title: 'Flashcards', icon: BookOpen },
//     { title: 'Meeting Minutes', icon: ClipboardList },
//     { title: 'Study Guide', icon: FileText },
//     { title: 'Podcast', icon: Mic2 },
//     { title: 'Subtitles', icon: FileText },
//     { title: 'Dubbing', icon: Volume2 },
//     { title: 'Chat & Q&A', icon: Home }
//   ];

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-purple-100 via-white to-blue-50">
//       {/* Sidebar */}
//       <aside
//         className={`flex flex-col bg-white bg-opacity-90 backdrop-blur-md shadow-lg transition-all duration-300 ${
//           collapsed ? 'w-20' : 'w-64'
//         }`}
//       >
//         <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
//           {!collapsed && (
//             <div className="flex items-center">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">V</div>
//               <span className="text-2xl font-bold text-purple-600 ml-2">Vidsense</span>
//             </div>
//           )}
//           {collapsed && (
//             <div className="flex items-center mx-auto">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">V</div>
//             </div>
//           )}
//           <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-gray-200">
//             <Menu size={20} className="text-gray-700" />
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto mt-4">
//           <ul className="space-y-2 px-2">
//             <li>
//               <a href="/" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 transition bg-purple-100">
//                 <Home size={20} className="text-purple-600" />
//                 {!collapsed && <span className="ml-3 font-medium">Dashboard</span>}
//               </a>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setYoutubeModalOpen(true)}
//                 className="flex items-center p-2 w-full text-left text-gray-700 rounded hover:bg-gray-200 transition"
//               >
//                 <Youtube size={20} className="text-red-500" />
//                 {!collapsed && <span className="ml-3">YouTube Import</span>}
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setUploadModalOpen(true)}
//                 className="flex items-center p-2 w-full text-left text-gray-700 rounded hover:bg-gray-200 transition"
//               >
//                 <UploadCloud size={20} className="text-purple-500" />
//                 {!collapsed && <span className="ml-3">Local Upload</span>}
//               </button>
//             </li>
//           </ul>
//         </nav>

//         <div className="px-4 py-3 border-t border-gray-200">
         

//           <div className="mt-4 flex items-center">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white">
//               M
//             </div>
//             {!collapsed && (
//               <div className="ml-3">
//                 <span className="text-sm font-medium">Maaz Arif</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-6">
//         {/* Hero Header - More Compact */}
//         <header className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-purple-100 animate-gradient">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="max-w-2xl">
//               <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 leading-tight">
//                 Transform Videos Into Insights
//               </h1>
//               <p className="mt-2 text-gray-700">
//                 AI-powered video analysis for transcripts, highlights, flashcards, and more—in seconds.
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0 px-4 py-2 bg-white rounded-xl text-gray-700 border-l-4 border-purple-500 shadow-sm flex items-center">
//               <UploadCloud size={20} className="text-purple-600 mr-2" />
//               <span><strong>Get Started:</strong> Upload or paste a YouTube link</span>
//             </div>
//           </div>
//         </header>

//         {/* Getting Started Cards */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//           <EnhancedYouTubeCard openModal={() => setYoutubeModalOpen(true)} />
//           <EnhancedLocalVideoCard openModal={() => setUploadModalOpen(true)} />
//         </section>

//         {/* Feature Carousel */}
//         <FeatureCarousel features={FEATURES} />
//       </main>

//       {/* Modals */}
//       <Modal 
//         isOpen={youtubeModalOpen} 
//         onClose={() => setYoutubeModalOpen(false)}
//         title="Import YouTube Video"
//       >
//         <YouTubeModalContent />
//       </Modal>

//       <Modal 
//         isOpen={uploadModalOpen} 
//         onClose={() => setUploadModalOpen(false)}
//         title="Upload Video"
//       >
//         <UploadModalContent />
//       </Modal>
      
//       {/* Add this to your CSS or as a style tag */}
//       <style jsx>{`
//         @keyframes pulse-slow { 
//           0%, 100% { opacity: 1; } 
//           50% { opacity: 0.5; } 
//         }
//         .animate-pulse-slow { 
//           animation: pulse-slow 3s ease-in-out infinite; 
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         @keyframes modalFade {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-modalFade {
//           animation: modalFade 0.3s ease-out forwards;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         @keyframes gradient-shift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-shift 15s ease infinite;
//         }
//         .blur-3xl {
//           filter: blur(64px);
//         }
//       `}</style>
//     </div>
//   )
// }


import { useState, useEffect, useRef } from 'react'
import {
  Home,
  Menu,
  Youtube,
  UploadCloud,
  ClipboardList,
  BookOpen,
  ListVideo,
  FileText,
  Volume2,
  Mic2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import YouTubeCardWithModal from '../components/YoutubeCard'
import LocalVideoCard from '../components/LocalVideoCard'

// ------------------------------------
// Reusable Modal (for sidebar triggers)
// ------------------------------------
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-modalFade">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ------------------------------------
// Content for those Modals
// ------------------------------------
function YouTubeModalContent() {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Enter a YouTube URL to analyze the video:</p>
      <div className="flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200">
        <Youtube size={20} className="text-red-500 mx-2" />
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-1 p-2 bg-transparent focus:outline-none text-sm"
        />
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-600 transition-all duration-300 active:scale-98">
        Analyze Video
      </button>
    </div>
  )
}

function UploadModalContent() {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors duration-300">
        <UploadCloud size={40} className="text-purple-500 mb-4" />
        <p className="text-gray-600 mb-2">Drag and drop your video</p>
        <p className="text-gray-500 text-sm mb-4">or</p>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg inline-flex items-center gap-2 hover:bg-purple-700 transition-all duration-300 active:scale-95">
          <UploadCloud size={16} />
          <span>Browse Files</span>
        </button>
      </div>
    </div>
  )
}

// ------------------------------------
// Fully implemented FeatureCarousel
// ------------------------------------
function FeatureCarousel({ features }) {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // scroll helper
  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const amount = dir === 'left' ? -300 : 300
    el.scrollBy({ left: amount, behavior: 'smooth' })

    setTimeout(() => {
      setShowLeft(el.scrollLeft > 10)
      setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
      setActiveIndex(Math.floor(el.scrollLeft / 200))
    }, 300)
  }

  // auto-scroll every 3s
  useEffect(() => {
    const iv = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
        setShowLeft(false)
        setShowRight(true)
        setActiveIndex(0)
      } else {
        scroll('right')
      }
    }, 3000)
    return () => clearInterval(iv)
  }, [features.length])

  return (
    <div className="relative py-10">
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-purple-600/10 to-indigo-600/10 px-6 py-2 rounded-full text-purple-700 font-semibold mb-2">
          AI-POWERED FEATURES
        </div>
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-3">
          Unlock Video Intelligence
        </h2>
      </div>

      <div className="relative bg-gradient-to-r from-purple-50 via-white to-indigo-50 rounded-3xl shadow-xl p-8 border border-purple-200 overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-transform"
          >
            <ChevronLeft size={24} className="text-purple-600" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto py-8 scrollbar-hide scroll-smooth"
        >
          <div className="flex space-x-8 px-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex-shrink-0 flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md transform transition"
                style={{ minWidth: 220 }}
              >
                <div className="p-5 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-full mb-4 shadow-md">
                  <f.icon size={40} className="text-purple-600" />
                </div>
                <span className="text-xl font-bold text-gray-800 mb-2">
                  {f.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-transform"
          >
            <ChevronRight size={24} className="text-purple-600" />
          </button>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {features.map((_, idx) => (
            <span
              key={idx}
              className={`block h-2 rounded-full transition-all ${
                idx === activeIndex
                  ? 'w-8 bg-gradient-to-r from-purple-600 to-indigo-600'
                  : 'w-2 bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ------------------------------------
// Main Dashboard Export
// ------------------------------------
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const FEATURES = [
    { title: 'Highlights', icon: ListVideo },
    { title: 'Flashcards', icon: BookOpen },
    { title: 'Meeting Minutes', icon: ClipboardList },
    { title: 'Study Guide', icon: FileText },
    { title: 'Podcast', icon: Mic2 },
    { title: 'Subtitles', icon: FileText },
    { title: 'Dubbing', icon: Volume2 },
    { title: 'Chat & Q&A', icon: Home }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-white to-blue-50">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white bg-opacity-90 backdrop-blur-md shadow-lg transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                V
              </div>
              <span className="text-2xl font-bold text-purple-600 ml-2">
                Vidsense
              </span>
            </div>
          ) : (
            <div className="mx-auto">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                V
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-2 px-2">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 transition bg-purple-100"
              >
                <Home size={20} className="text-purple-600" />
                {!collapsed && <span className="ml-3 font-medium">Dashboard</span>}
              </a>
            </li>
            <li>
              <button
                onClick={() => setYoutubeModalOpen(true)}
                className="flex items-center p-2 w-full text-left text-gray-700 rounded hover:bg-gray-200 transition"
              >
                <Youtube size={20} className="text-red-500" />
                {!collapsed && <span className="ml-3">YouTube Import</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="flex items-center p-2 w-full text-left text-gray-700 rounded hover:bg-gray-200 transition"
              >
                <UploadCloud size={20} className="text-purple-500" />
                {!collapsed && <span className="ml-3">Local Upload</span>}
              </button>
            </li>
          </ul>
        </nav>

        <div className="px-4 py-3 border-t border-gray-200">
          <div className="mt-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white">
              M
            </div>
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">Maaz Arif</span>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Hero Header */}
        <header className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-purple-100 animate-gradient">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 leading-tight">
                Transform Videos Into Insights
              </h1>
              <p className="mt-2 text-gray-700">
                AI-powered video analysis for transcripts, highlights,
                flashcards, and more—in seconds.
              </p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-white rounded-xl text-gray-700 border-l-4 border-purple-500 shadow-sm flex items-center">
              <UploadCloud size={20} className="text-purple-600 mr-2" />
              <span>
                <strong>Get Started:</strong> Upload or paste a YouTube link
              </span>
            </div>
          </div>
        </header>

        {/* Getting Started Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <YouTubeCardWithModal />
          <LocalVideoCard />
        </section>

        {/* Feature Carousel */}
        <FeatureCarousel features={FEATURES} />
      </main>

      {/* Sidebar-triggered Modals */}
      <Modal
        isOpen={youtubeModalOpen}
        onClose={() => setYoutubeModalOpen(false)}
        title="Import YouTube Video"
      >
        <YouTubeModalContent />
      </Modal>
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Video"
      >
        <UploadModalContent />
      </Modal>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes modalFade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalFade {
          animation: modalFade 0.3s ease-out forwards;
        }
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

