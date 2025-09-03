import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, RefreshCw } from 'lucide-react';
import { useSurahs } from '../../hooks/useQuran';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';

const SurahList: React.FC = () => {
  const { data: surahs, isLoading, error, refetch } = useSurahs();
  const { theme } = useAppStore();

  // Log untuk debugging
  useEffect(() => {
    console.log('SurahList component rendered');
    console.log('Surahs data:', surahs);
    console.log('Loading state:', isLoading);
    console.log('Error state:', error);
  }, [surahs, isLoading, error]);

  if (isLoading) {
    console.log('Showing loading spinner');
    return <LoadingSpinner />;
  }
  
  if (error) {
    console.log('Showing error message:', error);
    return (
      <div className={`rounded-xl p-6 ${theme.isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="text-center py-8">
          <p className="text-red-500 font-medium mb-2">Gagal memuat daftar surah</p>
          <p className={`text-sm ${theme.isDark ? 'text-red-300' : 'text-red-700'} mb-4`}>
            {(error as Error).message || 'Pastikan koneksi internet Anda stabil dan coba lagi'}
          </p>
          <button
            onClick={() => refetch()}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              theme.isDark 
                ? 'bg-red-800 text-white hover:bg-red-700' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Calculate total surahs count
  const totalSurahs = surahs?.length || 0;
  const totalAyahs = surahs?.reduce((sum, surah) => sum + surah.numberOfAyahs, 0) || 0;

  console.log(`Rendering ${totalSurahs} surahs`);

  return (
    <div className="space-y-6">
      <div className={`rounded-xl p-6 ${theme.isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
            theme.isDark ? 'bg-emerald-700' : 'bg-emerald-100'
          }`}>
            <Book className="h-8 w-8 text-emerald-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 style={{ color: theme.isDark ? 'inherit' : 'black' }} className="text-2xl font-bold text-black dark:text-amber-100 truncate">Al-Qur'an Digital</h1>
            <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`mt-1 text-sm ${theme.isDark ? 'text-amber-200' : 'text-black'}`}>
              Kitab suci umat Islam dengan {totalSurahs} surah dan {totalAyahs.toLocaleString()} ayat
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className={`rounded-lg p-4 ${theme.isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-sm ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>Total Surah</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{totalSurahs}</p>
          </div>
          
          <div className={`rounded-lg p-4 ${theme.isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-sm ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>Total Ayat</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{totalAyahs.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {surahs?.map((surah) => (
          <Link
            key={surah.number}
            to={`/quran/surah/${surah.number}`}
            className={`block p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
              theme.isDark
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  theme.isDark ? 'bg-emerald-700' : 'bg-amber-100'
                }`}>
                  <span className={`text-base font-bold ${
                    theme.isDark ? 'text-amber-100' : 'text-black'
                  }`}>
                    {surah.number}
                  </span>
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between">
                    <h3 style={{ color: theme.isDark ? 'inherit' : 'black' }} className="font-semibold text-lg text-black dark:text-amber-100 truncate">{surah.name}</h3>
                    <span className={`text-sm font-medium ${theme.isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {surah.numberOfAyahs} ayat
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-sm font-medium ${theme.isDark ? 'text-amber-200' : 'text-black'}`}>
                      {surah.englishName}
                    </p>
                    <span style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                      •
                    </span>
                    <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                      {surah.revelationType === 'mekkah' ? 'Mekkah' : 'Madinah'}
                    </p>
                  </div>
                  <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-sm mt-1 ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                    {surah.englishNameTranslation}
                  </p>
                </div>
              </div>
              
              <ChevronRight className={`h-5 w-5 flex-shrink-0 ml-2 ${theme.isDark ? 'text-amber-300' : 'text-black'}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurahList;