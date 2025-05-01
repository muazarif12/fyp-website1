import { useState } from 'react';
import { Upload, Home, Mic, Settings, Star, Youtube, ChevronRight, FolderPlus, ChevronLeft, Menu } from 'lucide-react';
import YouTubeCardWithModal from '../components/YoutubeCard';
import LocalVideoCard from '../components/LocalVideoCard';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-sm flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 flex items-center border-b">
          {sidebarCollapsed ? (
            // Hamburger menu when collapsed - clickable to expand
            <button 
              className="w-full flex justify-center focus:outline-none"
              onClick={toggleSidebar}
            >
              <Menu size={22} className="text-gray-700 hover:text-gray-900" />
            </button>
          ) : (
            // Logo when expanded
            <div className="font-bold text-gray-800 flex items-center">
              <span>/</span>
              <span className="ml-1">VidSense</span>
            </div>
          )}
          
          {/* Toggle button - only shown when expanded */}
          {!sidebarCollapsed && (
            <button 
              className="ml-auto text-gray-500"
              onClick={toggleSidebar}
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="py-2">
            <li>
              <a href="#" className={`flex items-center px-4 py-3 text-gray-900 bg-gray-100 rounded-lg mx-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <Home size={20} />
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a href="#" className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <Settings size={20} />
                {!sidebarCollapsed && <span className="ml-3">Settings</span>}
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Upgrade button */}
        <div className="p-4">
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center">
            <Star size={18} />
            {!sidebarCollapsed && <span className="ml-2">Upgrade to Premium</span>}
          </button>
        </div>
        
        {/* User */}
        <div className="p-4 border-t flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white">
            M
          </div>
          {!sidebarCollapsed && <span className="ml-3 text-sm">Maaz Arif</span>}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="p-6 pb-0">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Create new notes</p>
        </header>
        
        {/* Card grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* YouTube card */}
          <YouTubeCardWithModal>
            <div />
          </YouTubeCardWithModal>
          <LocalVideoCard>
            <div />
          </LocalVideoCard>
          
          
        </div>
        
        {/* Notes section */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-800">All Notes</h2>
            <button className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg">
              <FolderPlus size={16} className="mr-2" />
              Create Folder
            </button>
          </div>
          
          {/* Empty state */}
          <div className="flex items-center justify-center h-64 border rounded-lg">
            <div className="text-center p-6">
              <p className="text-gray-400 mb-1">notes</p>
              <p className="text-gray-400 text-sm">notes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;