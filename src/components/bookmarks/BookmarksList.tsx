import React, { useState } from 'react';
import { Bookmark, Book, Newspaper, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const BookmarksList: React.FC = () => {
  const { 
    theme, 
    bookmarkedAyahs, 
    bookmarkedNews, 
    removeBookmarkedAyah, 
    removeBookmarkedNews 
  } = useAppStore();
  const [activeTab, setActiveTab] = useState<'ayahs' | 'news'>('ayahs');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Bookmark className="h-8 w-8 text-emerald-600" />
        <h1 className="text-2xl font-bold">Bookmark</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1">
        <button
          onClick={() => setActiveTab('ayahs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'ayahs'
              ? 'bg-emerald-600 text-white'
              : theme.isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Book className="h-4 w-4" />
          <span>Ayat ({bookmarkedAyahs.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'news'
              ? 'bg-emerald-600 text-white'
              : theme.isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Newspaper className="h-4 w-4" />
          <span>Berita ({bookmarkedNews.length})</span>
        </button>
      </div>

      {/* Bookmarked Ayahs */}
      {activeTab === 'ayahs' && (
        <div className="space-y-4">
          {bookmarkedAyahs.length === 0 ? (
            <div className="text-center py-12">
              <Book className={`h-16 w-16 mx-auto mb-4 ${
                theme.isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-semibold mb-2 ${
                theme.isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Belum ada ayat yang di-bookmark
              </h3>
              <p className={`text-sm ${theme.isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Mulai baca Al-Qur'an dan bookmark ayat favorit Anda
              </p>
              <Link
                to="/"
                className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Baca Al-Qur'an
              </Link>
            </div>
          ) : (
            bookmarkedAyahs.map((bookmark) => (
              <div
                key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  theme.isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <Link
                    to={`/quran/surah/${bookmark.surahNumber}`}
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    {bookmark.surahName} - Ayat {bookmark.ayahNumber}
                  </Link>
                  <button
                    onClick={() => removeBookmarkedAyah(bookmark.surahNumber, bookmark.ayahNumber)}
                    className={`p-1 rounded-lg transition-colors duration-200 ${
                      theme.isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="text-xl leading-loose text-right font-arabic" dir="rtl">
                    {bookmark.text}
                  </p>
                  <p className={`text-sm ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {bookmark.translation}
                  </p>
                </div>

                <p className={`text-xs ${theme.isDark ? 'text-gray-500' : 'text-gray-500'} mt-3`}>
                  Ditambahkan {format(new Date(bookmark.addedAt), 'dd MMM yyyy', { locale: id })}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bookmarked News */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          {bookmarkedNews.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className={`h-16 w-16 mx-auto mb-4 ${
                theme.isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-semibold mb-2 ${
                theme.isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Belum ada berita yang di-bookmark
              </h3>
              <p className={`text-sm ${theme.isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Mulai baca berita dan bookmark artikel yang menarik
              </p>
              <Link
                to="/news"
                className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Baca Berita
              </Link>
            </div>
          ) : (
            bookmarkedNews.map((article) => (
              <article
                key={article.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  theme.isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-semibold leading-tight flex-1">{article.title}</h2>
                  <button
                    onClick={() => removeBookmarkedNews(article.id)}
                    className={`p-1 rounded-lg ml-4 transition-colors duration-200 ${
                      theme.isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  {article.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className={`text-xs ${theme.isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    <span>Oleh {article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{format(new Date(article.publishedAt), 'dd MMM yyyy', { locale: id })}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleShare(article)}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Share2 className="h-4 w-4 text-gray-400" />
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