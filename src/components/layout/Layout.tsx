import React from 'react';
import { Outlet } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Header from './Header';
import Navigation from './Navigation';
import { useAppStore } from '../../store/useAppStore';

const Layout: React.FC = () => {
  const { theme } = useAppStore();

  return (
    <div className={`min-h-screen flex flex-col ${theme.isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <Header />
      <Navigation />
      
      {/* Main content with responsive padding */}
      <main className="flex-grow pt-16 pb-20 lg:pb-8 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`py-4 text-center text-sm ${theme.isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'} transition-colors duration-200 mt-auto`}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="flex items-center justify-center">
            Made with 
            <Heart className="mx-1 h-4 w-4 text-red-500 fill-current" /> 
            by 
            <a 
              href="https://github.com/ariardana" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`ml-1 hover:underline ${theme.isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
            >
              Ari
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;