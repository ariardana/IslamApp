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
      
      <main className="lg:pl-64 pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;