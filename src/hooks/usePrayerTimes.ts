import { useQuery } from '@tanstack/react-query';
import { prayerTimesApi } from '../services/prayerTimesApi';
import { useAppStore } from '../store/useAppStore';

export const usePrayerTimes = () => {
  const { currentLocation } = useAppStore();

  return useQuery({
    queryKey: ['prayerTimes', currentLocation],
    queryFn: async () => {
      if (currentLocation?.latitude && currentLocation?.longitude) {
        return prayerTimesApi.getPrayerTimesByCoordinates(
          currentLocation.latitude,
          currentLocation.longitude
        );
      } else if (currentLocation?.city) {
        return prayerTimesApi.getPrayerTimesByCity(currentLocation.city);
      } else {
        // Default to Jakarta
        return prayerTimesApi.getPrayerTimesByCity('Jakarta');
      }
    },
    enabled: true,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 300000, // 5 minutes
  });
};