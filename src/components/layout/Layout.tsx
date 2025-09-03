import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useAppStore } from '../../store/useAppStore';

const Layout: React.FC = () => {
  const { theme } = useAppStore();

  return (
    <div className={`min-h-screen ${
      theme.isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    } transition-colors duration-200`}>
      <Header />
      <Navigation />
      
      <main className="pt-16 pb-16 sm:pb-20 lg:pb-0 lg:pl-64">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;