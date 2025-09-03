import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation tidak didukung oleh browser ini',
        loading: false,
      }));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      let errorMessage = 'Tidak dapat mengakses lokasi. Silakan masukkan kota secara manual.';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Izin akses lokasi ditolak. Silakan aktifkan izin lokasi atau masukkan kota secara manual.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Informasi lokasi tidak tersedia. Silakan masukkan kota secara manual.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Waktu permintaan lokasi habis. Silakan coba lagi atau masukkan kota secara manual.';
          break;
      }
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 600000, // 10 minutes
    });
  }, []);

  return state;
};