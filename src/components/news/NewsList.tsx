import React, { useState } from 'react';
import { Newspaper, Bookmark, BookmarkCheck, Share2, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { newsApi } from '../../services/newsApi';
import { useAppStore } from '../../store/useAppStore';
import LoadingSpinner from '../common/LoadingSpinner';

const NewsList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { theme, bookmarkedNews, addBookmarkedNews, removeBookmarkedNews } = useAppStore();
  
  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news', selectedCategory],
    queryFn: () => newsApi.getIslamicNews(selectedCategory),
    staleTime: 300000, // 5 minutes
  });

  const categories = newsApi.getNewsCategories();
  const categoryLabels: Record<string, string> = {
    all: 'Semua',
    dakwah: 'Dakwah',
    'haji-umrah': 'Haji & Umrah',
    pendidikan: 'Pendidikan'
  };

  const isBookmarked = (articleId: string): boolean => {
    return bookmarkedNews.some(article => article.id === articleId);
  };

  const toggleBookmark = (article: any) => {
    if (isBookmarked(article.id)) {
      removeBookmarkedNews(article.id);
    } else {
      addBookmarkedNews(article);
    }
  };

  const handleShare = async (article: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${article.title}\n${window.location.href}`);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Newspaper className="h-8 w-8 text-emerald-600" />
        <h1 className="text-2xl font-bold">Berita Islam</h1>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white'
                : theme.isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* News Articles */}
      <div className="space-y-4">
        {news?.map((article) => (
          <article
            key={article.id}
            className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
              theme.isDark
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col md:flex-row md:space-x-4">
              {/* Article Image */}
              <div className="md:w-48 md:flex-shrink-0 mb-4 md:mb-0">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 md:h-32 object-cover rounded-lg"
                />
              </div>

              {/* Article Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-semibold leading-tight">{article.title}</h2>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleBookmark(article)}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {isBookmarked(article.id) ? (
                        <BookmarkCheck className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Bookmark className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleShare(article)}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Share2 className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
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
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    theme.isDark ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {categoryLabels[article.category]}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Gagal memuat berita</p>
          <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Pastikan koneksi internet Anda stabil dan coba lagi
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsList;