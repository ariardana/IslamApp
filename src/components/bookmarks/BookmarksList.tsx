import React, { useState } from 'react';
import { Bookmark, Book, BookOpen, Trash2, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const BookmarksList: React.FC = () => {
  const { 
    theme, 
    bookmarkedAyahs, 
    bookmarkedNews, 
    bookmarkedPrayers,
    removeBookmarkedAyah, 
    removeBookmarkedNews,
    removeBookmarkedPrayer
  } = useAppStore();
  const [activeTab, setActiveTab] = useState<'ayahs' | 'news' | 'prayers'>('ayahs');

  const handleShare = async (content: any, type: 'news' | 'prayer') => {
    let shareText = '';
    let title = '';
    
    if (type === 'news') {
      shareText = `${content.title}\n\n${content.description}\n\n${window.location.origin}/news`;
      title = content.title;
    } else if (type === 'prayer') {
      shareText = `${content.doa}\n\n${content.ayat}\n${content.latin}\n\nArtinya: ${content.artinya}\n\n${window.location.origin}/prayers`;
      title = content.doa;
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Bookmark className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
        <h1 className="text-xl sm:text-2xl font-bold">Bookmark</h1>
      </div>

      {/* Tabs - Responsive for mobile */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('ayahs')}
          className={`flex items-center space-x-1 sm:space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-200 ${
            activeTab === 'ayahs'
              ? 'bg-emerald-600 text-white'
              : theme.isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Book className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="truncate">Ayat ({bookmarkedAyahs.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('prayers')}
          className={`flex items-center space-x-1 sm:space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-200 ${
            activeTab === 'prayers'
              ? 'bg-emerald-600 text-white'
              : theme.isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="truncate">Doa ({bookmarkedPrayers.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center space-x-1 sm:space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-200 ${
            activeTab === 'news'
              ? 'bg-emerald-600 text-white'
              : theme.isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="truncate">Berita ({bookmarkedNews.length})</span>
        </button>
      </div>

      {/* Bookmarked Ayahs */}
      {activeTab === 'ayahs' && (
        <div className="space-y-3 sm:space-y-4">
          {bookmarkedAyahs.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Book className={`h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 ${
                theme.isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${
                theme.isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Belum ada ayat yang di-bookmark
              </h3>
              <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Mulai baca Al-Qur'an dan bookmark ayat favorit Anda
              </p>
              <Link
                to="/"
                className="inline-block mt-3 sm:mt-4 px-4 py-1.5 sm:px-6 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm sm:text-base"
              >
                Baca Al-Qur'an
              </Link>
            </div>
          ) : (
            bookmarkedAyahs.map((bookmark) => (
              <div
                key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
                className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
                  theme.isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <Link
                    to={`/quran/surah/${bookmark.surahNumber}`}
                    className="text-emerald-600 font-medium hover:underline text-xs sm:text-sm"
                  >
                    {bookmark.surahName} - Ayat {bookmark.ayahNumber}
                  </Link>
                  <button
                    onClick={() => removeBookmarkedAyah(bookmark.surahNumber, bookmark.ayahNumber)}
                    className={`p-1 rounded-lg transition-colors duration-200 ${
                      theme.isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                    }`}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <p className="text-lg sm:text-xl leading-loose text-right font-arabic" dir="rtl">
                    {bookmark.text}
                  </p>
                  <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {bookmark.translation}
                  </p>
                </div>

                <p className={`text-xs ${theme.isDark ? 'text-gray-500' : 'text-gray-500'} mt-2 sm:mt-3`}>
                  Ditambahkan {format(new Date(bookmark.addedAt), 'dd MMM yyyy', { locale: id })}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bookmarked Prayers */}
      {activeTab === 'prayers' && (
        <div className="space-y-3 sm:space-y-4">
          {bookmarkedPrayers.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <BookOpen className={`h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 ${
                theme.isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${
                theme.isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Belum ada doa yang di-bookmark
              </h3>
              <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Mulai jelajahi kumpulan doa dan bookmark doa favorit Anda
              </p>
              <Link
                to="/prayers"
                className="inline-block mt-3 sm:mt-4 px-4 py-1.5 sm:px-6 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm sm:text-base"
              >
                Lihat Kumpulan Doa
              </Link>
            </div>
          ) : (
            bookmarkedPrayers.map((prayer) => (
              <div
                key={prayer.id}
                className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
                  theme.isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h2 className="text-base sm:text-lg font-semibold">{prayer.doa}</h2>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => handleShare(prayer, 'prayer')}
                      className={`p-1 rounded-lg transition-colors duration-200 ${
                        theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => removeBookmarkedPrayer(prayer.id)}
                      className={`p-1 rounded-lg transition-colors duration-200 ${
                        theme.isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                      }`}
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className={`text-lg sm:text-xl leading-loose text-right mb-2 sm:mb-3 ${theme.isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {prayer.ayat}
                </div>

                {/* Latin */}
                <div className={`text-xs sm:text-sm italic mb-1 sm:mb-2 ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {prayer.latin}
                </div>

                {/* Translation */}
                <div className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="font-medium">Artinya:</span> {prayer.artinya}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bookmarked News */}
      {activeTab === 'news' && (
        <div className="space-y-3 sm:space-y-4">
          {bookmarkedNews.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <BookOpen className={`h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 ${
                theme.isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${
                theme.isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Belum ada berita yang di-bookmark
              </h3>
              <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Mulai baca berita dan bookmark artikel yang menarik
              </p>
              <Link
                to="/prayers"
                className="inline-block mt-3 sm:mt-4 px-4 py-1.5 sm:px-6 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm sm:text-base"
              >
                Lihat Kumpulan Doa
              </Link>
            </div>
          ) : (
            bookmarkedNews.map((article) => (
              <article
                key={article.id}
                className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
                  theme.isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h2 className="text-base sm:text-lg font-semibold leading-tight flex-1">{article.title}</h2>
                  <button
                    onClick={() => removeBookmarkedNews(article.id)}
                    className={`p-1 rounded-lg ml-2 sm:ml-4 transition-colors duration-200 ${
                      theme.isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                    }`}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>

                <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 sm:mb-3`}>
                  {article.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className={`text-xs ${theme.isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    <span>Oleh {article.author}</span>
                    <span className="mx-1 sm:mx-2">•</span>
                    <span>{format(new Date(article.publishedAt), 'dd MMM yyyy', { locale: id })}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => handleShare(article, 'news')}
                      className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                        theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarksList;