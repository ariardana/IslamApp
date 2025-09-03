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
    // Cek apakah geolocation tersedia
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation tidak didukung oleh browser ini',
        loading: false,
      }));
      return;
    }

    // Opsi untuk permintaan geolocation
    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 detik timeout
      maximumAge: 300000, // 5 menit maximumAge
    };

    // Gunakan Promise untuk mengatur timeout yang lebih baik
    const getPosition = new Promise<GeolocationPosition>((resolve, reject) => {
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
        options
      );
    });

    getPosition
      .then((position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      })
      .catch((error) => {
        let errorMessage = 'Tidak dapat mengakses lokasi. Silakan masukkan kota secara manual.';
        
        if (error.message === 'Geolocation timeout') {
          errorMessage = 'Waktu permintaan lokasi habis. Silakan coba lagi atau masukkan kota secara manual.';
        } else if (error instanceof GeolocationPositionError) {
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
            default:
              errorMessage = 'Terjadi kesalahan saat mengambil lokasi. Silakan coba lagi atau masukkan kota secara manual.';
          }
        }
        
        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
      });

    // Cleanup function
    return () => {
      // Tidak ada cleanup yang diperlukan untuk getCurrentPosition
    };
  }, []);

  return state;
};