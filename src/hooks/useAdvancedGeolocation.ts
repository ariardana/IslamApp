import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  city?: string;
  country?: string;
  accuracy?: number;
}

interface GeolocationHook {
  location: LocationData;
  loading: boolean;
  error: string | null;
  getLocation: () => void;
}

// Fungsi untuk mendapatkan lokasi dari IP address menggunakan beberapa API
const getLocationFromIP = async (): Promise<LocationData> => {
  // Daftar API yang akan dicoba secara berurutan
  const apis = [
    {
      name: 'ipapi.co',
      url: 'https://ipapi.co/json/',
      parser: (data: any) => ({
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        country: data.country_name
      })
    },
    {
      name: 'ip-api.com',
      url: 'http://ip-api.com/json/',
      parser: (data: any) => ({
        latitude: data.lat,
        longitude: data.lon,
        city: data.city,
        country: data.country
      })
    },
    {
      name: 'ipinfo.io',
      url: 'https://ipinfo.io/json',
      parser: (data: any) => {
        const [lat, lon] = data.loc.split(',').map(Number);
        return {
          latitude: lat,
          longitude: lon,
          city: data.city,
          country: data.country
        };
      }
    }
  ];

  // Coba setiap API satu per satu
  for (const api of apis) {
    try {
      const response = await fetch(api.url);
      if (!response.ok) continue;
      
      const data = await response.json();
      const location = api.parser(data);
      
      if (location.latitude && location.longitude) {
        return {
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
          country: location.country
        };
      }
    } catch (error) {
      console.warn(`Failed to get location from ${api.name}:`, error);
      continue;
    }
  }

  // Jika semua API gagal, gunakan lokasi default
  return {
    latitude: -6.2088,
    longitude: 106.8456,
    city: 'Jakarta',
    country: 'Indonesia'
  };
};

// Fungsi untuk mendapatkan lokasi dari browser geolocation
const getLocationFromBrowser = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    const timeoutId = setTimeout(() => {
      reject(new Error('Geolocation timeout'));
    }, 10000);

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
};

export const useAdvancedGeolocation = (): GeolocationHook => {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Coba browser geolocation dulu
      const position = await getLocationFromBrowser();
      
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    } catch (browserError) {
      console.warn('Browser geolocation failed:', browserError);
      
      try {
        // Jika browser geolocation gagal, coba IP-based geolocation
        const ipLocation = await getLocationFromIP();
        setLocation(ipLocation);
      } catch (ipError) {
        console.error('IP geolocation failed:', ipError);
        setError('Gagal mendeteksi lokasi secara otomatis');
      }
    } finally {
      setLoading(false);
    }
  };

  // Dapatkan lokasi saat pertama kali hook digunakan
  useEffect(() => {
    getLocation();
  }, []);

  return {
    location,
    loading,
    error,
    getLocation
  };
};