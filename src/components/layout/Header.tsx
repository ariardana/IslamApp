import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <header className={`${
      theme.isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    } shadow-sm border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">☪</span>
            </div>
            <h1 className="text-xl font-bold text-emerald-600">IslamApp</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme.isDark 
                  ? 'hover:bg-gray-800 text-yellow-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Toggle theme"
            >
              {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme.isDark 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;