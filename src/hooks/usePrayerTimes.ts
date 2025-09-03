import { useQuery } from '@tanstack/react-query';
import { prayerTimesApi } from '../services/prayerTimesApi';
import { useAppStore } from '../store/useAppStore';

export const usePrayerTimes = () => {
  const { currentLocation } = useAppStore();

  return useQuery({
    queryKey: ['prayerTimes', currentLocation],
    queryFn: async () => {
      try {
        // Check if we have valid coordinates (not null and not NaN)
        if (currentLocation?.latitude !== null && currentLocation?.longitude !== null && 
            !isNaN(currentLocation.latitude) && !isNaN(currentLocation.longitude)) {
          return await prayerTimesApi.getPrayerTimesByCoordinates(
            currentLocation.latitude,
            currentLocation.longitude
          );
        } else if (currentLocation?.city) {
          // Jika lokasi saat ini adalah lokasi geolocation, coba dengan kota default jika gagal
          if (currentLocation.city === 'Lokasi Saat Ini') {
            try {
              return await prayerTimesApi.getPrayerTimesByCoordinates(
                currentLocation.latitude,
                currentLocation.longitude
              );
            } catch (coordError) {
              // Jika gagal dengan koordinat, fallback ke Jakarta
              console.warn('Gagal dengan koordinat, fallback ke Jakarta:', coordError);
              return await prayerTimesApi.getPrayerTimesByCity('Jakarta', 'Indonesia');
            }
          } else {
            return await prayerTimesApi.getPrayerTimesByCity(currentLocation.city, 'Indonesia');
          }
        } else {
          // Default to Jakarta
          return await prayerTimesApi.getPrayerTimesByCity('Jakarta', 'Indonesia');
        }
      } catch (error: any) {
        console.error('Error fetching prayer times:', error);
        throw new Error(error.message || 'Gagal memuat jadwal sholat. Silakan coba lagi.');
      }
    },
    enabled: true,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 300000, // 5 minutes
    retry: 2, // Mencoba ulang 2 kali jika gagal
    retryDelay: 1000, // Delay 1 detik sebelum mencoba ulang
  });
};