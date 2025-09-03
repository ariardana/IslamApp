import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Bell, BellOff, Navigation as NavigationIcon } from 'lucide-react';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useAppStore } from '../../store/useAppStore';
import { islamicUtils } from '../../utils/islamicUtils';
import LoadingSpinner from '../common/LoadingSpinner';

const PrayerTimes: React.FC = () => {
  const { data: prayerData, isLoading, error } = usePrayerTimes();
  const geolocation = useGeolocation();
  const { 
    theme, 
    currentLocation, 
    setLocation, 
    prayerNotifications, 
    togglePrayerNotifications 
  } = useAppStore();
  const [cityInput, setCityInput] = useState('');
  const [nextPrayerInfo, setNextPrayerInfo] = useState<{ nextPrayer: string; timeLeft: string } | null>(null);

  // Update next prayer info every minute
  useEffect(() => {
    if (prayerData?.timings) {
      const updateNextPrayer = () => {
        const info = islamicUtils.getTimeUntilNextPrayer(prayerData.timings);
        setNextPrayerInfo(info);
      };
      
      updateNextPrayer();
      const interval = setInterval(updateNextPrayer, 60000);
      
      return () => clearInterval(interval);
    }
  }, [prayerData]);

  // Auto-detect location
  useEffect(() => {
    if (!currentLocation) {
      if (geolocation.latitude && geolocation.longitude) {
        setLocation({
          city: 'Lokasi Saat Ini',
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
        });
      } else if (geolocation.error && !geolocation.loading) {
        // If there's an error with geolocation and it's not still loading,
        // set a default location (Jakarta)
        setLocation({
          city: 'Jakarta',
          latitude: -6.2088,
          longitude: 106.8456,
        });
      }
    }
  }, [geolocation, currentLocation, setLocation]);

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setLocation({
        city: cityInput.trim(),
        // For city-based lookups, we set lat/long to null so the API knows to search by city name
        latitude: NaN,
        longitude: NaN,
      });
      setCityInput('');
    }
  };

  const handleUseCurrentLocation = () => {
    if (geolocation.latitude && geolocation.longitude) {
      setLocation({
        city: 'Lokasi Saat Ini',
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      });
    }
  };

  const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
          <h1 className="text-xl sm:text-2xl font-bold">Jadwal Sholat</h1>
        </div>
        
        <button
          onClick={togglePrayerNotifications}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme.isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          {prayerNotifications ? (
            <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
          ) : (
            <BellOff className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
          )}
        </button>
      </div>

      {/* Location Input */}
      <div className={`p-3 sm:p-4 rounded-lg border ${
        theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center space-x-2 mb-2 sm:mb-3">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
          <span className="text-sm sm:text-base font-medium">
            Lokasi: {currentLocation?.city || 'Belum diatur'}
            {currentLocation?.latitude && currentLocation?.longitude && 
             !isNaN(currentLocation.latitude) && !isNaN(currentLocation.longitude) && 
             currentLocation.city !== 'Lokasi Saat Ini' ? 
             ` (${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)})` : ''}
          </span>
        </div>
        
        <form onSubmit={handleCitySubmit} className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <input
            type="text"
            placeholder="Masukkan nama kota..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className={`flex-1 px-3 py-2 rounded-lg border transition-colors duration-200 text-sm sm:text-base ${
              theme.isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Cari
            </button>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={geolocation.loading || (!geolocation.latitude && !geolocation.longitude)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <NavigationIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </form>
        
        {geolocation.error && (
          <p className="text-xs sm:text-sm text-amber-600 mt-2">{geolocation.error}</p>
        )}
      </div>

      {/* Next Prayer Countdown */}
      {nextPrayerInfo && prayerData && (
        <div className={`p-4 sm:p-6 rounded-lg border-2 border-emerald-200 ${
          theme.isDark ? 'bg-emerald-900/20' : 'bg-emerald-50'
        }`}>
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-semibold text-emerald-700">Sholat Selanjutnya</h2>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 sm:mt-2">{nextPrayerInfo.nextPrayer}</p>
            <p className={`text-base sm:text-lg ${theme.isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
              dalam {nextPrayerInfo.timeLeft}
            </p>
          </div>
        </div>
      )}

      {/* Today's Date */}
      {prayerData && (
        <div className={`p-3 sm:p-4 rounded-lg border ${
          theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold">
              {prayerData.date.gregorian.weekday.en}, {prayerData.date.readable}
            </p>
            <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year} H
            </p>
          </div>
        </div>
      )}

      {/* Prayer Times Grid */}
      {prayerData && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {prayerNames.map((prayer) => (
            <div
              key={prayer}
              className={`p-3 sm:p-4 rounded-lg border text-center transition-all duration-200 hover:shadow-md ${
                theme.isDark
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold text-sm sm:text-base text-emerald-600">
                {islamicUtils.getPrayerNameInIndonesian(prayer)}
              </h3>
              <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                {islamicUtils.formatPrayerTime(prayerData.timings[prayer as keyof typeof prayerData.timings])}
              </p>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className={`p-3 sm:p-4 rounded-lg border ${
          theme.isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
        }`}>
          <p className="text-red-500 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Gagal memuat jadwal sholat</p>
          <p className={`text-xs sm:text-sm ${theme.isDark ? 'text-red-300' : 'text-red-700'}`}>
            {error.message || 'Pastikan koneksi internet Anda stabil dan coba lagi'}
          </p>
          {currentLocation && (
            <p className={`text-xs mt-1 sm:mt-2 ${theme.isDark ? 'text-red-400' : 'text-red-600'}`}>
              Lokasi saat ini: {currentLocation.city} 
              {currentLocation.latitude && currentLocation.longitude && !isNaN(currentLocation.latitude) && !isNaN(currentLocation.longitude) 
                ? ` (${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)})` 
                : ''}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;