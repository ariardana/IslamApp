import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { prayerTimesApi } from '@/services/prayerTimesApi';

const PrayerTimes: React.FC = () => {
  const [cityInput, setCityInput] = useState('');
  const [location, setLocation] = useState({
    city: 'Jakarta',
    latitude: 0,
    longitude: 0,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['prayerTimes', location],
    queryFn: async () => {
      if (location.latitude && location.longitude) {
        return prayerTimesApi.getPrayerTimesByCoordinates(
          location.latitude,
          location.longitude
        );
      }
      return prayerTimesApi.getPrayerTimesByCity(location.city);
    },
  });

  const handleUseCurrentLocation = async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolokasi tidak didukung di browser ini');
      }
      
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      setLocation({
        city: 'Lokasi Saat Ini',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Gagal mendapatkan lokasi. Silakan masukkan kota secara manual.');
    }
  };

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = cityInput.trim();
    
    if (!city) {
      alert('Silakan masukkan nama kota');
      return;
    }
    
    setLocation({
      city: city,
      latitude: 0,
      longitude: 0,
    });
    setCityInput('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Jadwal Sholat</h2>
      <button onClick={handleUseCurrentLocation}>
        Gunakan Lokasi Saat Ini
      </button>
      
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Masukkan nama kota"
        />
        <button type="submit">Cari</button>
      </form>

      {data && (
        <div>
          <h3>Jadwal Sholat untuk {location.city}</h3>
          <ul>
            <li>Subuh: {data.timings.Fajr}</li>
            <li>Dzuhur: {data.timings.Dhuhr}</li>
            <li>Ashar: {data.timings.Asr}</li>
            <li>Maghrib: {data.timings.Maghrib}</li>
            <li>Isya: {data.timings.Isha}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;
