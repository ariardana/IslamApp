import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Play, Pause, Search } from 'lucide-react';
import { useSurah } from '../../hooks/useQuran';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';

const SurahReader: React.FC = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const { data: surah, isLoading, error } = useSurah(Number(surahNumber));
  const { theme, bookmarkedAyahs, addBookmarkedAyah, removeBookmarkedAyah } = useAppStore();
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAudioPlay = (ayahAudioUrl: string, ayahNum: number) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    // Use the ayah-level audio URL from the new API
    if (ayahAudioUrl) {
      const audio = new Audio(ayahAudioUrl);
      audio.onplay = () => setPlayingAyah(ayahNum);
      audio.onended = () => setPlayingAyah(null);
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        console.log('Audio URL:', ayahAudioUrl);
        setPlayingAyah(null);
      };
      
      setCurrentAudio(audio);
      audio.play().catch((error) => {
        console.error('Could not play audio:', error);
        setPlayingAyah(null);
      });
    } else {
      console.log('No audio URL available for this ayah');
      setPlayingAyah(null);
    }
  };

  const handleAudioPause = () => {
    if (currentAudio) {
      currentAudio.pause();
      setPlayingAyah(null);
    }
  };

  const isBookmarked = (surahNum: number, ayahNum: number) => {
    return bookmarkedAyahs.some(
      (bookmark) => bookmark.surahNumber === surahNum && bookmark.ayahNumber === ayahNum
    );
  };

  const toggleBookmark = (ayah: Ayah) => {
    const surahNum = Number(surahNumber);
    if (isBookmarked(surahNum, ayah.numberInSurah)) {
      removeBookmarkedAyah(surahNum, ayah.numberInSurah);
    } else {
      addBookmarkedAyah({
        surahNumber: surahNum,
        ayahNumber: ayah.numberInSurah,
        surahName: surah?.name || '',
        text: ayah.text,
        translation: ayah.translation,
        addedAt: new Date().toISOString(),
      });
    }
  };

  const filteredAyahs = surah?.ayahs?.filter((ayah: Ayah) =>
    ayah.text.includes(searchTerm) || ayah.translation?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Gagal memuat surah</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            to="/"
            className={`p-2 rounded-lg transition-colors duration-200 ${
              theme.isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{surah?.name}</h1>
            <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {surah?.englishNameTranslation} • {surah?.numberOfAyahs} ayat
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
          theme.isDark ? 'text-gray-400' : 'text-gray-400'
        }`} />
        <input
          type="text"
          placeholder="Cari dalam surah ini..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border transition-colors duration-200 ${
            theme.isDark
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
          } focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base`}
        />
      </div>

      {/* Ayahs */}
      <div className="space-y-4 sm:space-y-6">
        {(searchTerm ? filteredAyahs : surah?.ayahs)?.map((ayah: Ayah) => (
          <div
            key={ayah.numberInSurah}
            className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 ${
              theme.isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Ayah Number and Controls */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${
                theme.isDark ? 'bg-emerald-700' : 'bg-emerald-100'
              }`}>
                <span className={`text-xs sm:text-sm font-bold ${
                  theme.isDark ? 'text-white' : 'text-emerald-700'
                }`}>
                  {ayah.numberInSurah}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => {
                    if (playingAyah === ayah.numberInSurah) {
                      handleAudioPause();
                    } else {
                      handleAudioPlay(ayah.audio || '', ayah.numberInSurah);
                    }
                  }}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${
                    theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {playingAyah === ayah.numberInSurah ? (
                    <Pause className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                  ) : (
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                  )}
                </button>
                
                <button
                  onClick={() => toggleBookmark(ayah)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${
                    theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {isBookmarked(Number(surahNumber), ayah.numberInSurah) ? (
                    <BookmarkCheck className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                  ) : (
                    <Bookmark className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Arabic Text */}
            <div className="mb-3 sm:mb-4">
              <p className="text-xl sm:text-2xl leading-loose text-right font-arabic" dir="rtl">
                {ayah.text}
              </p>
            </div>

            {/* Latin Transliteration */}
            {ayah.transliteration && (
              <div className={`p-3 sm:p-4 rounded-lg ${theme.isDark ? 'bg-gray-700' : 'bg-gray-50'} mb-3`}>
                <p className="text-sm sm:text-base leading-relaxed italic">
                  {ayah.transliteration}
                </p>
              </div>
            )}

            {/* Translation */}
            <div className={`p-3 sm:p-4 rounded-lg ${theme.isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="text-sm sm:text-base leading-relaxed">
                {ayah.translation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahReader;