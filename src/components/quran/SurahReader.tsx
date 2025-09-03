import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Play, Pause, Search } from 'lucide-react';
import { useSurah } from '../../hooks/useQuran';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';

// Definisikan interface Ayah di sini karena tidak diimpor dari file terpisah
interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  translation?: string;
  transliteration?: string;
  // New fields for equran.id API
  nomorAyat?: number;
  teksArab?: string;
  teksLatin?: string;
  teksIndonesia?: string;
  audio?: string;
}

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
        translation: ayah.translation || '',
        addedAt: new Date().toISOString(),
      });
    }
  };

  const filteredAyahs = surah?.ayahs?.filter((ayah: Ayah) =>
    ayah.text.includes(searchTerm) || (ayah.translation && ayah.translation.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Gagal memuat surah</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
                      <Link
              to="/"
              className={`p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                theme.isDark ? 'hover:bg-gray-800' : 'hover:bg-amber-50'
              }`}
            >
              <ArrowLeft className={`h-6 w-6 ${theme.isDark ? 'text-amber-100' : 'text-black'}`} />
            </Link>
          <div className="min-w-0">
            <h1 style={{ color: theme.isDark ? 'inherit' : 'black' }} className="text-xl font-bold truncate text-black dark:text-amber-100">{surah?.name}</h1>
            <div className="flex flex-wrap items-center gap-1">
              <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-200' : 'text-black'}`}>
                {surah?.englishName}
              </p>
              <span style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                •
              </span>
              <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                {surah?.numberOfAyahs} ayat
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1 mt-1">
              <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                {surah?.arti}
              </p>
              <span style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                •
              </span>
              <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-black'}`}>
                {surah?.tempatTurun}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
          theme.isDark ? 'text-amber-300' : 'text-black'
        }`} />
        <input
          type="text"
          placeholder="Cari dalam surah ini..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200 ${
            theme.isDark
              ? 'bg-gray-800 border-gray-700 text-white placeholder-amber-300'
              : 'bg-white border-gray-200 text-black placeholder-black'
          } focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm`}
        />
      </div>

      {/* Ayahs */}
      <div className="space-y-4">
        {(searchTerm ? filteredAyahs : surah?.ayahs)?.map((ayah: Ayah) => (
          <div
            key={ayah.numberInSurah}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              theme.isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Ayah Number and Controls */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-7 h-7 rounded-full ${
                  theme.isDark ? 'bg-emerald-700' : 'bg-amber-100'
                }`}>
                  <span className={`text-xs font-bold ${
                    theme.isDark ? 'text-amber-100' : 'text-black'
                  }`}>
                    {ayah.numberInSurah}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    if (playingAyah === ayah.numberInSurah) {
                      handleAudioPause();
                    } else {
                      handleAudioPlay(ayah.audio || '', ayah.numberInSurah);
                    }
                  }}
                  className={`p-1.5 rounded-lg transition-colors duration-200 ${
                    theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {playingAyah === ayah.numberInSurah ? (
                    <Pause className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Play className="h-4 w-4 text-emerald-600" />
                  )}
                </button>
                
                <button
                  onClick={() => toggleBookmark(ayah)}
                  className={`p-1.5 rounded-lg transition-colors duration-200 ${
                    theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {isBookmarked(Number(surahNumber), ayah.numberInSurah) ? (
                    <BookmarkCheck className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Bookmark className="h-4 w-4 text-black" />
                  )}
                </button>
              </div>
            </div>

            {/* Arabic Text */}
            <div className="mb-3">
              <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className="text-xl leading-loose text-right font-arabic text-black dark:text-amber-100" dir="rtl">
                {ayah.text}
              </p>
            </div>

            {/* Latin Transliteration */}
            {ayah.transliteration && (
              <div className={`p-3 rounded-lg ${theme.isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-sm leading-relaxed italic ${theme.isDark ? 'text-amber-200' : 'text-black'}`}>
                  {ayah.transliteration}
                </p>
              </div>
            )}

            {/* Translation */}
            <div className={`p-3 rounded-lg mt-3 ${theme.isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
              <p style={{ color: theme.isDark ? 'inherit' : 'black' }} className={`text-sm leading-relaxed ${theme.isDark ? 'text-amber-200' : 'text-black'}`}>
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