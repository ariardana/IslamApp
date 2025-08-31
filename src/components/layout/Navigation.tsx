import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Clock, Calendar, Newspaper, Bookmark } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const Navigation: React.FC = () => {
  const { theme } = useAppStore();

  const navItems = [
    { to: '/', icon: Book, label: 'Al-Qur\'an' },
    { to: '/prayer-times', icon: Clock, label: 'Jadwal Sholat' },
    { to: '/calendar', icon: Calendar, label: 'Kalender' },
    { to: '/news', icon: Newspaper, label: 'Berita' },
    { to: '/bookmarks', icon: Bookmark, label: 'Bookmark' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className={`hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 ${
        theme.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border-r transition-colors duration-200`}>
        <div className="flex-1 overflow-y-auto pt-5 pb-4">
          <div className="px-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : theme.isDark
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 ${
        theme.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border-t transition-colors duration-200 z-50`}>
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-emerald-600'
                    : theme.isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;