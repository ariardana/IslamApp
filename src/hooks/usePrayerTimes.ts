import { useQuery } from '@tanstack/react-query';
import { prayerTimesApi } from '../services/prayerTimesApi';
import { useAppStore } from '../store/useAppStore';

export const usePrayerTimes = () => {
  const { currentLocation } = useAppStore();

  return useQuery({
    queryKey: ['prayerTimes', currentLocation],
    queryFn: async () => {
      try {
        // Check if we have valid coordinates (not NaN and not zero)
        if (currentLocation?.latitude && currentLocation?.longitude && 
            !isNaN(currentLocation.latitude) && !isNaN(currentLocation.longitude)) {
          return await prayerTimesApi.getPrayerTimesByCoordinates(
            currentLocation.latitude,
            currentLocation.longitude
          );
        } else if (currentLocation?.city) {
          return await prayerTimesApi.getPrayerTimesByCity(currentLocation.city, 'Indonesia');
        } else {
          // Default to Jakarta
          return await prayerTimesApi.getPrayerTimesByCity('Jakarta', 'Indonesia');
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        throw new Error('Gagal memuat jadwal sholat. Silakan coba lagi.');
      }
    },
    enabled: true,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 300000, // 5 minutes
  });
};