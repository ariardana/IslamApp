import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock, Calendar, Newspaper, Star, TrendingUp } from 'lucide-react';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { useAppStore } from '../../store/useAppStore';
import { islamicUtils } from '../../utils/islamicUtils';

const Dashboard: React.FC = () => {
  const { data: prayerData } = usePrayerTimes();
  const { theme, bookmarkedAyahs, bookmarkedNews } = useAppStore();

  const quickActions = [
    {
      to: '/quran/surah/1',
      icon: Book,
      title: 'Baca Al-Fatihah',
      description: 'Mulai dengan surah pembuka',
      color: 'emerald'
    },
    {
      to: '/prayer-times',
      icon: Clock,
      title: 'Jadwal Sholat',
      description: 'Lihat waktu sholat hari ini',
      color: 'blue'
    },
    {
      to: '/calendar',
      icon: Calendar,
      title: 'Kalender Hijriah',
      description: 'Tanggal dan hari penting',
      color: 'purple'
    },
    {
      to: '/news',
      icon: Newspaper,
      title: 'Berita Islam',
      description: 'Update terkini dunia Islam',
      color: 'orange'
    }
  ];

  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700'
  };

  const nextPrayerInfo = prayerData ? islamicUtils.getTimeUntilNextPrayer(prayerData.timings) : null;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Assalamu'alaikum</h1>
        <p className={`text-lg ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Selamat datang di platform Islam digital lengkap
        </p>
        <p className={`text-sm ${theme.isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
          {islamicUtils.getCurrentIslamicDateInfo()}
        </p>
      </div>

      {/* Next Prayer Card */}
      {nextPrayerInfo && (
        <div className={`p-6 rounded-xl border-2 border-emerald-200 text-center ${
          theme.isDark ? 'bg-emerald-900/20' : 'bg-emerald-50'
        }`}>
          <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-emerald-700 mb-1">Sholat Selanjutnya</h2>
          <p className="text-2xl font-bold text-emerald-600">{nextPrayerInfo.nextPrayer}</p>
          <p className={`text-lg ${theme.isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
            dalam {nextPrayerInfo.timeLeft}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${
                theme.isDark
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                theme.isDark ? 'bg-gray-700' : colorClasses[action.color as keyof typeof colorClasses]
              }`}>
                <action.icon className={`h-6 w-6 ${
                  theme.isDark ? 'text-emerald-400' : ''
                }`} />
              </div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Aktivitas Anda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${
            theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                theme.isDark ? 'bg-amber-900/30' : 'bg-amber-100'
              }`}>
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{bookmarkedAyahs.length}</p>
                <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Ayat Tersimpan
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                theme.isDark ? 'bg-blue-900/30' : 'bg-blue-100'
              }`}>
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{bookmarkedNews.length}</p>
                <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Berita Tersimpan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookmarks */}
      {bookmarkedAyahs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Bookmark Terbaru</h2>
            <Link
              to="/bookmarks"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              Lihat Semua
            </Link>
          </div>
          
          <div className="space-y-3">
            {bookmarkedAyahs.slice(0, 3).map((bookmark) => (
              <Link
                key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
                to={`/quran/surah/${bookmark.surahNumber}`}
                className={`block p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  theme.isDark
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-emerald-600 mb-1">
                      {bookmark.surahName} - Ayat {bookmark.ayahNumber}
                    </h3>
                    <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                      {bookmark.translation}
                    </p>
                  </div>
                  <Star className="h-5 w-5 text-amber-500 ml-3 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;