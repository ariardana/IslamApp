import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, HeartOff, Share2, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';
import { Prayer } from '../../types';

// Function to get static doa data
const getStaticDoa = async (): Promise<Prayer[]> => {
  const response = await fetch('/api/prayers');
  const doa = await response.json();
  return doa;
};

// Function to search static doa data
const searchStaticDoa = async (query: string): Promise<Prayer[]> => {
  const response = await fetch(`/api/prayers/search?q=${encodeURIComponent(query)}`);
  const doa = await response.json();
  return doa;
};

const DoaList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, bookmarkedPrayers, addBookmarkedPrayer, removeBookmarkedPrayer } = useAppStore();
  
  const { data: allDoa, isLoading, error } = useQuery({
    queryKey: ['doa'],
    queryFn: () => getStaticDoa(),
    staleTime: 300000, // 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });

  const { data: searchResults, isFetching: isSearching } = useQuery({
    queryKey: ['doa', searchQuery],
    queryFn: () => searchStaticDoa(searchQuery),
    enabled: searchQuery.length > 0,
    staleTime: 300000, // 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });

  const doaToShow = searchQuery.length > 0 ? searchResults : allDoa;
  const isBookmarked = (doaId: string): boolean => {
    return bookmarkedPrayers.some(doa => doa.id === doaId);
  };

  const toggleBookmark = (doa: Prayer) => {
    if (isBookmarked(doa.id)) {
      removeBookmarkedPrayer(doa.id);
    } else {
      addBookmarkedPrayer(doa);
    }
  };

  const handleShare = async (doa: Prayer) => {
    const shareText = `${doa.title}\n\n${doa.arabic}\n${doa.latin}\n\nArtinya: ${doa.translation}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: doa.title,
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
        <h1 className="text-xl sm:text-2xl font-bold">Kumpulan Doa</h1>
      </div>

      {/* Search Bar */}
      <div className={`relative rounded-lg ${theme.isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Cari doa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 rounded-lg border-0 text-sm sm:text-base ${
            theme.isDark 
              ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-emerald-500' 
              : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-emerald-500'
          } focus:ring-2 focus:ring-inset transition-colors duration-200`}
        />
      </div>

      {/* Doa */}
      <div className="space-y-3 sm:space-y-4">
        {doaToShow?.map((doa) => (
          <Link
            to={`/doa/${doa.id}`}
            key={doa.id}
            className={`block p-4 sm:p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
              theme.isDark
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <h2 className="text-base sm:text-lg font-semibold">{doa.title}</h2>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleBookmark(doa);
                  }}
                  className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                    theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {isBookmarked(doa.id) ? (
                    <HeartOff className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                  ) : (
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  )}
                </button>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare(doa);
                  }}
                  className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                    theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Arabic Text */}
            <div className={`text-xl sm:text-2xl leading-loose text-right mb-3 sm:mb-4 ${theme.isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {doa.arabic}
            </div>

            {/* Latin */}
            <div className={`text-xs sm:text-sm italic mb-2 ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {doa.latin}
            </div>

            {/* Translation */}
            <div className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="font-medium">Artinya:</span> {doa.translation}
            </div>
          </Link>
        ))}
      </div>

      {/* Loading indicator for search */}
      {isSearching && searchQuery.length > 0 && (
        <div className="flex justify-center py-3 sm:py-4">
          <LoadingSpinner />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isSearching && doaToShow?.length === 0 && searchQuery.length > 0 && (
        <div className="text-center py-6 sm:py-8">
          <p className={`text-base sm:text-lg ${theme.isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Tidak ditemukan doa dengan kata kunci "{searchQuery}"
          </p>
        </div>
      )}

      {error && (
        <div className={`p-4 sm:p-6 rounded-lg border ${
          theme.isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
        }`}>
          <p className="text-red-500 font-medium mb-2 text-sm sm:text-base">Gagal memuat kumpulan doa</p>
          <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-red-300' : 'text-red-700'}`}>
            {(error as Error).message || 'Pastikan koneksi internet Anda stabil dan coba lagi'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${
              theme.isDark 
                ? 'bg-red-800 text-white hover:bg-red-700' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
};

export default DoaList;