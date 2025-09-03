import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, HeartOff, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';
import { Prayer } from '../../types';

// Function to get static doa data by ID
const getStaticDoaById = async (id: string): Promise<Prayer> => {
  const response = await fetch('/src/data/doa.json');
  const doa = await response.json();
  const selectedDoa = doa.find((d: Prayer) => d.id === id);
  if (!selectedDoa) {
    throw new Error('Doa not found');
  }
  return selectedDoa;
};

const DoaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, bookmarkedPrayers, addBookmarkedPrayer, removeBookmarkedPrayer } = useAppStore();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: doa, isLoading, error } = useQuery({
    queryKey: ['doa', id],
    queryFn: () => getStaticDoaById(id!),
    enabled: !!id,
    staleTime: 300000, // 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });

  useEffect(() => {
    if (doa) {
      setIsBookmarked(bookmarkedPrayers.some(p => p.id === doa.id));
    }
  }, [doa, bookmarkedPrayers]);

  const toggleBookmark = () => {
    if (!doa) return;
    
    if (isBookmarked) {
      removeBookmarkedPrayer(doa.id);
    } else {
      addBookmarkedPrayer(doa);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (!doa) return;
    
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

  if (error) {
    return (
      <div className={`p-4 sm:p-6 rounded-lg border ${theme.isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`}>
        <p className="text-red-500 font-medium mb-2 text-sm sm:text-base">Gagal memuat detail doa</p>
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
    );
  }

  if (!doa) {
    return (
      <div className={`p-6 sm:p-8 rounded-lg border text-center ${theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <p className={`text-base sm:text-lg ${theme.isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Doa tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate(-1)}
          className={`p-2 rounded-lg transition-colors duration-200 ${theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
        <h1 className="text-xl sm:text-2xl font-bold">Detail Doa</h1>
      </div>

      {/* Doa Content */}
      <article
        className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 ${theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">{doa.title}</h2>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={toggleBookmark}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isBookmarked ? (
                <HeartOff className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
              ) : (
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
              )}
            </button>
            
            <button
              onClick={handleShare}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Arabic Text */}
        <div className={`text-2xl sm:text-3xl leading-loose text-right mb-4 sm:mb-6 ${theme.isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {doa.arabic}
        </div>

        {/* Latin */}
        <div className={`text-sm sm:text-base italic mb-3 ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {doa.latin}
        </div>

        {/* Translation */}
        <div className={`text-sm sm:text-base ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="font-medium">Artinya:</span> {doa.translation}
        </div>
      </article>
    </div>
  );
};

export default DoaDetail;