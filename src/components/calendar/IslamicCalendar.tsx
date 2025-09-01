import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { useAppStore } from '../../store/useAppStore';
import { islamicUtils } from '../../utils/islamicUtils';
import { useGeolocation } from '../../hooks/useGeolocation';

const IslamicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cityInput, setCityInput] = useState('');
  const { theme, setLocation } = useAppStore();
  const geolocation = useGeolocation();

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically use a geocoding API to get lat/lon from city name
    // For this example, we'll just set a mock location
    setLocation({ city: cityInput, latitude: -6.2088, longitude: 106.8456 });
  };

  const handleUseCurrentLocation = () => {
    if (geolocation.latitude && geolocation.longitude) {
      setLocation({ city: 'Current Location', latitude: geolocation.latitude, longitude: geolocation.longitude });
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - getDay(monthStart));
  
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - getDay(monthEnd)));
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const importantDates = islamicUtils.getIslamicImportantDates();

  const isImportantDate = (date: Date): { isImportant: boolean; event?: string } => {
    const hijriDate = islamicUtils.gregorianToHijri(date);
    const dayMonth = hijriDate.split(' ').slice(0, 2).join(' ');
    
    const found = importantDates.find(important => important.date.includes(dayMonth));
    return {
      isImportant: !!found,
      event: found?.event
    };
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <CalendarIcon className="h-8 w-8 text-emerald-600" />
        <h1 className="text-2xl font-bold">Kalender Hijriah</h1>
      </div>

      {/* Current Islamic Date */}
      <div className={`p-4 rounded-lg border text-center ${
        theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <p className="text-lg font-semibold text-emerald-600">
          Hari Ini: {islamicUtils.getCurrentIslamicDateInfo()}
        </p>
        <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })}
        </p>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme.isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy', { locale: id })}
        </h2>
        
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme.isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className={`p-4 rounded-lg border ${
        theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
            <div key={day} className="p-2 text-center font-medium text-emerald-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const { isImportant, event } = isImportantDate(day);
            const today = isToday(day);
            const currentMonth = isCurrentMonth(day);

            return (
              <div
                key={day.toISOString()}
                className={`relative p-2 h-16 rounded-lg transition-all duration-200 ${
                  today
                    ? 'bg-emerald-600 text-white'
                    : isImportant
                    ? theme.isDark ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-800'
                    : currentMonth
                    ? theme.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    : theme.isDark ? 'text-gray-600' : 'text-gray-400'
                }`}
                title={event}
              >
                <div className="text-sm font-medium">{day.getDate()}</div>
                <div className="text-xs opacity-80">
                  {islamicUtils.gregorianToHijri(day).split(' ')[0]}
                </div>
                {isImportant && (
                  <Star className="absolute top-1 right-1 h-3 w-3 text-amber-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Dates List */}
      <div className={`p-4 rounded-lg border ${
        theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Star className="h-5 w-5 text-amber-500 mr-2" />
          Hari-Hari Penting Islam
        </h3>
        
        <div className="space-y-3">
          {importantDates.map((date, index) => (
            <div key={index} className={`p-3 rounded-lg ${
              theme.isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-amber-600">{date.event}</h4>
                  <p className={`text-sm ${theme.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {date.date}
                  </p>
                </div>
              </div>
              <p className={`text-sm mt-1 ${theme.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {date.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Location Input Form */}
      <div className={`p-4 rounded-lg border ${
        theme.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className="text-lg font-semibold mb-4">Ubah Lokasi</h3>
        
        <form onSubmit={handleCitySubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nama kota (contoh: Jakarta, Surabaya, Medan)"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
              theme.isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          />
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Atur Lokasi
            </button>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={geolocation.loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gunakan Lokasi Saat Ini
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IslamicCalendar;
