import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight } from 'lucide-react';
import { useSurahs } from '../../hooks/useQuran';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';

const SurahList: React.FC = () => {
  const { data: surahs, isLoading, error } = useSurahs();
  const { theme } = useAppStore();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Gagal memuat daftar surah</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <Book className="h-8 w-8 text-emerald-600" />
        <h1 className="text-2xl font-bold">Al-Qur'an Digital</h1>
      </div>

      <div className="grid gap-3">
        {surahs?.map((surah) => (
          <Link
            key={surah.number}
            to={`/quran/surah/${surah.number}`}
            className={`block p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              theme.isDark
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  theme.isDark ? 'bg-emerald-700' : 'bg-emerald-100'
                }`}>
                  <span className={`text-sm font-bold ${
                    theme.isDark ? 'text-white' : 'text-emerald-700'
                  }`}>
                    {surah.number}
                  </span>
                </div>
                
                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg truncate">{surah.name}</h3>
                  <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} ayat • {surah.revelationType}
                  </p>
                </div>
              </div>
              
              <ChevronRight className={`h-5 w-5 flex-shrink-0 ${theme.isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurahList;