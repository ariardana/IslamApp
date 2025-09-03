import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

// Fungsi untuk mendapatkan lokasi dari IP address
const getLocationFromIP = async (): Promise<{ lat: number; lon: number; city?: string }> => {
  try {
    // Menggunakan API IP geolocation gratis
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lon: data.longitude,
        city: data.city
      };
    }
    
    throw new Error('IP geolocation failed');
  } catch (error) {
    // Fallback ke API alternatif
    try {
      const response = await fetch('https://ipapi.com/ip_api.php?output=json');
      const data = await response.json();
      
      if (data.latitude && data.longitude) {
        return {
          lat: data.latitude,
          lon: data.longitude,
          city: data.city
        };
      }
    } catch (fallbackError) {
      // Jika semua API gagal, gunakan lokasi default (Jakarta)
      return {
        lat: -6.2088,
        lon: 106.8456,
        city: 'Jakarta'
      };
    }
    
    throw error;
  }
};

export const useCustomGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
  });

  const getLocation = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    // Coba geolocation browser dulu
    if (navigator.geolocation) {
      try {
        // Gunakan Promise untuk mengatur timeout
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Geolocation timeout'));
          }, 10000); // 10 detik timeout

          navigator.geolocation.getCurrentPosition(
            (position) => {
              clearTimeout(timeoutId);
              resolve(position);
            },
            (error) => {
              clearTimeout(timeoutId);
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000
            }
          );
        });

        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
        });
        return;
      } catch (browserError) {
        console.warn('Browser geolocation failed:', browserError);
        // Lanjutkan ke metode fallback
      }
    }

    // Jika geolocation browser gagal, coba IP-based geolocation
    try {
      const locationData = await getLocationFromIP();
      
      setState({
        latitude: locationData.lat,
        longitude: locationData.lon,
        accuracy: null,
        error: null,
        loading: false,
      });
    } catch (ipError) {
      console.error('IP geolocation failed:', ipError);
      
      // Fallback ke lokasi default
      setState({
        latitude: -6.2088,
        longitude: 106.8456,
        accuracy: null,
        error: 'Tidak dapat mendeteksi lokasi secara otomatis. Menggunakan lokasi default (Jakarta).',
        loading: false,
      });
    }
  }, []);

  // Fungsi untuk merefresh lokasi
  const refreshLocation = useCallback(() => {
    getLocation();
  }, [getLocation]);

  // Dapatkan lokasi saat pertama kali hook digunakan
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return {
    ...state,
    refreshLocation
  };
};