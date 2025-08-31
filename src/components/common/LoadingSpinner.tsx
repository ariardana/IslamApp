import React from 'react';
import { useAppStore } from '../../store/useAppStore';

const LoadingSpinner: React.FC = () => {
  const { theme } = useAppStore();

  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className={`w-12 h-12 rounded-full border-4 ${
          theme.isDark ? 'border-gray-700' : 'border-gray-200'
        }`}></div>
        <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;