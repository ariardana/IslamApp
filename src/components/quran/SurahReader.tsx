import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Play, Pause, Search, AlertCircle } from 'lucide-react';
import { useSurah } from '../../hooks/useQuran';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';
import { toast } from 'react-hot-toast';

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
  audioSecondary?: string[];
  audioFull?: { [key: string]: string };
}

const SurahReader: React.FC = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const { data: surah, isLoading, error } = useSurah(Number(surahNumber));
  const { theme, bookmarkedAyahs, addBookmarkedAyah, removeBookmarkedAyah } = useAppStore();
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQari, setSelectedQari] = useState('01'); // Default to first qari

  const isValidAudioUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  try {
    const parsedUrl = new URL(url);
    // Check if it's a valid HTTP/HTTPS URL
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (e) {
    // If URL parsing fails, it's not a valid URL
    return false;
  }
};

// Function to check if audio is accessible (preflight check)
const isAudioAccessible = async (url: string): Promise<boolean> => {
  if (!isValidAudioUrl(url)) {
    return false;
  }
  
  try {
    // Try to fetch the audio file first to check if it's accessible
    const response = await fetch(url, { method: 'HEAD', mode: 'cors' });
    const isAccessible = response.ok && response.headers.get('content-type')?.includes('audio');
    
    console.log(`Audio accessibility check for ${url}:`, {
      status: response.status,
      contentType: response.headers.get('content-type'),
      isAccessible
    });
    
    return isAccessible;
  } catch (error) {
    console.error('Error checking audio accessibility:', error);
    return false;
  }
};

const getSurahAudioUrl = (): string => {
  // If surah has audioFull object with the selected qari, use that
  if (surah?.audioFull && surah.audioFull[selectedQari]) {
    return surah.audioFull[selectedQari];
  }
  // Fallback to first audio if selected qari not found
  return surah?.audio || '';
};

const getAyahAudioUrl = (ayah: Ayah): string => {
  // If ayah has audio object with the selected qari, use that
  if (ayah.audioSecondary && ayah.audioSecondary.length > parseInt(selectedQari) - 1) {
    return ayah.audioSecondary[parseInt(selectedQari) - 1];
  }
  // Fallback to first audio if selected qari not found
  return ayah.audio || '';
};

const handleAudioPlay = (ayah: Ayah) => {
  const ayahAudioUrl = getAyahAudioUrl(ayah);
  
  // Check if ayahAudioUrl is valid
  if (!isValidAudioUrl(ayahAudioUrl)) {
    console.log('No valid audio URL available for this ayah:', ayahAudioUrl);
    toast.error('Audio tidak tersedia untuk ayat ini');
    setPlayingAyah(null);
    
    // Try alternative audio sources if available
    if (ayah.audioSecondary && ayah.audioSecondary.length > 0) {
      console.log('Trying alternative audio sources...');
      // Try the available audio sources one by one
      for (let i = 0; i < ayah.audioSecondary.length; i++) {
        const alternativeUrl = ayah.audioSecondary[i];
        if (alternativeUrl && isValidAudioUrl(alternativeUrl)) {
          console.log(`Trying alternative audio URL [${i}]:`, alternativeUrl);
          handleAudioPlay(ayah);
          return;
        }
      }
    }
    
    return;
  }

  // Pause current audio if exists
  if (currentAudio) {
    currentAudio.pause();
  }

  console.log('Attempting to play audio:', ayahAudioUrl);

  // Create new audio element
  const audio = new Audio(ayahAudioUrl);
  
  // Set up event listeners
  audio.onplay = () => {
    console.log('Audio started playing');
    setPlayingAyah(ayah.numberInSurah);
  };
  
  audio.onended = () => {
    console.log('Audio finished playing');
    setPlayingAyah(null);
  };
  
  audio.onerror = (e) => {
    console.error('Audio playback error:', e);
    console.log('Audio URL that failed:', ayahAudioUrl);
    toast.error('Gagal memutar audio. Silakan coba lagi.');
    
    // Try alternative audio sources if available
    if (ayah.audioSecondary && ayah.audioSecondary.length > 0) {
      console.log('Trying alternative audio sources...');
      // Try the available audio sources one by one
      for (let i = 0; i < ayah.audioSecondary.length; i++) {
        const alternativeUrl = ayah.audioSecondary[i];
        // Skip the current URL that failed
        if (alternativeUrl && alternativeUrl !== ayahAudioUrl && isValidAudioUrl(alternativeUrl)) {
          console.log(`Trying alternative audio URL [${i}]:`, alternativeUrl);
          handleAudioPlay(ayah);
          return;
        }
      }
    }
    
    setPlayingAyah(null);
  };
  
  audio.onloadeddata = () => {
    console.log('Audio loaded successfully');
  };
  
  audio.oncanplay = () => {
    console.log('Audio can be played');
  };
  
  setCurrentAudio(audio);
  
  // Attempt to play
  audio.play().catch((error) => {
    console.error('Could not play audio:', error);
    console.log('Audio URL that could not be played:', ayahAudioUrl);
    toast.error('Gagal memutar audio. Silakan coba lagi.');
    setPlayingAyah(null);
  });
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
        
        {/* Qari Selection */}
        <div className="flex flex-col items-end">
          <label className={`text-xs ${theme.isDark ? 'text-amber-300' : 'text-gray-600'}`}>
            Pilih Qari
          </label>
          <select
            value={selectedQari}
            onChange={(e) => setSelectedQari(e.target.value)}
            className={`text-sm rounded px-2 py-1 ${
              theme.isDark
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-black'
            } border`}
          >
            <option value="01">Abdullah Al-Juhany</option>
            <option value="02">Abdul Muhsin Al-Qasim</option>
            <option value="03">Abdurrahman As-Sudais</option>
            <option value="04">Ibrahim Al-Dossari</option>
            <option value="05">Misyari Rasyid Al-Afasy</option>
          </select>
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
                {/* Debug: Display audio URL */}
                {import.meta.env.DEV && ayah.audio && (
                  <div className="text-xs text-gray-500 truncate max-w-[100px]">
                    {getAyahAudioUrl(ayah).substring(0, 30)}...
                  </div>
                )}
                {/* Display selected qari */}
                <div className="text-xs text-gray-500">
                  Qari: {selectedQari === '01' ? 'Al-Juhany' : 
                        selectedQari === '02' ? 'Al-Qasim' : 
                        selectedQari === '03' ? 'As-Sudais' : 
                        selectedQari === '04' ? 'Al-Dossari' : 'Al-Afasy'}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    if (playingAyah === ayah.numberInSurah) {
                      handleAudioPause();
                    } else {
                      // Log audio URL for debugging
                      const audioUrl = getAyahAudioUrl(ayah);
                      console.log('Playing ayah audio:', audioUrl || 'No audio URL');
                      handleAudioPlay(ayah);
                    }
                  }}
                  disabled={!ayah.audio}
                  className={`p-1.5 rounded-lg transition-colors duration-200 ${
                    !ayah.audio 
                      ? 'opacity-50 cursor-not-allowed' 
                      : theme.isDark 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                  }`}
                  title={!ayah.audio ? "Audio tidak tersedia untuk ayat ini" : "Putar audio"}
                >
                  {playingAyah === ayah.numberInSurah ? (
                    <Pause className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Play className={`h-4 w-4 ${ayah.audio ? 'text-emerald-600' : 'text-gray-400'}`} />
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

            {/* Audio warning message */}
            {!ayah.audio && (
              <div className="mb-2 flex items-center text-xs text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Audio tidak tersedia untuk ayat ini</span>
              </div>
            )}

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