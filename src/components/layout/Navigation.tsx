import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Clock, Calendar, BookOpen, Bookmark, FileText } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const Navigation: React.FC = () => {
  const { theme } = useAppStore();

  const navItems = [
    { to: '/', icon: Book, label: 'Al-Qur\'an' },
    { to: '/prayer-times', icon: Clock, label: 'Jadwal Sholat' },
    { to: '/calendar', icon: Calendar, label: 'Kalender' },
    { to: '/prayers', icon: BookOpen, label: 'Kumpulan Doa' },
    { to: '/bookmarks', icon: Bookmark, label: 'Bookmark' },
    { to: '/api-docs', icon: FileText, label: 'API Docs' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <nav className={`h-full w-64 flex flex-col ${
          theme.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        } border-r transition-colors duration-200 shadow-lg`}>
          <div className="flex-1 overflow-y-auto pt-16 pb-4">
            <div className="px-4 space-y-1 mt-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-md'
                        : theme.isDark
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className="mr-4 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className={`px-4 py-4 text-center text-xs ${theme.isDark ? 'text-gray-500' : 'text-gray-400'} border-t ${theme.isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            IslamApp v1.0
          </div>
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 ${
        theme.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border-t transition-colors duration-200 shadow-lg`}>
        <div className="flex overflow-x-auto py-2 hide-scrollbar px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 flex-shrink-0 min-w-[60px] ${
                  isActive
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-gray-800'
                    : theme.isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="h-5 w-5 mb-1 flex-shrink-0" />
              <span className="text-[0.65rem] font-medium whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;