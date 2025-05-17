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

